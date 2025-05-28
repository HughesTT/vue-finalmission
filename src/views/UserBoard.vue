<template>
  <div>
    <NavBar></NavBar>
    <RouterView />
    <Footer></Footer>
    <ToastMessages />
  </div>
</template>

<style></style>

<style></style>

<script>
import NavBar from '@/components/NavBar.vue';
import emitter from '@/methods/emitter';
import Footer from '@/components/FooterView.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    NavBar,
    Footer,
    ToastMessages,
  },
};
</script>
