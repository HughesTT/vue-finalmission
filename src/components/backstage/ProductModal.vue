<template>
  <LoadingElement :active="isLoading"></LoadingElement>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-purple text-white">
          <h5 class="modal-title" id="exampleModalLabel">商品新增 / 編輯</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="image" class="form-label">
                    輸入圖片網址
                    <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                      placeholder="請輸入圖片連結">
                  </label>
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                    <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile">
                  </label>
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                <!-- 延伸技巧，多圖 -->
                <div class="mt-5" v-if="tempProduct.images">
                  <div v-for="(image, key) in tempProduct.images" class="mb-3 input-group" :key="key">
                    <input type="url" class="form-control form-control" v-model="tempProduct.images[key]"
                      placeholder="請輸入連結" />
                    <button type="button" class="btn btn-outline-danger" @click="tempProduct.images.splice(key, 1)">
                      移除
                    </button>
                  </div>
                  <div v-if="
                    tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length
                  ">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.images.push('')">
                      新增圖片
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">
                    標題
                    <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                  </label>
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">
                      分類
                      <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                        placeholder="請輸入分類">
                    </label>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">
                      單位
                      <input type="text" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                    </label>
                  </div>
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">
                      原價
                      <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                        placeholder="請輸入原價">
                    </label>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">
                      售價
                      <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                        placeholder="請輸入售價">
                    </label>
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label col-md-12">
                    產品描述
                    <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                      placeholder="請輸入產品描述"></textarea>
                  </label>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label col-md-12">
                    說明內容
                    <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                      placeholder="請輸入產品說明內容"></textarea>
                  </label>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                      <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                        :false-value="0" id="is_enabled">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      // 多圖範例，建立圖片連結陣列
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData(); // 建立form-data格式內容
      formData.append('file-to-upload', uploadedFile); // 增加欄位到表單
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((res) => {
        this.$httpMessageState(res, '上傳圖片');
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
        }
      });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.tempProduct = this.product;
  },
};
</script>
