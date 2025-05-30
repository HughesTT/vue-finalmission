<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div class="container">
    <h3>商品管理</h3>
    <button class="btn btn-purple" type="button" @click.prevent="openModal(true)">新增商品</button>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120" class="text-center">分類</th>
          <th width="120">商品圖片</th>
          <th width="300">產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td><img class="img-fluid" :src="item.imageUrl" alt="" width="100"></td>
          <td class="col-4">{{ item.title }}</td>
          <td class="text-center">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-center">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-success btn-sm" @click.prevent="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProduct"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @del-item="delProduct" />
</template>

<style lang="scss">
body {
  padding-bottom: 3em;
}

button {
  margin-right: 10px;
}

.loadingmask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background-color: rgba(255, 255, 255);
}

.loading {
  position: fixed;
  top: 45%;
  left: 45%;
}
</style>

<script>
import ProductModal from '@/components/backstage/ProductModal.vue';
import DelModal from '@/components/backstage/DelModal.vue';
import Pagination from '@/components/PaginationEl.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ['emitter'],
  methods: {
    getProduct(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempProduct = {}; // 若為新增，modal欄位皆為空白
      } else {
        this.tempProduct = { ...item }; // 若為編輯，將item資料帶入欄位
      }
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`; // 調整為修改品項id的api路徑
        httpMethod = 'put'; // 資料傳送方式調整為put
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        productComponent.hideModal();
        if (res.data.success) {
          this.getProduct();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新完成',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('`'),
          });
        }
      });
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal(); // 打開帶入對應目標資料的modal
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        this.$httpMessageState(res, '刪除商品');
        const delComponent = this.$refs.delModal;
        delComponent.hideModal(); // 刪除後關閉modal
        this.getProduct(); // 重新取得商品列表
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
