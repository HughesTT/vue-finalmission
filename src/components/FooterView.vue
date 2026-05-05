<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-12 footer_section">
          <div class="foot_title">Bolby Digital</div>
          <div>
            <router-link to="/aboutus" class="foot_subtitle">- 品牌故事</router-link>
          </div>
          <div>
            <router-link to="/service" class="foot_subtitle">- 付款、運送、退貨須知</router-link>
          </div>
        </div>
        <div class="col-md-3 col-12 footer_section">
          <div class="foot_title">Service</div>
          <div class="foot_subtitle">service@bolbydigital.com.tw</div>
          <div class="foot_subtitle">+886 2 8787-0857</div>
          <div class="foot_subtitle">
            <router-link to="/backstage">登入管理</router-link>
          </div>
        </div>
        <div class="col-md-3 col-12 footer_section">
          <div class="foot_title">Follow</div>
          <div class="socialicon">
            <i class="bi bi-instagram"></i>
            <i class="bi bi-twitter-x"></i>
            <i class="bi bi-threads"></i>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-youtube"></i>
          </div>
        </div>
        <div class="col-md-3 col-12 footer_section">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="輸入Email訂閱電子報" aria-label="輸入Email訂閱電子報"
              aria-describedby="button-addon2" v-model="subscribeEmail" @keyup.enter="subscribe">
            <button class="btn btn-outline-light" type="button" id="button-addon2" @click="subscribe">訂閱</button>
            <p>訂閱電子報可收到優惠訊息以及最新產品資訊。</p>
          </div>
        </div>

        <div class="col-md-12 col-12 footer_section cright">
          ©Bolby Digital Inc. ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  background-color: rgb(126, 86, 195);
  padding: 2em 0;
  color: #d2b4ff;
  font-weight: bold;

  a {
    color: #d2b4ff;
    text-decoration: none;
  }

  @media(max-width:960px) {
    padding: 2em 2em;
  }
}

.foot_title {
  color: #ddd;
}

.foot_subtitle {
  font-size: 1em;
  margin-left: 0.5em;
  color: #d2b4ff;
}

.footer_section {
  margin-bottom: 1.5em;
}

.cright {
  @media(max-width:960px) {
    text-align: center;
  }
}

.socialicon i {
  margin-right: 1em;
}

.input-group p {
  margin-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      subscribeEmail: '',
    };
  },
  methods: {
    subscribe() {
      if (!this.subscribeEmail) {
        this.$httpMessageState({ error: true }, '請輸入電子郵件地址');
        return;
      }
      const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRule.test(this.subscribeEmail)) {
        this.$httpMessageState({ success: false }, '請輸入有效的電子郵件地址');
        return;
      }
      this.$httpMessageState({ success: true }, '訂閱電子報成功');
      this.subscribeEmail = '';
    },
  },
};
</script>
