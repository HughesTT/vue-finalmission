<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div>
    <NavBar />
    <HeaderBanner />
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <img src="../assets/img/homesection.png" class="img-fluid">
          </div>
          <div class="bgcolorsection"></div>
          <div class="col-md-5">
            <img src="../assets/img/pursue.png" class="img-fluid">
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style>
.bgcolorsection {
  position: absolute;
  z-index: -1;
  width: 60%;
  height: 45%;
  background: #ddd;
  margin-top: 10%;
  margin-left: 15%;
}

section {
  margin: 5em 0;

  @media(max-width:960px) {
    margin: 1em 0;
  }
}
</style>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import HeaderBanner from '@/components/HeaderBanner.vue';
import Footer from '@/components/FooterView.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    NavBar,
    HeaderBanner,
    Footer,
  },
};
</script>
