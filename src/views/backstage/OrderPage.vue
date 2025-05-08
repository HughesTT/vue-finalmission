<template>
  <div>
    <LoadingElement :active="isLoading"></LoadingElement>
    <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>商品 / 數量</th>
            <th>購買金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, key) in orders" :key="key">
            <tr>
              <!-- 加入filters元件轉換時間格式，$filters 為自定義屬性名稱，最前方加上"$"可避免與區域元件內的變數產生衝突 -->
              <td>{{ $filters.date(item.create_at) }}</td>
              <td>{{ item.user.email }}</td>
              <td>
                <ul class="list-unstyle">
                  <li v-for="(product, i) in item.products" :key="i">
                    {{ product.product.title }}<br />
                    數量: {{ product.qty }}{{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>{{ $filters.currency(item.total) }}</td>
              <td>
                <div class="form-check form-switch">
                  <label :for="`paidSwitch${item.id}`" class="form-check-label">
                    <input type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid"
                      @change="updatePaid(item)" class="form-check-input">
                    <span v-if="item.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </td>
              <td>
                <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(item)">檢視</button>
                <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelOrderModal(item)">刪除</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
    <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
    <OrderModal ref="orderModal" :order="tempOrder" @update-order="updatePaid"></OrderModal>
  </div>
</template>

<style>
button {
  margin-right: 10px;
}
</style>

<script>
import DelModal from '@/components/backstage/DelModal.vue';
import OrderModal from '@/components/backstage/OrderModal.vue';
import Pagination from '@/components/PaginationEl.vue';

export default {
  data() {
    return {
      orders: [], // 訂單內容
      pagination: {}, // 分頁
      tempOrder: {}, // 目前品項的內容
      isNew: false, // 是否為新增
      isLoading: false, // 讀取動態效果
      currentPage: 1, // 目前頁碼
    };
  },
  components: {
    DelModal,
    OrderModal,
    Pagination,
  },
  inject: ['emitter'],
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          console.log(res);
          console.log(this.orders);
        }
      });
    },
    openModal(item) {
      this.tempOrder = { ...item }; // 解構item
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    updatePaid(item) {
      // 更新資料的api路徑
      this.isLoading = true; // 執行loading動態
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      // 宣告paid為is_paid
      const paid = {
        is_paid: item.is_paid,
      };
      // 使用put方法傳送資料
      this.$http.put(api, { data: paid }).then((res) => {
        this.isLoading = false; // 停止loading動態
        this.getOrders(this.currentPage); // 取得目前頁面的訂單資料
        console.log(res);
      });
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item }; // 解構item
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http.delete(api).then((res) => {
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        console.log(res);
        this.emitter.emit('update-orders');
      });
    },
  },
  mounted() {
    this.emitter.on('update-orders', () => {
      this.getOrders();
    });
  },
  created() {
    this.getOrders();
  },
};
</script>
