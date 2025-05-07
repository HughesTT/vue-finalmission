<template>
  <div class="container">
    <div class="paymentinfo">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3>付款資訊</h3>
          <div class="finaltotal">
            <table class="table align-middle table-responsive">
              <thead>
                <tr>
                  <th scope="col">商品名稱 / 圖片</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col" class="text-center">價格</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cart.carts">
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td></td>
                    <td><img key="itedm.product.id" :src="item.product.imageUrl" alt="" class="img-fluid"
                        style="max-width:100px;">
                    </td>
                    <td class="">
                      {{ item.product.title }}<br /><span class="text-success" v-if="item.coupon">(已套用優惠券)</span>
                    </td>
                    <td>
                      <div class="input-gorup input-group-sm">
                        {{ item.qty }}
                      </div>
                    </td>
                    <td class="text-end">
                      {{ $filters.currency(item.total) }}
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="4" class="text-end text-success">折扣價</td>
                  <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
                </tr>
                <tr>
                  <td colspan="4">總計</td>
                  <td class="text-end">${{ $filters.currency(cart.final_total) }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="col-md-5 usecoupon input-gorup mb-3 input-group-sm">
              <p class="title">使用優惠券</p>
              <div class="row">
                <div class="col-md-7 mb-3">
                  <input aria-label="couponcode" v-model="coupon_code" type="text" class="form-control"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="col-md-5 input-group-append">
                  <button class="btn btn-primary" type="button" @click="addCouponCode">套用優惠碼</button>
                </div>
              </div>
            </div>
            <VForm class="orderinfo col-md-12" v-slot="{ errors }" @submit="createOrder">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.paymentinfo {
  padding-top: 120px;

  @media(max-width:960px) {
    padding-top: 150px;
  }
}

h3 {
  font-weight: bold;
  color: purple;
}

.usecoupon {
  margin: 1em 0;
  padding: 1em;
  background: lightcyan;
  border-radius: 20px;
}

.userinfo {
  background: #eee;
  padding: 1em;
}

.userinfo .title {
  font-size: 1.5em;
  font-weight: bold;
}

.orderinfo {
  margin: 2em 0;
  padding: 1em;
  background: #eee;
  border-radius: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      finaltotal: 0,
      cart: {},
      coupon_code: '',
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
      message: '',
      orderId: '',
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.isLoading = true; // 取得資料前先執行讀取動態
      this.$http.get(url).then((res) => {
        this.products = res.data.products; // 將讀取到的資料，存到自行建立的porducts
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
        this.isLoading = false;
        console.log(this.cart);
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
      this.$router.push(`/productlist/userorder/${orderId}`);
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
