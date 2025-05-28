<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div class="container">
    <div class="userorder row justify-content-center">
      <div class="col-md-8 table-responsive">
        <h3><i class="bi bi-cart-check"></i> 訂單資訊</h3>
        <div class="paymentschedule justify-content-center">
          <div class="payment-step-off text-center">
            <i class="bi bi-1-circle"></i> 確認商品
          </div>
          <div class="payment-step text-center">
            <img src="../assets/img/dash.png" alt="image">
          </div>
          <div class="payment-step-off text-center">
            <i class="bi bi-2-circle"></i> 填寫結帳資訊
          </div>
          <div class="payment-step text-center">
            <img src="../assets/img/dash.png" alt="image">
          </div>
          <div class="payment-step text-center">
            <i class="bi bi-3-circle-fill"></i> 訂購完成
          </div>
        </div>
        <p>購買商品如下</p>
        <table class="table align-middle">
          <thead>
            <th>品名</th>
            <th class="text-end">數量</th>
            <th class="text-end">價格</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td class="text-end">{{ item.qty }}</td>
              <td class="text-end">${{ $filters.currency(item.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end" style="background: #eee;">總計</td>
              <td class="text-end">NT ${{ $filters.currency(order.total) }}</td>
            </tr>
          </tfoot>
        </table>
        <p>收件資訊如下</p>
        <table class="table">
          <tbody>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end">
          <button class="btn btn-purple" @click="gotoProduct">繼續購物</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.userorder {
  margin-top: 120px;
  margin-bottom: 2em;

  @media(max-width:960px) {}

  h3 {
    color: purple;
  }

  p {
    color: purple;
    font-weight: bold;
  }
}

.table {
  margin-bottom: 2em;
  border: solid 1px #ddd;

  th {
    min-width: 250px;
    color: #333;
    background: #dacce6;
    padding: 5px;

    @media(max-width:960px) {
      min-width: 100px;
    }
  }

  td {
    border: solid 1px #ddd;
    padding: 5px;
  }
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
</style>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        if (res.data.success) { // 如果成功取得資料
          this.order = res.data.order; // 將取得的資料存入order
        }
      });
    },
    gotoProduct() {
      this.$router.push('/productlist/allproducts');
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
