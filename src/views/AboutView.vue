<template>
  <NavBar />
  <div class="container">
    <div class="about">
      <div class="row">
        <div class="col-lg-6 col-xs-12">
          <h1>你還未聽到音樂的全部</h1>
          <div class="aboutcontent quote">
            <p></p>
            <p> </p>
          </div>
          <div class="aboutcontent">
            <p>BOLBY DIGITAL 為 2006 年創立的領先性音訊品牌。</p>
            <p>BOLBY
              DIGITAL透過一系列高品質耳罩式耳機、入耳式耳機和揚聲器，將頂級音效娛樂的可能性推向全新境界。</p>
            <p>品牌持續交出亮眼成績，將專業錄音室中充滿動能、熱情和興奮感的音響播放品質，重新注入全球音樂愛好者的聆聽體驗中。
            </p>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <img src="../assets/img/about.jpg" alt="aboutus" class="img-fluid aboutimg">
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss">
body {
  background: #fff;
}

.about {
  padding-bottom: 3em;
}

.about h1 {
  margin-top: 2em;
  font-weight: bold;
}

h1 span {
  font-weight: bold;
  color: #7030a0;
}

.aboutcontent {
  margin-top: 2em;
  font-size: 1.3em;
}

.aboutimg {
  margin-top: 2em;
}

.quote {
  font-size: 1.5em;
  font-weight: bold;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/FooterView.vue';

export default {
  name: 'AboutView',
  components: {
    NavBar,
    Footer,
  },
  methods: {
    scrollBehavior() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.scrollBehavior();
  },
};
</script>
