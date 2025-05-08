<template>
  <LoadingElement :active="isLoading" />
  <div class="container">
    <div class="productmore">
      <div class="row justify-content-center">
        <div class="col-md-10 col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb"><!-- 麵包屑 -->
              <li class="breadcrumb-item"><router-link to="/" class="breadcrumb-item-link">首頁</router-link></li>
              <li class="breadcrumb-item"><router-link to="/productlist/allproducts"
                  class="breadcrumb-item-link">所有商品</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <div class="row justify-content-center">
            <article class="col-md-6">
              <img :src="product.imageUrl" alt="" class="img-fluid mb-3" width="600">
            </article>
            <div class="col-md-6">
              <h2>{{ product.title }}</h2>
              <div class="productdes">{{ product.description }}</div>
              <div ref="textContent"></div>
              <del class="h6">原價 {{ $filters.currency(product.origin_price) }} 元</del>
              <div class="h5 mb-3">NT {{ $filters.currency(product.price) }} 元</div>
              <div class="d-flex bd-highlight">
                <div class="p-1 flex-grow-1 bd-highlight">
                  <div class="d-flex align-items-center mb-3">
                    <div class="cart-icons btn btn-light" @click="qtyAdjust(-1)">-</div>
                    <div class="cartqtynum text-center">{{ qty }}</div>
                    <button class="cart-icons btn btn-light" @click="qtyAdjust(1)">+</button>
                  </div>
                </div>
                <div class="p-1 bd-highlight">
                  <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
                    加到購物車
                  </button>
                </div>
                <div class="p-1 bd-highlight">
                  <button class="btn btn-outline-danger" @click="toggleFavorite(product)">
                    <i class="bi bi-heart" v-if="!isFavorite(product.id)"></i>
                    <i class="bi bi-heart-fill" v-else></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="relatedproducts" v-if="filterProducts.length > 1">
    <div class="container">
      <div class="row justify-content-md-center">
        <h3>你可能感興趣的</h3>
        <div class="productbox col-md-3 col-6" v-for="item in filterProducts" :key="item.id">
          <a href="#" @click.prevent="getRelatedProduct(item.id)">
            <div class="product_img">
              <div class="morebox">
                <div class="morebtn">more</div>
              </div>
              <img :src="item.imageUrl" class="img-fluid" alt="image">
            </div>
            <div class="product_title">
              {{ item.title }}
            </div>
            <div class="product_price">
              $ {{ $filters.currency(item.price) }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="notify">
    <div class="container">
      <div class="row">
        <div class="notifybox col-md-4">
          <div class="notify-icon">
            <i class="bi bi-truck"></i>
          </div>
          <div class="notify-title">
            運送 & 運費須知
          </div>
          <div class="notify-border"></div>
          <div class="notify-content">
            <p>運費會根據送貨區域而有所不同。<br>
              如果一次購買商品總金額達到NT$8000或以上，則運費免費。</p>
          </div>
        </div>
        <div class="notifybox col-md-4">
          <div class="notify-icon">
            <i class="bi bi-info-circle"></i>
          </div>
          <div class="notify-title">
            退貨須知
          </div>
          <div class="notify-border"></div>
          <div class="notify-content">
            <div class="notify-box">
              <div class="notify-boxtitle">- 瑕疵品</div>
              <p>若收到產品後請立即與我們聯繫。請注意，除非產品本身的瑕疵，否則將不受理退貨。</p>
            </div>
            <div class="notify-box">
              <div class="notify-boxtitle">- 退貨期限</div>
              <p>請在收到產品後 7 天內透過電子郵件或電話聯絡我們以了解詳細資訊。 請注意，視實際情況可能無法受理退貨、換貨或取消。</p>
            </div>
          </div>
        </div>
        <div class="notifybox col-md-4">
          <div class="notify-icon">
            <i class="bi bi-coin"></i>
          </div>
          <div class="notify-title">
            付款方式
          </div>
          <div class="notify-border"></div>
          <div class="notify-content">
            <div class="notify-box">
              <div class="notify-boxtitle">- 信用卡付款</div>
              <img src="../assets/img/creditcard.png" alt="" class="img-fluid" width="120">
            </div>
            <div class="notify-box">
              <div class="notify-boxtitle">- 貨到付款</div>
              <p>請注意，付款費用會根據產品價格而有所不同。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
}

h2,
h3 {
  font-weight: bold;
}

.h5 {
  font-weight: bold;
  color: purple;
}

.h6 {
  color: #aaa;
}

.breadcrumb {
  font-weight: bold;
}

.breadcrumb-item-link {
  color: #7030a0;
}

article {
  padding: 0 1em;
}

.productmore {
  padding-top: 1em;
  margin-bottom: 2em;
  margin-top: 120px;

  @media(max-width: 960px) {
    padding: 1em 1em 0 1em;
    margin-bottom: 5em;
  }
}

.productdes {
  margin-bottom: 1.5em;

  @media(max-width: 960px) {
    margin-top: 2rem;
  }
}

.cart-icons {
  margin-right: 0;
}

.cartqtynum {
  padding: 6px 0.5em;
  min-width: 50px;
  border: solid 1px #eee;
}

.notify {
  background: #eee;
  padding: 2em 0 2.5em 0;
  color: #333;
}

.notifybox {
  @media(max-width: 960px) {
    margin-bottom: 2em;
  }
}

.notify-icon {
  font-size: 3.5em;
  text-align: center;
  color: #333;
}

.notify-title {
  font-size: 1.3em;
  text-align: center;
  margin-bottom: 1em;
}

.notify-border {
  width: 100%;
  height: 1px;
  background: #999;
  margin-bottom: 1em;
}

.notify-content {
  padding: 0 1.5em;
}

.notify-box {
  margin-bottom: 1em;
}

.notify-boxtitle {
  font-weight: bold;
}

button {
  margin-right: 0.5em;
}

.productbox {
  margin-bottom: 1.5em;
}

.product_title {
  color: #777;
  font-weight: bold;
  font-size: 1em;
  line-height: 1.3em;
}

.product_img {
  width: 100%;
  padding: 0 1em;
}

.product_img img {
  transition: all 0.3s ease-in-out;
}

.product_img:hover img {
  opacity: 0.6;
}

.morebox {
  position: relative;
}

.morebtn {
  position: absolute;
  z-index: 999;
  top: 150px;
  left: 47%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;
  padding: 0.5em;
  border-radius: 5px;
  opacity: 0;

  @media(max-width: 960px) {
    top: 100px;
    left: 45%;
  }
}

.product_img:hover .morebtn {
  opacity: 1;
  background: #7030a0;
  color: #fff;
}

.product_price {
  font-size: 1em;
  font-weight: bold;
  color: blueviolet;
}

.btntool {
  margin-top: 0.5em;
}

.btntool button {
  margin-right: 0.5em;
}

.relatedproducts {
  margin-bottom: 2em;
}

.relatedproducts h3 {
  margin-bottom: 1.5em;
  color: #7030a0;
}
</style>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      id: {}, // 自ProductView.vue帶來的id
      products: [],
      product: {}, // 相對自ProductView.vue來的id的商品資訊
      isLoading: false,
      status: {
        loadingItem: '',
      },
      favorite: [], // 追蹤商品暫存陣列位址
      favoriteIds: [], // 比對id的暫存位址
      qty: 1, // 數量預設為1
      filterProducts: [], // 相關商品篩選後的商品
    };
  },
  watch: {
    '$route.params.productId': function (newId) {
      this.id = newId; // 更新 id
      this.scrollBehavior(); // 滾動到頂部
      this.getProduct(); // 重新取得商品資料
    },
  },
  methods: {
    scrollBehavior() {
      window.scrollTo(0, 0);
    },
    getProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.isLoading = false; // 讀取完成後關閉動態
        if (response.data.success) { // 如果success結果為true，將資料存到product物件中
          this.product = response.data.product;
          this.getRelatedProducts();

          // 將連貫的文字分段重組
          const container = this.$refs.textContent; // 選取容器
          container.innerHTML = ''; // 先清空容器內容 以免不同頁疊加
          const productContent = this.product.content;
          const paragraphs = productContent.split(' '); // 按空格切段

          paragraphs.forEach((item) => {
            const pElement = document.createElement('p'); // 建立p標籤
            pElement.textContent = item.trim(); // 改變p標籤內容
            container.appendChild(pElement); // 在容器內新增p標籤
          });
        }
      });
    },
    getRelatedProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        this.filterProducts = res.data.products.filter((item) => item.category === this.product.category); // 篩選出相同category的商品
        const index = this.filterProducts.findIndex((item) => item.id === this.product.id); // 找出目前商品與相關商品中相同id的index位置
        if (index !== -1) {
          this.filterProducts.splice(index, 1); // 將目前商品從相關商品中刪除
        }
      });
    },
    getRelatedProduct(id) {
      this.$router.push(`/productlist/product/${id}`); // 點擊相關商品後，將id帶入路由
    },
    qtyAdjust(num) {
      if (num === 1) {
        this.qty += 1;
      } else if (this.qty === 1) {
        this.qty = 1;
      } else {
        this.qty -= 1;
      }
    },
    addToCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      this.isLoading = true; // 讀取中
      const cart = {
        product_id: id, // 加入購物車會帶入商品id
        qty: this.qty,
      };
      this.$http.post(url, { data: cart }).then((res) => {
        this.isLoading = false; // 讀取完成後關閉動態
        this.$httpMessageState(res, '加入購物車');
        this.status.loadingItem = '';
        emitter.emit('update-cart');
        // this.$router.push('/productlist/usercart');
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
        this.isLoading = false;
      });
    },
    getFavorite() {
      this.favorite = JSON.parse(localStorage.getItem('favorite')) || []; // 將字串轉換為物件或值
      this.favoriteIds = []; // 先將追蹤清單id宣告為空陣列
      this.favorite.forEach((item) => { // 利用forEach迴圈顯示追蹤清單
        this.favoriteIds.push(item.id); // 將加入追蹤的id 增加到追蹤清單內
      });
    },
    isFavorite(id) { // 判斷是否加入追蹤
      return this.favoriteIds.some((item) => item === id); // 回傳符合favoriteIds裡有的id商品
    },
    toggleFavorite(item) { // 加入追蹤
      const toggleid = item.id; // 宣告id參數
      const hasFavorite = this.favorite.some((fav) => fav.id === toggleid); // 宣告hasFavorite為符合點選追蹤按鈕物件的id為商品id，會回傳true or false
      if (!hasFavorite) { // 若不存在於favorite陣列
        this.favorite.push(item); // 將其新增到favorite陣列中
        localStorage.setItem('favorite', JSON.stringify(this.favorite)); // 本機儲存的物件轉換為JSON字串
      } else { // 若已存在於favorite陣列
        const delItem = this.favorite.find((fav) => fav.id === toggleid); // 宣告delItem，若favorite有點選物件的id
        this.favorite.splice(this.favorite.indexOf(delItem), 1); // 將該id從陣列中刪除
        localStorage.setItem('favorite', JSON.stringify(this.favorite)); // 將favorite轉換為JSON字串
      }
      this.getFavorite(); // 每次點選按鈕重新讀取追蹤清單
      emitter.emit('update-favorite');
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.scrollBehavior();
    this.getProduct();
    this.getCart();
    this.getFavorite();
  },
};
</script>
