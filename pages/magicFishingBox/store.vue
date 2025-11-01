<template>
	<view class="container">
		<!-- 小卖部标题 -->
		<view class="store-header">
			<view class="header-content">
				<text class="store-title">{{ fieldName }}小卖部</text>
				<text class="store-subtitle">钓鱼必备用品</text>
				<view class="position-info" v-if="position">
					<text class="position-label">钓位号</text>
					<text class="position-number">{{ position }}</text>
				</view>
			</view>
			<view class="header-actions">
				<view class="action-btn" @click="showOrderHistory">
					<text class="action-icon">📋</text>
					<text class="action-text">订单</text>
				</view>
				<view class="action-btn" @click="showDeliveryInfo">
					<text class="action-icon">🚚</text>
					<text class="action-text">配送</text>
				</view>
			</view>
		</view>
		
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input">
				<text class="search-icon">🔍</text>
				<input 
					type="text" 
					placeholder="搜索商品..." 
					v-model="searchKeyword"
					@input="onSearchInput"
					class="search-field"
				/>
			</view>
		</view>
		
		<!-- 商品分类 -->
		<view class="category-tabs">
			<view class="tab-item" 
				v-for="category in categories" 
				:key="category.id"
				:class="{ active: currentCategory === category.id }"
				@click="switchCategory(category.id)">
				<text class="tab-icon">{{ category.icon }}</text>
				<text class="tab-name">{{ category.name }}</text>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view class="products-container">
			<view class="product-item" v-for="product in filteredProducts" :key="product.id">
				<view class="product-image">
					<text class="product-icon">{{ product.icon }}</text>
					<view class="product-badge" v-if="product.isHot">热销</view>
				</view>
				<view class="product-info">
					<text class="product-name">{{ product.name }}</text>
					<text class="product-desc">{{ product.description }}</text>
					<view class="product-tags" v-if="product.tags">
						<text class="tag" v-for="tag in product.tags" :key="tag">{{ tag }}</text>
					</view>
					<view class="product-price-row">
						<view class="price-info">
							<text class="product-price">¥{{ product.price }}</text>
							<text class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</text>
						</view>
						<view class="quantity-controls">
							<text class="quantity-btn" @click="decreaseQuantity(product)">-</text>
							<text class="quantity">{{ product.quantity || 0 }}</text>
							<text class="quantity-btn" @click="increaseQuantity(product)">+</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredProducts.length === 0">
			<text class="empty-icon">🔍</text>
			<text class="empty-text">没有找到相关商品</text>
		</view>
		
		<!-- 购物车 -->
		<view class="cart-section" v-if="cartItems.length > 0">
			<view class="cart-header">
				<text class="cart-title">购物车 ({{ totalItems }}件)</text>
				<text class="cart-clear" @click="clearCart">清空</text>
			</view>
			<view class="cart-items">
				<view class="cart-item" v-for="item in cartItems" :key="item.id">
					<text class="cart-item-name">{{ item.name }}</text>
					<text class="cart-item-quantity">x{{ item.quantity }}</text>
					<text class="cart-item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</text>
				</view>
			</view>
			<view class="cart-footer">
				<text class="cart-total">总计: ¥{{ totalPrice.toFixed(2) }}</text>
				<button class="checkout-btn" @click="checkout">结算</button>
			</view>
		</view>
		
		<!-- 订单历史弹窗 -->
		<view class="modal-overlay" v-if="showOrderModal" @click="hideOrderHistory">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">订单历史</text>
					<text class="modal-close" @click="hideOrderHistory">✕</text>
				</view>
				<view class="order-list">
					<view class="order-item" v-for="order in orderHistory" :key="order.id">
						<view class="order-info">
							<text class="order-time">{{ order.time }}</text>
							<text class="order-total">¥{{ order.total }}</text>
						</view>
						<text class="order-status">{{ order.status }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 配送信息弹窗 -->
		<view class="modal-overlay" v-if="showDeliveryModal" @click="hideDeliveryInfo">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">配送信息</text>
					<text class="modal-close" @click="hideDeliveryInfo">✕</text>
				</view>
				<view class="delivery-info">
					<view class="info-item">
						<text class="info-label">配送范围</text>
						<text class="info-value">钓场范围内免费配送</text>
					</view>
					<view class="info-item">
						<text class="info-label">配送时间</text>
						<text class="info-value">15-30分钟送达</text>
					</view>
					<view class="info-item">
						<text class="info-label">联系方式</text>
						<text class="info-value">138-0000-0000</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fieldName: '',
			position: '',
			searchKeyword: '',
			currentCategory: 1,
			showOrderModal: false,
			showDeliveryModal: false,
			categories: [
				{ id: 1, name: '饮品', icon: '🥤' },
				{ id: 2, name: '食品', icon: '🍜' },
				{ id: 3, name: '日用品', icon: '🧻' },
				{ id: 4, name: '烟酒', icon: '🍺' },
				{ id: 5, name: '钓具', icon: '🎣' },
				{ id: 6, name: '饵料', icon: '🪱' }
			],
			products: [
				// 饮品
				{ id: 1, name: '矿泉水', description: '500ml纯净水', price: 3.00, originalPrice: 3.50, icon: '💧', category: 1, quantity: 0, isHot: true, tags: ['解渴', '必备'] },
				{ id: 2, name: '可乐', description: '330ml可口可乐', price: 4.50, icon: '🥤', category: 1, quantity: 0, isHot: true, tags: ['冰镇'] },
				{ id: 3, name: '红牛', description: '250ml功能饮料', price: 6.00, icon: '⚡', category: 1, quantity: 0, tags: ['提神'] },
				{ id: 4, name: '绿茶', description: '500ml冰绿茶', price: 4.00, icon: '🍵', category: 1, quantity: 0, tags: ['健康'] },
				{ id: 5, name: '咖啡', description: '雀巢咖啡', price: 8.00, icon: '☕', category: 1, quantity: 0, tags: ['提神'] },
				{ id: 6, name: '果汁', description: '100%纯果汁', price: 6.50, icon: '🧃', category: 1, quantity: 0, tags: ['天然'] },
				
				// 食品
				{ id: 7, name: '方便面', description: '红烧牛肉面', price: 5.50, icon: '🍜', category: 2, quantity: 0, isHot: true, tags: ['热食'] },
				{ id: 8, name: '盒饭', description: '两荤一素套餐', price: 15.00, icon: '🍱', category: 2, quantity: 0, isHot: true, tags: ['正餐'] },
				{ id: 9, name: '面包', description: '全麦面包', price: 3.50, icon: '🍞', category: 2, quantity: 0, tags: ['早餐'] },
				{ id: 10, name: '火腿肠', description: '双汇火腿肠', price: 2.50, icon: '🌭', category: 2, quantity: 0, tags: ['小食'] },
				{ id: 11, name: '饼干', description: '奥利奥饼干', price: 6.00, icon: '🍪', category: 2, quantity: 0, tags: ['零食'] },
				{ id: 12, name: '薯片', description: '乐事薯片', price: 4.50, icon: '🥔', category: 2, quantity: 0, tags: ['零食'] },
				{ id: 13, name: '泡面', description: '康师傅红烧牛肉面', price: 4.00, icon: '🍲', category: 2, quantity: 0, tags: ['热食'] },
				{ id: 14, name: '八宝粥', description: '银鹭八宝粥', price: 5.00, icon: '🥣', category: 2, quantity: 0, tags: ['营养'] },
				
				// 日用品
				{ id: 15, name: '毛巾', description: '纯棉毛巾', price: 8.00, icon: '🧻', category: 3, quantity: 0, tags: ['清洁'] },
				{ id: 16, name: '纸巾', description: '抽纸3包装', price: 5.00, icon: '📄', category: 3, quantity: 0, isHot: true, tags: ['必备'] },
				{ id: 17, name: '湿巾', description: '消毒湿巾', price: 4.50, icon: '🧽', category: 3, quantity: 0, tags: ['消毒'] },
				{ id: 18, name: '垃圾袋', description: '大号垃圾袋', price: 2.00, icon: '🗑️', category: 3, quantity: 0, tags: ['环保'] },
				{ id: 19, name: '雨伞', description: '折叠雨伞', price: 15.00, icon: '☂️', category: 3, quantity: 0, tags: ['防雨'] },
				{ id: 20, name: '帽子', description: '遮阳帽', price: 12.00, icon: '👒', category: 3, quantity: 0, tags: ['防晒'] },
				
				// 烟酒
				{ id: 21, name: '打火机', description: '防风打火机', price: 3.00, icon: '🔥', category: 4, quantity: 0, tags: ['必备'] },
				{ id: 22, name: '香烟', description: '中华香烟', price: 65.00, icon: '🚬', category: 4, quantity: 0, tags: ['高档'] },
				{ id: 23, name: '啤酒', description: '青岛啤酒', price: 8.00, icon: '🍺', category: 4, quantity: 0, tags: ['冰镇'] },
				{ id: 24, name: '白酒', description: '二锅头', price: 12.00, icon: '🍶', category: 4, quantity: 0, tags: ['烈酒'] },
				
				// 钓具
				{ id: 25, name: '鱼钩', description: '伊势尼鱼钩', price: 2.00, icon: '🪝', category: 5, quantity: 0, tags: ['小件'] },
				{ id: 26, name: '鱼线', description: '尼龙鱼线', price: 8.00, icon: '🎣', category: 5, quantity: 0, tags: ['配件'] },
				{ id: 27, name: '浮漂', description: '纳米浮漂', price: 15.00, icon: '🦆', category: 5, quantity: 0, tags: ['配件'] },
				{ id: 28, name: '铅坠', description: '铅制坠子', price: 1.50, icon: '⚖️', category: 5, quantity: 0, tags: ['小件'] },
				
				// 饵料
				{ id: 29, name: '蚯蚓', description: '活蚯蚓', price: 3.00, icon: '🪱', category: 6, quantity: 0, isHot: true, tags: ['活饵'] },
				{ id: 30, name: '红虫', description: '红虫饵', price: 5.00, icon: '🐛', category: 6, quantity: 0, tags: ['活饵'] },
				{ id: 31, name: '商品饵', description: '蓝鲫饵料', price: 8.00, icon: '🍞', category: 6, quantity: 0, tags: ['商品饵'] },
				{ id: 32, name: '玉米', description: '嫩玉米粒', price: 2.00, icon: '🌽', category: 6, quantity: 0, tags: ['天然饵'] }
			],
			cartItems: [],
			orderHistory: [
				{ id: 1, time: '2024-01-15 14:30', total: 25.50, status: '已完成' },
				{ id: 2, time: '2024-01-14 10:15', total: 18.00, status: '已完成' },
				{ id: 3, time: '2024-01-13 16:45', total: 32.50, status: '配送中' }
			]
		}
	},
	computed: {
		filteredProducts() {
			let products = this.products.filter(product => product.category === this.currentCategory)
			
			// 搜索过滤
			if (this.searchKeyword) {
				products = products.filter(product => 
					product.name.includes(this.searchKeyword) || 
					product.description.includes(this.searchKeyword) ||
					(product.tags && product.tags.some(tag => tag.includes(this.searchKeyword)))
				)
			}
			
			return products
		},
		totalItems() {
			return this.cartItems.reduce((total, item) => total + item.quantity, 0)
		},
		totalPrice() {
			return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
		}
	},
	onLoad(options) {
		this.fieldName = decodeURIComponent(options.fieldName || '钓场')
		this.position = options.position || ''
	},
	methods: {
		switchCategory(categoryId) {
			this.currentCategory = categoryId
			this.searchKeyword = '' // 切换分类时清空搜索
		},
		onSearchInput() {
			// 搜索时切换到全部分类
			if (this.searchKeyword) {
				this.currentCategory = 0
			}
		},
		increaseQuantity(product) {
			if (!product.quantity) {
				this.$set(product, 'quantity', 0)
			}
			product.quantity++
			this.updateCart(product)
		},
		decreaseQuantity(product) {
			if (product.quantity > 0) {
				product.quantity--
				this.updateCart(product)
			}
		},
		updateCart(product) {
			const existingItem = this.cartItems.find(item => item.id === product.id)
			if (product.quantity > 0) {
				if (existingItem) {
					existingItem.quantity = product.quantity
				} else {
					this.cartItems.push({
						id: product.id,
						name: product.name,
						price: product.price,
						quantity: product.quantity
					})
				}
			} else {
				const index = this.cartItems.findIndex(item => item.id === product.id)
				if (index > -1) {
					this.cartItems.splice(index, 1)
				}
			}
		},
		clearCart() {
			this.cartItems = []
			this.products.forEach(product => {
				product.quantity = 0
			})
		},
		checkout() {
			if (this.cartItems.length === 0) {
				uni.showToast({
					title: '购物车为空',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '确认结算',
				content: `共${this.totalItems}件商品，总计¥${this.totalPrice.toFixed(2)}`,
				success: (res) => {
					if (res.confirm) {
						// 添加到订单历史
						const newOrder = {
							id: Date.now(),
							time: new Date().toLocaleString('zh-CN'),
							total: this.totalPrice.toFixed(2),
							status: '配送中'
						}
						this.orderHistory.unshift(newOrder)
						
						uni.showToast({
							title: '订单已提交',
							icon: 'success'
						})
						this.clearCart()
					}
				}
			})
		},
		showOrderHistory() {
			this.showOrderModal = true
		},
		hideOrderHistory() {
			this.showOrderModal = false
		},
		showDeliveryInfo() {
			this.showDeliveryModal = true
		},
		hideDeliveryInfo() {
			this.showDeliveryModal = false
		}
	}
}
</script>

<style scoped>
.container {
	padding: 20rpx;
	background-color: #f5f7fa;
	min-height: 100vh;
	padding-bottom: 200rpx; /* 为购物车留出空间 */
}

/* 小卖部标题 */
.store-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
	padding: 20rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 16rpx;
	color: white;
}

.header-content {
	flex: 1;
	text-align: center;
}

.store-title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.store-subtitle {
	display: block;
	font-size: 24rpx;
	opacity: 0.9;
	margin-bottom: 20rpx;
}

.position-info {
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 20rpx;
	padding: 16rpx 32rpx;
}

.position-label {
	font-size: 24rpx;
	margin-right: 16rpx;
}

.position-number {
	font-size: 32rpx;
	font-weight: bold;
	background: #fff;
	color: #667eea;
	padding: 8rpx 16rpx;
	border-radius: 12rpx;
}

.header-actions {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.action-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 12rpx;
	min-width: 80rpx;
}

.action-icon {
	font-size: 32rpx;
	margin-bottom: 4rpx;
}

.action-text {
	font-size: 20rpx;
	opacity: 0.9;
}

/* 搜索栏 */
.search-bar {
	margin-bottom: 20rpx;
}

.search-input {
	display: flex;
	align-items: center;
	background: white;
	border-radius: 12rpx;
	padding: 16rpx 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.search-icon {
	font-size: 32rpx;
	margin-right: 16rpx;
	color: #999;
}

.search-field {
	flex: 1;
	font-size: 28rpx;
	color: #333;
}

/* 分类标签 */
.category-tabs {
	display: flex;
	margin-bottom: 20rpx;
	background: white;
	border-radius: 12rpx;
	padding: 8rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	overflow-x: auto;
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 120rpx;
	padding: 16rpx 8rpx;
	font-size: 24rpx;
	color: #666;
	border-radius: 8rpx;
	transition: all 0.3s ease;
	white-space: nowrap;
}

.tab-item.active {
	background: #3498db;
	color: white;
	font-weight: bold;
}

.tab-icon {
	font-size: 32rpx;
	margin-bottom: 8rpx;
}

.tab-name {
	font-size: 22rpx;
}

/* 商品列表 */
.products-container {
	margin-bottom: 20rpx;
}

.product-item {
	display: flex;
	background: white;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 16rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	align-items: center;
	position: relative;
}

.product-image {
	margin-right: 20rpx;
	position: relative;
}

.product-icon {
	font-size: 48rpx;
}

.product-badge {
	position: absolute;
	top: -8rpx;
	right: -8rpx;
	background: #e74c3c;
	color: white;
	font-size: 18rpx;
	padding: 4rpx 8rpx;
	border-radius: 8rpx;
	font-weight: bold;
}

.product-info {
	flex: 1;
}

.product-name {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #2c3e50;
	margin-bottom: 8rpx;
}

.product-desc {
	display: block;
	font-size: 24rpx;
	color: #7f8c8d;
	margin-bottom: 8rpx;
}

.product-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
	margin-bottom: 12rpx;
}

.tag {
	background: #f0f8ff;
	color: #3498db;
	font-size: 20rpx;
	padding: 4rpx 8rpx;
	border-radius: 8rpx;
}

.product-price-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.price-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.product-price {
	font-size: 32rpx;
	font-weight: bold;
	color: #e74c3c;
}

.original-price {
	font-size: 24rpx;
	color: #999;
	text-decoration: line-through;
}

.quantity-controls {
	display: flex;
	align-items: center;
	background: #f8f9fa;
	border-radius: 20rpx;
	padding: 4rpx;
}

.quantity-btn {
	width: 40rpx;
	height: 40rpx;
	background: #3498db;
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	font-weight: bold;
}

.quantity {
	margin: 0 20rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: #2c3e50;
	min-width: 40rpx;
	text-align: center;
}

/* 购物车 */
.cart-section {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: white;
	border-top: 1rpx solid #e0e0e0;
	padding: 20rpx;
	box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.cart-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.cart-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #2c3e50;
}

.cart-clear {
	font-size: 24rpx;
	color: #e74c3c;
}

.cart-items {
	max-height: 200rpx;
	overflow-y: auto;
	margin-bottom: 16rpx;
}

.cart-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.cart-item:last-child {
	border-bottom: none;
}

.cart-item-name {
	flex: 1;
	font-size: 24rpx;
	color: #2c3e50;
}

.cart-item-quantity {
	font-size: 24rpx;
	color: #666;
	margin: 0 16rpx;
}

.cart-item-price {
	font-size: 24rpx;
	font-weight: bold;
	color: #e74c3c;
}

.cart-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.cart-total {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
}

.checkout-btn {
	background: #27ae60;
	color: white;
	border: none;
	border-radius: 8rpx;
	padding: 16rpx 32rpx;
	font-size: 28rpx;
	font-weight: bold;
}

/* 空状态 */
.empty-state {
	text-align: center;
	padding: 100rpx 40rpx;
	color: #999;
}

.empty-icon {
	font-size: 80rpx;
	margin-bottom: 20rpx;
	display: block;
}

.empty-text {
	font-size: 28rpx;
}

/* 弹窗 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	background: white;
	border-radius: 16rpx;
	width: 90%;
	max-width: 600rpx;
	max-height: 80vh;
	overflow: hidden;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.modal-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
}

.modal-close {
	font-size: 32rpx;
	color: #999;
	padding: 8rpx;
}

/* 订单历史 */
.order-list {
	max-height: 400rpx;
	overflow-y: auto;
}

.order-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.order-item:last-child {
	border-bottom: none;
}

.order-info {
	flex: 1;
}

.order-time {
	display: block;
	font-size: 24rpx;
	color: #666;
	margin-bottom: 8rpx;
}

.order-total {
	font-size: 28rpx;
	font-weight: bold;
	color: #e74c3c;
}

.order-status {
	font-size: 24rpx;
	color: #27ae60;
	padding: 8rpx 16rpx;
	background: #f0f9f0;
	border-radius: 8rpx;
}

/* 配送信息 */
.delivery-info {
	padding: 30rpx;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.info-item:last-child {
	border-bottom: none;
}

.info-label {
	font-size: 28rpx;
	color: #666;
}

.info-value {
	font-size: 28rpx;
	color: #2c3e50;
	font-weight: bold;
}
</style>
