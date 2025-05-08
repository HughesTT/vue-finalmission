<template>
  <div class="homecoupon">
    <div class="homecoupon-box">
      <div class="homecoupon-text">母親節優惠碼</div>
      <div class="homecoupon-code">
        ILOVEMOM
      </div>
      <!-- 使用 v-show 控制顯示與隱藏 -->
      <div class="homecoupon-codecopy" v-show="copycheck">
        <i class="bi bi-check"></i>複製成功
      </div>
      <div class="homecoupon-codecopy" @click="copyCouponcode" v-show="!copycheck">
        <i class="bi bi-copy"></i> 點我複製
      </div>
    </div>
  </div>
</template>

<style>
.homecoupon {
  background: url(../assets/img/couponbg.png) no-repeat center center;
  width: 100%;
  height: 400px;
}

.homecoupon-box {
  position: relative;
  top: 70%;
  margin-left: 30%;
}

.homecoupon-text {
  color: purple;
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 5px;
}

.homecoupon-code {
  width: 280px;
  padding: 5px 1em;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 1.3em;
  box-shadow: 4px 4px 8px rgba(20%, 20%, 40%, 0.5);
}

.homecoupon-codecopy {
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 0.5em;
}
</style>

<script>
export default {
  data() {
    return {
      copycheck: false,
    };
  },
  methods: {
    copyCouponcode() {
      const couponCode = 'ILOVEMOM';
      navigator.clipboard.writeText(couponCode)
        .then(() => {
          this.copycheck = true; // 顯示 checkfalse，隱藏 checktrue
          setTimeout(() => {
            this.copycheck = false; // 2 秒後恢復初始狀態
          }, 2000);
        })
        .catch((err) => {
          console.error('複製失敗：', err);
        });
    },
  },
};
</script>
