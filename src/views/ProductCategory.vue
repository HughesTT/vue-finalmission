<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div class="container">
    <div class="productview">
      <h3>全系列耳機</h3>
      <div class="categorybtn">
        <router-link to="/productlist/allproducts">
          <button class="btn btn-outline-secondary">全部商品</button>
        </router-link>
        <button class="btn btn-outline-secondary" :class="{ 'active': category === 'gaming' }"
          @click.prevent="toCategory('gaming')">電競</button>
        <button class="btn btn-outline-secondary" :class="{ 'active': category === 'bluetooth' }"
          @click.prevent="toCategory('bluetooth')">藍芽
        </button>
        <button class="btn btn-outline-secondary" :class="{ 'active': category === 'noise-canceling' }"
          @click.prevent="toCategory('noise-canceling')">降噪
        </button>
        <button class="btn btn-outline-secondary" :class="{ 'active': category === 'music-glasses' }"
          @click.prevent="toCategory('music-glasses')">音訊眼鏡
        </button>
      </div>

      <div class="row">
        <div class="productbox col-md-3 col-6" v-for="item in products" :key="item.id">
          <a href="#" @click.prevent="getProduct(item.id)">
            <div class="product_img">
              <div class="morebox">
                <div class="morebtn">更多資訊</div>
              </div>
              <img :src="item.imageUrl" class="img-fluid" alt="image">
            </div>
            <div class="product_title">
              {{ item.title }}
            </div>
            <div class="product_price text-start">
              NT ${{ $filters.currency(item.price) }}
            </div>
          </a>
          <div class="btntool">
            <div class="bd-highlight">
              <button class="btn btn-outline-danger" @click="toggleFavorite(item)">
                <i class="bi bi-heart" v-if="!isFavorite(item.id)"></i>
                <i class="bi bi-heart-fill" v-else></i>
              </button>
            </div>
            <div class="bd-highlight">
              <button type="button" class="moreinfo btn btn-outline-danger" @click="addToCart(item.id)"
                :disabled="this.status.loadingItem === item.id">
                <div v-if="this.status.loadingItem === item.id" class="spinner-grow text-danger spinner-grow-sm"
                  role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <i class="bi bi-cart2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}

h3 {
  font-weight: bold;
  color: purple;
}

.productview {
  margin-top: 150px;
  margin-bottom: 2em;

  @media (max-width: 960px) {
    padding: 1em 1em 0 1em;
    margin-bottom: 2em;
    margin-top: 100px;
  }
}

.product_title {
  color: #777;
  font-weight: bold;
  font-size: 1em;
  line-height: 1.3em;
  height: 2em;
  margin-bottom: 0.5em;

  @media(max-width: 960px) {
    margin-bottom: 0.7em;
  }
}

.productbox {
  margin-bottom: 1.5em;

  a {
    display: block;
  }
}

.product_img {
  width: 100%;
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
  font-size: 1em;
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
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  color: blueviolet;
}

.btntool {
  z-index: 9999;
  margin-right: 10px;

  button {
    margin-right: 0.5em;
    margin-top: -2em;
    float: right;
  }

  @media(max-width:960px) {
    display: none;
  }
}

.categorybtn {
  margin-top: 2em;
  margin-bottom: 2em;
}

.categorybtn button {
  margin-right: 0.5em;

  @media(max-width:960px) {
    font-size: 0.8em;
    margin-bottom: 8px;
  }
}

.spinner-grow {
  position: absolute;
}
</style>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      favorite: [], // 追蹤商品暫存陣列位址
      favoriteIds: [], // 比對id的暫存位址
      category: 'all', // 商品分類
    };
  },
  watch: {
    '$route.params.category': {
      handler() { // 監聽路由參數變化，重新獲取商品列表
        this.products = []; // 清空商品列表
        this.getProducts(); // 重新獲取商品列表
      },
      deep: true,
    },
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.category = this.$route.params.category; // 根據路由參數取得分類，按鈕會根據此參數改變樣式
          if (!this.$route.params.category) { // 若沒有指定分類，則顯示全部商品
            this.products = res.data.products.reverse();
          } else {
            this.products = res.data.products.filter((item) => item.category === this.$route.params.category);
          }
        }
        this.isLoading = false;// 讀取完指定分類商品後才關閉loading動態
      });
    },
    getProduct(id) {
      this.$router.push(`/productlist/product/${id}`);
    },
    addToCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id, // 加入購物車會帶入商品id
        qty: 1,
      };
      this.$http.post(url, { data: cart }).then((res) => {
        this.$httpMessageState(res, '成功加入購物車');
        this.status.loadingItem = '';
        emitter.emit('update-cart');
        // this.$router.push('/productlist/usercart');
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.cart = res.data.data.carts;
        }
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
    toCategory(category) {
      this.$router.push(`/productlist/${category}`);
    },
  },
  created() {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
    this.$http.get(url).then((res) => {
      if (res.data.success) {
        this.cartNum = res.data.data.carts.length;
      }
    });
    this.favNum = (JSON.parse(localStorage.getItem('favorite')) || []).length;
    this.getCart();
    this.getFavorite();
    this.getProducts();
  },
};
</script>
