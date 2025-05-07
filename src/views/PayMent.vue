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
                  <th scope="col" width="90" class="text-center">數量</th>
                  <th scope="col" class="text-end">價格</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <img :src="item.product.imageUrl" alt="" class="img-fluid" width="150">
                    {{ item.product.title }}
                  </td>
                  <td>
                    <div class="input-gorup input-group-sm text-center">
                      {{ item.qty }}
                    </div>
                  </td>
                  <td class="text-end">
                    <small>原價 : $ {{ $filters.currency(item.total) }}</small><br>
                    <div class="text-success" v-if="cart.final_total !== cart.total">折扣價 : $ {{
                      $filters.currency(item.final_total) }}</div>
                    <div class="text-success" v-if="item.coupon">已使用優惠券</div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-end">
                    <div>
                      <span>原價 ${{ $filters.currency(cart.total) }}</span><br>
                      <span class="text-success">折扣 - ${{ $filters.currency(cart.total - cart.final_total) }}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end text-danger finaltotal">實際付款金額 ${{ $filters.currency(cart.final_total)
                  }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="col-md-6 usecoupon input-gorup mb-3 input-group-sm">
              <p class="title">使用優惠券</p>
              <div class="row">
                <div class="col-md-7 mb-3">
                  <input aria-label="couponcode" v-model="coupon_code" type="text" class="form-control"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="col-md-5 input-group-append">
                  <button class="btn btn-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
                </div>
              </div>
            </div>
            <VForm class="orderinfo col-md-12" v-slot="{ errors }" @submit="createOrder">
              <p class="title">收件人資訊</p>
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <VField id="name" name="姓名" type="name" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <VField id="address" name="地址" type="address" class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                  v-model="form.user.address"></VField>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話" rules="required" v-model="form.user.tel"></VField>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
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
                <button class="btn btn-danger">確認付款</button>
              </div>
            </VForm>
          </template>
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

.usecoupon {
  background: #eee;
  padding: 1em;
  border-radius: 15px;
}

.orderinfo {
  background: #eee;
  padding: 1em;
  border-radius: 15px;
}

.goshopping {
  font-size: 1.3rem;
  text-align: center;
  margin-top: 20px;
}

.title {
  font-weight: bold;
  padding-left: 10px;
  border-left: solid 5px #333;
}

.finaltotal {
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
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then((res) => {
        this.$httpMessageState(res, '已套用優惠券');
        this.coupon_code = ''; // 套用完優惠券將其清空
        this.isLoading = false;
        this.getCart();
      });
    },
    getOrderId(orderId) {
      this.$router.push(`/user/userorder/${orderId}`);
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http.post(url).then((res) => {
        console.log(res);
        if (res.data.success) { // 若回傳成功，顯示完成付款資訊
          this.$httpMessageState(res, '付款');
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
