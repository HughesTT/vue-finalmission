<template>
  <NavBar />
  <div class="container">
    <div class="serviceinfo">
      <h3>付款、運送、退貨須知</h3>
      <div class="row">
        <div class="col-md-7">
          <div class="servicecontent">
            <p>感謝您選擇 BOLBY DIGITAL 的產品！</p>
            <p>我們希望您能享受這次的購物體驗。</p>
            <p>以下是我們的付款、運送和退貨政策，請在購買前仔細閱讀。</p>
          </div>
        </div>
        <div class="col-md-5">
          <img src="../assets/img/serviceinfo.jpg" alt="" class="img-fluid">
        </div>
      </div>
    </div>
  </div>
  <div class="notify">
    <div class="row">
      <div class="notifybox col-md-4">
        <div class="notify-icon">
          <i class="bi bi-truck"></i>
        </div>
        <div class="notify-title">
          運送 & 運費須知
        </div>
        <div class="notify-border"></div>
        <div class="notify-content">
          <p>運費會根據送貨區域而有所不同。<br>
            如果一次購買商品總金額達到NT$8000或以上，則運費免費。</p>
        </div>
      </div>
      <div class="notifybox col-md-4">
        <div class="notify-icon">
          <i class="bi bi-info-circle"></i>
        </div>
        <div class="notify-title">
          退貨須知
        </div>
        <div class="notify-border"></div>
        <div class="notify-content">
          <div class="notify-box">
            <div class="notify-boxtitle">- 瑕疵品</div>
            <p>若收到產品後請立即與我們聯繫。請注意，除非產品本身的瑕疵，否則將不受理退貨。</p>
          </div>
          <div class="notify-box">
            <div class="notify-boxtitle">- 退貨期限</div>
            <p>請在收到產品後 7 天內透過電子郵件或電話聯絡我們以了解詳細資訊。 請注意，視實際情況可能無法受理退貨、換貨或取消。</p>
          </div>
        </div>
      </div>
      <div class="notifybox col-md-4">
        <div class="notify-icon">
          <i class="bi bi-coin"></i>
        </div>
        <div class="notify-title">
          付款方式
        </div>
        <div class="notify-border"></div>
        <div class="notify-content">
          <div class="notify-box">
            <div class="notify-boxtitle">- 信用卡付款</div>
            <img src="../assets/img/creditcard.png" alt="" class="img-fluid" width="120">
          </div>
          <div class="notify-box">
            <div class="notify-boxtitle">- 貨到付款</div>
            <p>超商或宅配取貨付款。 請注意，付款費用會根據產品價格而有所不同。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss">
body {
  background: #fff;
}

.container {
  margin-top: 2rem;
}

.serviceinfo {
  padding: 1em 0 5em 0;

  h3 {
    font-weight: bold;
    color: purple;
  }
}

.servicecontent {
  margin-top: 2em;
  font-size: 1.3em;
}

.notify {
  background: #eee;
  padding: 2em 0 2.5em 0;
  color: #333;
}

.notify-icon {
  font-size: 3.5em;
  text-align: center;
  color: #333;
}

.notify-title {
  font-size: 1.3em;
  text-align: center;
  margin-bottom: 1em;
}

.notify-border {
  width: 100%;
  height: 1px;
  background: #999;
  margin-bottom: 1em;
}

.notify-content {
  padding: 0 1.5em;
}

.notify-box {
  margin-bottom: 1em;
}

.notify-boxtitle {
  font-weight: bold;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/FooterView.vue';

export default {
  name: 'AboutView',
  components: {
    NavBar,
    Footer,
  },
  methods: {
    scrollBehavior() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    // Scroll to top when thedcomponent is created
    this.scrollBehavior();
  },
};
</script>
