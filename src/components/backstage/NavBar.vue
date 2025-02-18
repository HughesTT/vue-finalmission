<template>
  <div>
    <nav class="navbg navbar navbar-expand-lg">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <router-link to="/dashboard/products" class="nav-link">商品管理</router-link>
        <router-link to="/dashboard/orders" class="nav-link">訂單管理</router-link>
        <router-link to="/dashboard/coupons" class="nav-link">優惠券管理</router-link>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
        <router-link to="/" class="nav-link">前台</router-link>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
nav {
  z-index: 99;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 20px;
  color: #7030a0;
  text-decoration: none;
  background-image: linear-gradient(#7030a0, #7030a0);
  background-size: 0% 0.15em;
  background-position-y: 100%;
  background-position-x: 100%;
  background-repeat: no-repeat;
  transition: background-size 0.2s ease-in-out;
}

.nav-link:hover,
.nav-link:focus,
.nav-link:active {
  color: #7030a0;
  background-size: 100% 0.1em;
  background-position-x: 0%;
}
</style>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/backstage');
          }
        });
    },
  },
};
</script>
