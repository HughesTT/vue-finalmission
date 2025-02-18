<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div class="container mt-4">
    <button class="btn  btn-purple" @click.prevent="openCouponModal(true)">
      建立優惠券
    </button>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣</th>
          <th>使用期限</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click.prevent="openCouponModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon">
    </CouponModal>
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<style></style>

<script>
import CouponModal from '@/components/backstage/CouponModal.vue';
import DelModal from '@/components/backstage/DelModal.vue';

export default {
  components: {
    CouponModal,
    DelModal,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {}, // 優惠券
      tempCoupon: { // 新增或編輯優惠券暫時儲存的位址
        title: '', // 優惠券名稱
        is_enabled: 0, // 是否啟用
        percent: 100, // 折扣百分比
        code: '', // 折扣碼
      },
      isNew: false, // 判別是否為新增或編輯，預設false
      isLoading: false, // 資料讀取的動態效果
    };
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        }; // 若為新增，modal欄位為空白，日期欄位為當下日期
      } else {
        this.tempCoupon = { ...item }; // 若為編輯，將item資料帶入欄位
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons;
        this.isLoading = false;
        console.log(this.coupons);
      });
    },
    updateCoupon(tempCoupon) {
      // 如優惠券為新增
      this.isLoading = true;
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          console.log(res, tempCoupon);
          this.$httpMessageState(res, '新增優惠券'); // 顯示推播
          this.getCoupons(); // 重新讀取優惠券
          this.$refs.couponModal.hideModal(); // 將modal關閉
        });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          this.$httpMessageState(res, '更新優惠券');
          this.$refs.couponModal.hideModal();
          this.getCoupons();
          this.isLoading = false;
        });
      }
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        this.$httpMessageState(res, '刪除優惠券');
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
