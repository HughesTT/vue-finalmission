<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': pages.has_pre < 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{ 'active': page === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': pages.has_next < 1 }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="endPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page); // emit-pages :切換頁面事件的名稱， page :頁碼
    },
    nextPage() {
      if (this.pages.has_next === true) {
        this.$emit('emit-pages', this.pages.current_page + 1); // 切換到下一頁
      }
    },
    prePage() {
      if (this.pages.has_pre === true) {
        this.$emit('emit-pages', this.pages.current_page - 1); // 切換到上一頁
      }
    },
    endPage() {
      if (this.pages.total_pages) {
        this.$emit('emit-pages', this.pages.total_pages);
      }
    },
  },
};
</script>
