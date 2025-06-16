<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div>
    <ToastMessages />
    <NavBar />
    <HeaderBanner />
    <HomesectionOnsale />
    <CouponView />
    <HomeSection />
    <Footer />
  </div>
</template>

<style></style>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import HeaderBanner from '@/components/HeaderBanner.vue';
import HomeSection from '@/components/HomeSection.vue';
import CouponView from '@/components/CouponView.vue';
import HomesectionOnsale from '@/components/HomesectionOnsale.vue';
import Footer from '@/components/FooterView.vue';
import ToastMessages from '@/components/ToastMessages.vue';

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
    HomeSection,
    CouponView,
    HomesectionOnsale,
    ToastMessages,
  },
};
</script>
