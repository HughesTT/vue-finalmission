<template>
  <LoadingElement :active="isLoading" />
  <div class="container">
    <div class="userfavorite">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3><i class="bi bi-cart-check"></i> 購物車</h3>
          <template v-if="cart.carts && cart.carts.length > 0">
            <div class="paymentschedule justify-content-center">
              <div class="payment-step-off text-center">
                <i class="bi bi-1-circle"></i> <br>確認商品
              </div>
              <div class="payment-step align-middle text-center">
                <img src="../assets/img/dash.png" alt="image">
              </div>
              <div class="payment-step text-center">
                <i class="bi bi-2-circle-fill"></i> <br>填寫結帳資訊
              </div>
              <div class="payment-step align-middle text-center">
                <img src="../assets/img/dash.png" alt="image">
              </div>
              <div class="payment-step-off text-center">
                <i class="bi bi-3-circle"></i> <br>訂購完成
              </div>
            </div>

            <div class="payment-item">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex align-items-center cart-info" v-for="item in cart.carts" :key="item.id">
                    <div class="cart-productimg">
                      <img :src="item.product.imageUrl" alt="產品照" class="uctimg img-fluid">
                    </div>
                    <div class="payment-productname">
                      <div class="productname-text">
                        {{ item.product.title }}
                      </div>
                      <div class="cart-qty-mobi">
                        <div class="cartqtynum">數量 : {{ item.qty }}</div>
                      </div>
                    </div>
                    <div class="cart-qty">
                      數量 : {{ item.qty }}
                    </div>
                    <div class="cart-productprice text-end">
                      ${{ $filters.currency(item.total) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="price_difference text-success text-end" v-if="cart.total !== cart.final_total">
              折扣 : - ${{ $filters.currency(cart.total - cart.final_total) }}
            </div>
            <div class="finalprice_section">
              <div class="d-flex cart-price">
                <div class="me-auto p-2"></div>
                <p class="p-2 payment-totalprice">實際結帳金額：<span class="">NT$ {{
                  $filters.currency(Math.ceil(cart.final_total)) }}</span>
                </p>
              </div>
            </div>
            <div class="col-md-12 col-12 usecoupon input-gorup mb-3 input-group-sm">
              <p class="title">使用優惠券</p>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <input aria-label="couponcode" v-model="coupon_code" type="text" class="form-control"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="col-md-3 input-group-append">
                  <button class="btn btn-secondary usecouponbtn" type="button" @click="addCouponCode">套用優惠碼</button>
                </div>
              </div>
            </div>
            <div class="creditcard col-md-12 col-12 mb-3">
              <div class="title mb-3">付款方式</div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="payway1" id="payway1" value="creditcard1"
                  v-model="selectedPaymentMethod">
                <label class="form-check-label mb-3" for="payway1">信用卡一次付清</label>
                <div class="col-md-8 col-xs-12 col-12 creditcardinfo needs-validation"
                  v-if="selectedPaymentMethod === 'creditcard1'">
                  <label for="ccardnum" class="col-sm-3 col-form-label">信用卡卡號</label>
                  <div class="row col-md-12 col-12 g-4 mb-2">
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num1">
                    </div>
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num2">
                    </div>
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num3">
                    </div>
                    <div class="col-md-3 col-sm mb-1">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num4">
                    </div>
                  </div>
                  <label class="col-sm-12 col-form-label">安全碼(卡片後面3位數字)</label>
                  <div class="col-md-2 col-sm">
                    <input type="text" maxlength="3" class="form-control" placeholder="cvc" aria-label="num4">
                  </div>
                </div>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="payway2" id="payway2" value="creditcard2"
                  v-model="selectedPaymentMethod">
                <label class="form-check-label mb-3" for="payway2">信用卡分期付款</label>
                <div class="col-md-8 col-12 creditcardinfo" v-if="selectedPaymentMethod === 'creditcard2'">
                  <label for="ccardnum" class="col-sm-3 col-form-label">信用卡卡號</label>
                  <div class="row col-md-12 col-12 g-4 mb-2">
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num1">
                    </div>
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num2">
                    </div>
                    <div class="col-md-3 col-sm">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num3">
                    </div>
                    <div class="col-md-3 col-sm mb-1">
                      <input type="text" maxlength="4" class="form-control" placeholder="0857" aria-label="num4">
                    </div>
                  </div>
                  <label class="col-sm-12 col-form-label">安全碼(卡片後面3位數字)</label>
                  <div class="col-md-2 col-sm mb-3">
                    <input type="text" maxlength="3" class="form-control" placeholder="cvc" aria-label="num4">
                  </div>
                  <div class="col-md-3 col-sm">
                    <label class="col-sm-12 col-form-label">分期期數</label>
                    <select class="form-select col-md-2" aria-label="Default select example">
                      <option selected>請選擇</option>
                      <option value="1">3</option>
                      <option value="2">6</option>
                      <option value="3">12</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="payway4" id="payway4" value="creditcard4"
                  v-model="selectedPaymentMethod">
                <label class="form-check-label mb-3" for="payway4">貨到付款</label>
              </div>
            </div>
            <VForm class="orderinfo col-md-12" v-slot="{ errors }" @submit="createOrder">
              <p class="title">收件人資訊<span class="markinput">( * 為必填欄位)</span></p>
              <div class="mb-3">
                <label for="name" class="form-label">* 收件人姓名</label>
                <VField id="name" name="姓名" type="name" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">* 收件人地址</label>
                <VField id="address" name="地址" type="address" class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                  v-model="form.user.address"></VField>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">* 收件人電話</label>
                <VField id="tel" name="電話" type="tel" class="form-control" maxlength="10"
                  :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" rules="required" v-model="form.user.tel">
                </VField>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">* Email</label>
                <VField id="email" name="email" type="email" class="form-control"
                  :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入Email" rules="email|required"
                  v-model="form.user.email"></VField>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea name="" id="message" class="form-control" cols="30" rows="3" placeholder="請輸入留言"
                  v-model="form.user.message"></textarea>
              </div>
              <div class="text-end">
                <button class="btn btn-purple">確認付款</button>
              </div>
            </VForm>
          </template>
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

.payment-item {
  padding: 1em;

  @media(max-width: 960px) {
    padding: 10px;
  }

  .cart-info {
    margin-right: 1em;
    border-bottom: solid 1px #eee;

    @media(max-width: 960px) {
      margin-bottom: 0;
      padding: 10px 0;
    }
  }

  .cart-delbtn {
    margin-right: 1em;

    @media(max-width:960px) {
      margin-right: 10px;
    }
  }

  .cart-productimg {
    width: 150px;

    @media(max-width:960px) {
      width: 100px;
    }
  }

  .payment-productname {
    width: 400px;

    @media(max-width:960px) {
      width: 300px;
      font-size: 1em;
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
      width: 220px;
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
    }

    .cartqtynum {
      padding-left: 0;
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
      margin-right: 10px;
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

.price_difference {
  padding-right: 2em;

  @media(max-width:960px) {
    padding-right: 1.5em;
    margin-top: 0;
  }
}

.finalprice_section {
  position: sticky !important;
  top: 89px !important;
  background: #fff;
  margin-bottom: 1em;
  padding-right: 1.4em;

  @media(max-width: 960px) {
    padding-right: 1em;
    top: 75px !important;
  }

  .payment-totalprice {
    font-weight: bold;
    font-size: 1.2em;
    color: #7030a0;
    padding-right: 10px;
  }
}

.payment_btn {
  margin-top: 10px;
}

.userfavorite {
  padding: 0 1em 0 1em;
  margin-top: 150px;
  margin-bottom: 5em;
}

.usecouponbtn {
  margin-left: -20px;

  @media(max-width: 960px) {
    margin-left: 0;
    margin-top: -10px;
  }
}

.usecoupon {
  background: #f6f6f6;
  padding: 1em;
  border-radius: 15px;
}

.creditcard {
  background: #f6f6f6;
  padding: 1em;
  border-radius: 15px;
}

.creditcardinfo {
  background: #fffef1;
  padding: 5px 1em 1em 1em;
  border-radius: 15px;
}

.orderinfo {
  background: #f6f6f6;
  padding: 1em;
  border-radius: 15px;
}

.goshopping {
  font-size: 1.3rem;
  text-align: center;
  margin-top: 20px;
}

.title {
  font-size: 1.3em;
  font-weight: bold;
  padding-left: 10px;
  border-left: solid 5px #333;
}

.finaltotal {
  font-weight: bold;
}

label {
  font-weight: bold;
}

.markinput {
  font-size: 0.7em;
  margin-left: 1em;
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
      form: { // 最終訂單
        user: {
          name: '',
          emial: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {}, // 購物車內容
      coupon_code: '', // 優惠碼
      finaltotal: 0,
      orderId: '',
      selectedPaymentMethod: '', // 新增此變數追蹤付款方式的選擇
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
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then((res) => {
        if (this.coupon_code === coupon.code) {
          this.$httpMessageState(res, '成功套用優惠券');
          this.coupon_code = ''; // 套用完優惠券將其清空
          this.isLoading = false;
          this.getCart();
        } else {
          this.$httpMessageState(res, '優惠碼使用成功');
          this.isLoading = false;
        }
      });
    },
    getOrderId(orderId) {
      this.$router.push(`/user/userorder/${orderId}`);
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http.post(url).then((res) => {
        if (res.data.success) { // 若回傳成功，顯示完成付款資訊
          this.$httpMessageState(res, '付款成功');
        }
      });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.isLoading = true;
      this.$http.post(url, { data: order }).then((res) => {
        this.$httpMessageState(res, '訂單建立');
        this.isLoading = false;
        this.getCart();
        this.orderId = res.data.orderId;
        this.getOrderId(this.orderId);
        this.payOrder(this.orderId);
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // 藉由route取得orderId
    this.getCart();
  },
};
</script>
