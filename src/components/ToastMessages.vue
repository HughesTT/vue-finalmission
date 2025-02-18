<template>
  <div class="toast-container position-absoulute pe-3 top-0 end-0">
    <ToastPage v-for="(msg, key) in messages" :key="key" :msg="msg"></ToastPage>
  </div>
</template>

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
