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
  <div class="homecoupon-mobi">
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

<style lang="scss">
.homecoupon {
  background: url(../assets/img/couponbg.png) no-repeat center center;
  width: 100%;
  height: 400px;
  display: block;

  @media(max-width:960px) {
    display: none;
  }
}

.homecoupon-mobi {
  background: url(../assets/img/mobi_couponcode.png) no-repeat;
  background-size: cover;
  width: 100%;
  height: 250px;
  display: none;

  @media(max-width:960px) {
    display: block;
  }
}

.homecoupon-box {
  position: relative;
  top: 70%;
  margin-left: 30%;

  @media(max-width:960px) {
    top: 60%;
    margin-left: 7%;
  }
}

.homecoupon-text {
  color: purple;
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 5px;

  @media(max-width:960px) {
    font-size: 1em;
  }
}

.homecoupon-code {
  width: 280px;
  padding: 5px 1em;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 1.3em;
  font-weight: bold;
  color: rgb(211, 0, 0);
  box-shadow: 4px 4px 8px rgba(20%, 20%, 40%, 0.5);

  @media(max-width:960px) {
    width: 150px;
    padding: 5px 1em;
    font-size: 1em;
  }
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
