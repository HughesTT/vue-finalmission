<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="signinUI col-md-5 mt-3">
        <img src="@/assets/img/logo.png" alt="Bolby Logo" class="img-fluid mb-3"
          style="display: block;margin-left: auto;margin-right: auto;width: 50%;" />
        <h3>後台管理系統</h3>
        <div class="mb-3">
          <label for="inputEmail" class="row sr-only">
            電子信箱
            <input v-model="user.username" type="email" id="inputEmail" class="form-control" placeholder="Email" />
          </label>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="row sr-only">
            密碼
            <input v-model="user.password" type="password" id="inputPassword" class="form-control"
              placeholder="Password" required />
          </label>
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-secondary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
h3 {
  font-weight: bold !important;
  text-align: center;
}

label {
  font-weight: bold;
}

.signinUI {
  border-radius: 20px;
  background: #fff;
  padding: 40px !important;
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `userToken=${token};expires=${new Date(expired)};`;
            this.$router.push('/dashboard');
          }
        });
    },
  },
};
</script>
