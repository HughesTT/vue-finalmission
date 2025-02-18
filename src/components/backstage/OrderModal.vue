<template>
  <div class="modal" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="ordermodal modal-dialog modal-xl" role="document">
      <div class="modal-header border-0">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>訂單資料</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="userbox col-md-4">
            <h3>訂購人資料</h3>
            <table v-if="tempOrder.user">
              <tr>
                <th style="width:100px;">姓名</th>
                <td>{{ tempOrder.user.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ tempOrder.user.email }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ tempOrder.user.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ tempOrder.user.address }}</td>
              </tr>
            </table>
          </div>
          <div class="orderbox col-md-8">
            <h3>訂單內容</h3>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width:100px;">訂單編號</th>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <th>下單時間</th>
                  <td>{{ $filters.date(tempOrder.create_at) }}</td>
                </tr>
                <tr>
                  <th>付款時間</th>
                  <td>
                    <span v-if="tempOrder.paid_date">
                      {{ $filters.date(tempOrder.paid_date) }}
                    </span>
                    <span v-else>尚未付款</span>
                  </td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td>{{ $filters.currency(tempOrder.total) }}</td>
                </tr>
              </tbody>
            </table>
            <h3>選購商品</h3>
            <table class="table">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id">
                  <th>{{ item.product.title }}</th>
                  <td>數量 : {{ item.qty }}</td>
                  <td class="text-end">
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button class="btn btn-primary" @click.prevent="$emit('update-order', tempOrder)">確認</button>
      </div>
    </div>
  </div>
</template>

<style>
.ordermodal {
  background: #fff !important;
}

.userbox {
  border-right: 1px solid #333;
}

.userbox h3 {
  font-weight: bold;
}

.orderbox h3 {
  font-weight: bold;
}
</style>

<script>
import modalMixin from '@/mixins/modalMixin'; // 匯入modalMixin

export default {
  name: 'orderModal',
  props: {
    order: { // 外層使用tempOrder傳遞資料，內層以order接收
      type: Object, // order的類型為object
      default() { // 若外層未正確傳遞，則傳送空物件為預設值(default)
        return {};
      },
    },
  },
  data() {
    return {
      tempOrder: {},
      isPaid: false,
    };
  },
  mixins: [modalMixin], // 加入已建立相同程式碼modalMixin
  watch: {
    order() {
      this.tempOrder = this.order; // 將外層傳遞的資料，用新的order儲存接收，也是實際修改的名稱
      this.isPaid = this.tempOrder.is_paid; // isPaid資料為is_paid
    },
  },
};
</script>
