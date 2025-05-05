<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../assets/img/logo.png" alt="" class="img-fluid" width="80">
      </a>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <router-link to="/aboutus" class="nav-link" active-class="active">關於我們</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/productlist/allproducts" class="nav-link" active-class="active">所有商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/favorite" class="nav-link" active-class="active">
            <div class="bubleF" v-if="favNum !== 0">{{ favNum }}</div>
            <i class="bi bi-heart"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/cart" class="nav-link" active-class="active">
            <div class="bubleF" v-if="cartNum !== 0">{{ cartNum }}</div>
            <i class="bi bi-cart2"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
nav {
  background: #fff;
  z-index: 99;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #7030a0;
  text-decoration: none;
  background-image: linear-gradient(#7030a0, #7030a0);
  background-size: 0% 0.15em;
  background-position-y: 100%;
  background-position-x: 100%;
  background-repeat: no-repeat;
  transition: background-size 0.2s ease-in-out;

  @media(max-width:960px) {
    font-size: 1.1em;
  }
}

.nav-link:hover,
.nav-link:focus,
.nav-link.active {
  color: #7030a0;
  background-size: 100% 0.1em;
  background-position-x: 0%;
}

.bubleF {
  position: absolute;
  font-size: 0.5em;
  background: #7030a0;
  color: #fff;
  padding: 0 5px;
  border-radius: 5px;
  margin-left: 16px;
  margin-top: -5px;
}
</style>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      favNum: 0,
      cartNum: 0,
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        this.cart = res.data.data;
        if (res.data.success) {
          this.cartNum = res.data.data.carts.length;
        }
      });
    },
    getFavorite() {
      this.favNum = (JSON.parse(localStorage.getItem('favorite')) || []).length; // 更新 favNum
    },
  },
  mounted() {
    emitter.on('update-cart', () => {
      this.getCart();
      console.log(`購物車${this.cartNum}`);
    });
    emitter.on('update-favorite', () => {
      this.getFavorite();
      console.log(`追蹤清單${this.favNum}`);
    });
  },
  created() {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
    this.$http.get(url).then((res) => {
      if (res.data.success) {
        this.cartNum = res.data.data.carts.length;
      }
    });
    this.favNum = (JSON.parse(localStorage.getItem('favorite')) || []).length;
  },
};
</script>
