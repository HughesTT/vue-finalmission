<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增 / 編輯優惠券</h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">
              標題
              <input type="text" class="col-12 form-control" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
            </label>
          </div>
          <div class="mb-3">
            <label for="coupon">
              優惠碼
              <input type="text" class="form-control" id="coupon_code" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
            </label>
          </div>
          <div class="mb-3">
            <label for="due_date">
              使用期限
              <input type="date" class="form-control" id="due_date" v-model="due_date"></label>
          </div>
          <div class="mb-3">
            <label for="price">
              折扣百分比
              <input type="number" class="form-control" id="price" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </label>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <label for="is_enabled" class="form-check-label">
                是否啟用
                <input type="checkbox" class="form-check-input" :true-value="1" :false-value="0"
                  v-model="tempCoupon.is_enabled">
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">更新優惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  name: 'ccouponModal',
  props: {
    coupon: {},
  },
  data() {
    return {
      tempCoupon: {}, // 接收外層傳來帶入的資料
      due_date: '', // 到期日
    };
  },
  emits: ['update-coupon'],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T'); // toISOString時間格式轉換，split將原字串分割成子字串，再回傳
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000); // 無條件捨去，回傳「小於等於」所給數字的最大整數
    },
  },
  mixins: [modalMixin],
};
</script>
