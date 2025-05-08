<template>
  <div class="onsaleproducts">
    <div class="container">
      <div class="row justify-content-md-center">
        <h3>熱銷商品</h3>
        <div class="productbox col-md-3 col-6" v-for="item in products" :key="item.id">
          <a href="#" @click.prevent="viewProduct(item.id)">
            <div class="product_img">
              <div class="morebox">
                <div class="morebtn">more</div>
              </div>
              <img :src="item.imageUrl" class="img-fluid" alt="image">
            </div>
            <div class="product_title">
              {{ item.title }}
            </div>
            <div class="product_price">
              $ {{ $filters.currency(item.price) }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}

h3 {
  font-weight: bold;
  color: purple;
}

.onsaleproducts {
  margin: 5em 0 3em 0;

  @media(max-width:960px) {
    margin-top: 60px;
  }
}

.productbox {
  margin-bottom: 1.5em;
}

.product_title {
  color: #777;
  font-weight: bold;
  font-size: 1em;
  line-height: 1.3em;
}

.product_img {
  width: 100%;
  padding: 0 1em;
}

.product_img img {
  transition: all 0.3s ease-in-out;
}

.product_img:hover img {
  opacity: 0.6;
}

.morebox {
  position: relative;
}

.morebtn {
  position: absolute;
  z-index: 999;
  top: 150px;
  left: 47%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;
  padding: 0.5em;
  border-radius: 5px;
  opacity: 0;

  @media(max-width: 960px) {
    top: 100px;
    left: 45%;
  }
}

.product_img:hover .morebtn {
  opacity: 1;
  background: #7030a0;
  color: #fff;
}

.product_price {
  font-size: 1em;
  font-weight: bold;
  color: blueviolet;
}
</style>

<script>
export default {
  data() {
    return {
      products: [
        {
          title: 'RS 9 幻彩版電競耳機',
          id: '-ONOE8MPlXPzy0pvdKXN',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/hughesh-api/1744179966908.jpg',
          orgin_price: '4680',
          price: '3990',
        },
        {
          title: 'PINK LADY Wireless耳機',
          id: '-ONORV0Wh0mhoGexvpLf',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/hughesh-api/1744189279230.jpg',
          orgin_price: '2990',
          price: '2690',
        },
        {
          title: 'DB Buds4 lite 無線藍芽耳機',
          id: '-ONOoCZ8szRMi3HMrAqj',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/hughesh-api/1744189667455.jpg',
          orgin_price: '3690',
          price: '2990',
        },
        {
          title: 'WH-A 主動式降噪耳機',
          id: '-ONOixmhE1FmZy0ovyti',
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/hughesh-api/1744188336018.jpg',
          orgin_price: '11900',
          price: '10400',
        },
      ],
    };
  },
  methods: {
    viewProduct(id) {
      this.$router.push(`/productlist/product/${id}`);
    },
  },
};
</script>
