<template>
  <LoadingElement :active="isLoading" />
  <div class="container">
    <div class="userfavorite">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3><i class="bi bi-cart-check"></i> 追蹤清單</h3>
          <template v-if="favorite.length !== 0">
            <div class="row">
              <div class="productbox col-md-4 col-6" v-for="item in favorite" :key="item.id">
                <a href="#" @click.prevent="getProduct(item.id)">
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
                    NT ${{ $filters.currency(item.price) }}
                  </div>
                </a>
                <div class="btntool">
                  <button class="btn btn-outline-danger col-md-6 col-7" @click="toggleFavorite(item)">
                    <span v-if="!isFavorite(item.id)">移除追蹤</span>
                  </button>
                  <button type="button" class="moreinfo btn btn-outline-danger col-md-4 col-3"
                    @click="addToCart(item.id)" :disabled="this.status.loadingItem === item.id">
                    <div v-if="this.status.loadingItem === item.id" class="spinner-grow text-danger spinner-grow-sm"
                      role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="bi bi-cart2"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="goshopping">你的追蹤清單是空的，快去挑選喜歡的商品吧</div>
            <div class="mx-auto" style="width: 100px;">
              <router-link to="/productlist/allproducts" class="mx-auto goto">去逛逛</router-link>
            </div>
          </template>
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
              <img src="../assets/img/creditcard.png" alt="發卡組織" class="img-fluid" width="120">
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

h3 {
  font-weight: bold;
  color: purple;
}

.product_title {
  color: #333;
  height: 2.5em;
  margin-bottom: 0.5em;
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

.userfavorite {
  min-height: 200px;
  padding: 0 1em 0 1em;
  margin-top: 150px;
  margin-bottom: 5em;

  @media(max-width:960px) {
    margin-top: 120px;
  }
}

button {
  margin-right: 10px;
}

.morebox {
  position: relative;
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
  margin-bottom: 5px;
}

.goshopping {
  font-size: 1.3rem;
  text-align: center;
  margin: 1.5em 0;
}

.goto {
  background: #7030a0;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 30px;
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
</style>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      favorite: [], // 追蹤商品暫存陣列位址
      favoriteIds: [], // 比對id的暫存位址
    };
  },
  methods: {
    scrollBehavior() {
      window.scrollTo(0, 0);
    },
    getFavorite() {
      this.favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    },
    removeFavorite(item) {
      this.favorite.splice(this.favorite.indexOf(item), 1);
      localStorage.setItem('favorite', JSON.stringify(this.favorite));
      this.getFavorite();
      emitter.emit('update-favorite');
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
    this.favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    this.scrollBehavior();
  },
};
</script>
