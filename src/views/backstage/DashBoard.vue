<template>
  <NavBar />
  <div class="container-fluid mt-3 position-relative"></div>
  <ToastMessages></ToastMessages>
  <div class="dashboard">
    <div class="container">
      <h1>BOLBY DIGITAL後台管理系統</h1>
      <p>請點選上列選項以進行資料管理</p>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  background: #fff;
}

.dashboard {
  text-align: center;
}

h1 {
  font-weight: bold;
}
</style>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import NavBar from '@/components/backstage/NavBar.vue';

export default {
  components: {
    NavBar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    // 宣告token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    // 宣告api路徑(檢查是否持續登入的路徑)
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user)
      .then((res) => {
        // 如果登入失敗
        if (!res.data.success) {
          // 轉到loginpage頁面
          this.$router.push('/backstage');
        }
      });
  },
};
</script>
