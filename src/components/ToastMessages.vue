<template>
  <div class="toast-container position-fixed pe-3 text-center">
    <ToastPage v-for="(msg, key) in messages" :key="key" :msg="msg"></ToastPage>
  </div>
</template>

<style>
.toast-container {
  top: 1em;
  right: 37% !important;

  @media(max-width: 960px) {
    left: 15px !important;
  }
}
</style>

<script>
import ToastPage from '@/components/ToastPage.vue';

export default {
  components: { ToastPage },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
