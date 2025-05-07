<template>
  <LoadingElement :active="isLoading" />
  <div class="container">
    <div class="userfavorite">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3><i class="bi bi-cart-check"></i> 購物車</h3>
          <template v-if="cart.carts && cart.carts.length > 0">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">商品名稱 / 圖片</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col" class="text-end">價格</th>
                  <th width="50"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <img :src="item.product.imageUrl" alt="" class="img-fluid" width="120">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已使用優惠券</div>
                  </td>
                  <td width="60">
                    <div class="input-group input-group-sm">
                      <input type="number" class="form-control" aria-label="couponcode" min="1"
                        @change="updateCart(item)" v-model.number="item.qty">
                    </div>
                  </td>
                  <td class="text-end">
                    ${{ $filters.currency(item.final_total) }}
                  </td>
                  <td class="text-end">
                    <button class="btn btn-outline-danger btn-sm text-center" @click="removeCartItem(item.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colspan="1"></td>
                  <td class="text-end">總計</td>
                  <td class="text-end">${{ $filters.currency(cart.final_total) }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end">
              <router-link to="/user/payment" class="btn btn-danger">填寫收件資訊</router-link>
            </div>
          </template>
          <template v-else>
            <div class="goshopping">你的購物車是空的，快去挑選喜歡的商品吧</div>
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
              <img src="../assets/img/creditcard.png" alt="" class="img-fluid" width="120">
            </div>
            <div class="notify-box">
              <div class="notify-boxtitle">- 貨到付款</div>
              <p>超商或宅配取貨付款。 請注意，付款費用會根據產品價格而有所不同。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h3 {
  font-weight: bold;
  color: purple;
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

.userfavorite {
  padding: 1em 0 5em 0;
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
      cart: [],
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    scrollBehavior() {
      window.scrollTo(0, 0);
    },
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.isLoading = true; // 取得資料前先執行讀取動態
      this.$http.get(url).then((res) => {
        this.products = res.data.products; // 將讀取到的資料，存到自行建立的porducts
        this.isLoading = false;// 取得資料後停止讀取動態
        this.pagination = res.data.pagination; // 分頁資料
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
        this.isLoading = false;
        console.log(this.cart);
        emitter.emit('update-cart');
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id; // 避免使用者不知道正在更新會重複點擊，會加上判斷條件分辨狀態
      const cart = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res);
        this.status.loadingItem = ''; // 更新後清除id
        this.getCart(); // 變更數量後，重新取得購物車資料
      });
    },
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        this.$httpMessageState(res, '刪除購物車商品');
        this.status.loadingItem = '';
        this.getCart();
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
