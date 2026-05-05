<template>
  <LoadingElement :active="isLoading" />
  <div class="container">
    <div class="usercart">
      <div class="row justify-content-center">
        <div class="col-md-8 col-12">
          <h3><i class="bi bi-cart-check"></i> 購物車</h3>
          <template v-if="cart.carts && cart.carts.length > 0">
            <div class="paymentschedule justify-content-center">
              <div class="payment-step text-center">
                <i class="bi bi-1-circle-fill"></i> <br>確認商品
              </div>
              <div class="payment-step align-middle text-center">
                <img src="../assets/img/dash.png" alt="image">
              </div>
              <div class="payment-step-off text-center">
                <i class="bi bi-2-circle"></i> <br>填寫結帳資訊
              </div>
              <div class="payment-step align-middle text-center">
                <img src="../assets/img/dash.png" alt="image">
              </div>
              <div class="payment-step-off text-center">
                <i class="bi bi-3-circle"></i> <br>訂購完成
              </div>
            </div>

            <div class="cart-item">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex align-items-center cart-info" v-for="item in cart.carts" :key="item.id">
                    <div class="cart-delbtn">
                      <button class="btn btn-outline-danger btn-sm text-center" @click="removeCartItem(item.id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                    <div class="cart-productimg">
                      <img :src="item.product.imageUrl" alt="產品照" class="uctimg img-fluid">
                    </div>
                    <div class="cart-productname">
                      <div class="productname-text">
                        {{ item.product.title }}
                      </div>
                      <div class="cart-qty-mobi">
                        數量 : <input type="number" class="form-control-inline" aria-label="couponcode" min="1"
                          @change="updateCart(item)" v-model.number="item.qty">
                      </div>
                    </div>
                    <div class="cart-qty">
                      <input type="number" class="form-control" aria-label="couponcode" min="1"
                        @change="updateCart(item)" v-model.number="item.qty">
                    </div>
                    <div class="cart-productprice text-end">
                      ${{ $filters.currency(item.total) }}
                    </div>
                  </div>
                </div>
                <div class="d-flex mb-3 cart-price">
                  <div class="me-auto p-2 bd-highlight"></div>
                  <p class="p-2 bd-highlight">結帳金額：<span class="cart-totalprice">NT$ {{
                    $filters.currency(cart.total)
                      }}</span>
                  </p>
                  <div class="p-2 bd-highlight text-end cart-pay-btn">
                    <router-link to="/user/payment" class="btn btn-purple">結帳去</router-link>
                  </div>
                </div>
              </div>
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

<style lang="scss">
h3 {
  font-weight: bold;
  color: purple;
}

.goshopping {
  font-size: 1.2rem;
  text-align: center;
  margin: 1.5em 0;
}

.paymentschedule {
  margin: 2em 0;
  display: flex;

  .payment-step {
    color: purple;
    font-size: 1em;
    margin: 0 5px;

    @media(max-width: 960px) {
      font-size: 0.9em;
    }
  }

  .payment-step-dash {
    background: url(../assets/img/dash.png) repeat-x center;
  }

  .payment-step-off {
    color: #999;
    font-size: 1em;
    margin: 0 5px;

    @media(max-width: 960px) {
      font-size: 0.9em;
    }
  }
}

.goto {
  background: #7030a0;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 30px;
  text-decoration: none;
}

.usercart {
  min-height: 200px;
  padding: 0 1em 0 1em;
  margin-top: 150px;
  margin-bottom: 2em;

  @media(max-width:960px) {
    margin-top: 120px;
    margin-bottom: 0;
  }
}

.cart-item {
  padding: 1em;

  @media(max-width: 960px) {
    padding: 10px;
  }

  .cart-info {
    margin-right: 1em;
    border-bottom: solid 1px #eee;

    @media(max-width: 960px) {
      margin: 0;
      margin-bottom: 1em;
      padding: 10px 0;
    }
  }

  .cart-productimg {
    width: 150px;

    @media(max-width:960px) {
      width: 100px;
    }
  }

  .cart-productname {
    width: 400px;

    @media(max-width:960px) {
      width: 300px;
      font-size: 0.9em;
    }

    .productname-text {
      font-size: 1em;
      margin-bottom: 3px;
    }

    input {
      width: 60px;
    }
  }

  .cart-productprice {
    width: 150px;
    color: #7030a0;
    margin-bottom: 1em;
    margin-left: 1em;
    font-weight: bold;

    @media(max-width:960px) {
      font-size: 0.9em;
      margin-bottom: 0;
    }
  }

  .cart-qty {
    width: 70px;

    @media(max-width:960px) {
      margin-left: 10px;
      display: none;
    }
  }

  .cart-qty-mobi {
    display: none;

    @media(max-width:960px) {
      display: block;
      ;
    }

    .form-control {
      padding: 0.2em;
    }
  }

  .cart-price {
    max-height: 130px;
    padding: 0;

    p {
      margin-right: 10px;
      margin-top: 10px;
    }

    .cart-pay-btn {
      margin-top: 5px;
      margin-right: 1em;

      @media(max-width: 960px) {
        margin-right: 0;
      }
    }

    .cart-totalprice {
      font-weight: bold;
      color: #7030a0;
      font-size: 1.2em;
    }
  }

  .cart-price-title {
    font-weight: bold;
    font-size: 1.2em;
    padding-left: 10px;
    color: #fff;
    background: #7030a0;
  }
}

table {
  border: solid 1px #777;
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
  height: 2.5em;
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
        this.$httpMessageState(res, '更新購物車商品數量');
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
    this.scrollBehavior();
  },
};
</script>
