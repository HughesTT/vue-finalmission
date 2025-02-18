<template>
  <div>
    <NavBar />
    <HeaderBanner />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import HeaderBanner from '@/components/HeaderBanner.vue';
import Footer from '@/components/FooterView.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    HeaderBanner,
    Footer,
  },
};
</script>
