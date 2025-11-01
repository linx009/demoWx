"use strict";

const crypto = require("crypto");

function getRandomIndexExclusive(maxExclusive) {
	if (maxExclusive <= 0) return 0;
	if (typeof crypto.randomInt === "function") {
		return crypto.randomInt(0, maxExclusive);
	}
	// Fallback: derive from secure bytes
	const buf = crypto.randomBytes(6);
	const num = buf.readUIntBE(0, 6);
	return num % maxExclusive;
}

async function createDraw(db, payload) {
	const { name, totalSeats } = payload || {};
	if (!name || !Number.isInteger(totalSeats) || totalSeats <= 0) {
		return { code: 400, message: "参数错误：需要 name 与 totalSeats(>0)" };
	}
	const draws = db.collection("csprng_draws");
	const now = Date.now();
	const doc = {
		name,
		totalSeats,
		createdAt: now,
		assignedMap: {},
		participants: []
	};
	const res = await draws.add(doc);
	return { code: 0, data: { _id: res.id, ...doc } };
}

async function listDraws(db) {
	const draws = db.collection("csprng_draws");
	const res = await draws.orderBy("createdAt", "desc").get();
	return { code: 0, data: res.data || [] };
}

async function joinDraw(db, payload, ctx) {
	const { drawId, userId } = payload || {};
	if (!drawId) return { code: 400, message: "参数错误：缺少 drawId" };
	// userId 可从客户端传，也可用 ctx.CLIENTIP/uni-id 等，这里优先 payload
	const uid = userId || (ctx && ctx.auth && ctx.auth.uid) || (ctx && ctx.clientIP) || "anonymous";
	const draws = db.collection("csprng_draws");
	const docRes = await draws.doc(drawId).get();
	if (!docRes.data || !docRes.data.length) return { code: 404, message: "抽号器不存在" };
	const draw = docRes.data[0];

	// 如果已参加，则直接返回原座位
	const existed = (draw.participants || []).find(p => p.userId === uid);
	if (existed) {
		return { code: 0, data: { seat: existed.seat, alreadyJoined: true } };
	}

	const total = draw.totalSeats;
	const assignedMap = draw.assignedMap || {};
	const takenSeats = new Set(Object.keys(assignedMap).map(k => Number(k)));
	const remainingSeats = [];
	for (let i = 1; i <= total; i++) {
		if (!takenSeats.has(i)) remainingSeats.push(i);
	}
	if (remainingSeats.length === 0) {
		return { code: 409, message: "座位已满" };
	}

	const idx = getRandomIndexExclusive(remainingSeats.length);
	const seat = remainingSeats[idx];

	assignedMap[String(seat)] = uid;
	const participants = draw.participants || [];
	participants.push({ userId: uid, seat });

	await draws.doc(drawId).update({ assignedMap, participants });
	return { code: 0, data: { seat } };
}

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const { action, payload } = event || {};
	try {
		switch (action) {
			case "create":
				return await createDraw(db, payload);
			case "list":
				return await listDraws(db);
			case "join":
				return await joinDraw(db, payload, context);
			default:
				return { code: 400, message: "未知 action" };
		}
	} catch (err) {
		return { code: 500, message: String(err && err.message || err) };
	}
};


