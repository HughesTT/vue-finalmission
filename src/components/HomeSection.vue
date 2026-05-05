<template>
  <section>
    <div class="bluetooth_section">
      <div class="row">
        <div class="col-md-7">
          <img src="../assets/img/homesection.png" class="img-fluid">
        </div>
        <div class="bgcolorsection"></div>
        <div class="col-md-5">
          <div class="bluetooth_section_content">
            <div class="section_title">無線自由 真實聲音</div>
            <div class="sub_section_title">親耳感受</div>
            <p>無論身處健身房、辦公室或任何場所，都能全心投入、保持專注。</p>
            <div class="home_categorybtn" @click.prevent="toCategory('bluetooth')">藍芽</div>
          </div>
        </div>
      </div>
    </div>
    <div class="noisecanceling_section">
      <div class="row">
        <div class="col-md-6">
          <div class="section_title">全面提升聆聽體驗</div>
          <p>優異的設計和奢華的材質，提供無與倫比的舒適。讓您的音樂感受達到更高的新境界。</p>
          <p>世界一流的消噪效能，比以往更安靜。突破性空間感音場，讓人聆聽時更沉醉其中。</p>
          <div class="home_categorybtn" @click.prevent="toCategory('noise-canceling')">降噪</div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
    <div class="gaming_section">
      <div class="row">
        <div class="col-md-5">
          <img src="../assets/img/gaming.jpg" class="sectionimg img-fluid">
        </div>
        <div class="col-md-7">
          <div class="section_title">超長續航 遊戲不斷</div>
          <p>如果電競是你的天命，那就戴上與頂尖電競專業玩家聯合設計的終極無線耳麥，正面迎戰激烈的遊戲戰場。</p>
          <p>專為滿足極致需求而生，帶給你清晰音訊、進階的噪音隔離效果，以及適合全日使用的舒適。</p>
          <div class="home_categorybtn" @click.prevent="toCategory('gaming')">電競</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.bgcolorsection {
  position: absolute;
  z-index: -1;
  width: 55%;
  height: 40%;
  background: #eee;
  margin-top: 5%;
  margin-left: 15%;

  @media(max-width:960px) {
    width: 60%;
    height: 40%;
    background: #ddd;
    margin-top: 20%;
    margin-left: 35%;
  }
}

section {
  margin: 5em 0 0 0;

  @media(max-width:960px) {
    margin: 0;
  }
}

.bluetooth_section {
  padding: 2em;

  @media(max-width:960px) {
    padding-left: 0;
  }

  .sectionimg {
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);

    @media(max-width:960px) {
      clip-path: none;
    }
  }

  .bluetooth_section_content {
    margin-left: 3em;
  }

  .section_title {
    font-size: 4em;
    font-weight: bold;
    margin-top: 10%;

    @media(max-width:960px) {
      font-size: 2em;
      margin-top: 30px;
    }
  }

  .sub_section_title {
    font-size: 3em;

    @media(max-width:960px) {
      font-size: 1.5em;
    }
  }

  .home_categorybtn {
    text-align: center;
    width: 100px;
    border: solid 1px #333;
    color: #333;
    border-radius: 30px;
    padding: 5px 10px;
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover {
      background: #333;
      color: #fff;
    }
  }
}

.noisecanceling_section {
  background: url('../assets/img/noisecanceling_bg.jpg') no-repeat center center;
  background-size: cover;
  padding: 5em 2em;
  color: #fff;
  padding-left: 5em;
  min-height: 580px;

  @media(max-width:960px) {
    background: url('../assets/img/noisecanceling_bg.jpg') no-repeat;
    background-position: right 10% bottom 45%;
    padding: 2em;
  }

  .sectionimg {
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);

    @media(max-width:960px) {
      clip-path: none;
    }
  }

  .section_title {
    font-size: 5em;
    font-weight: bold;
    margin-top: 10%;

    @media(max-width:960px) {
      font-size: 2em;
      margin-top: 2em;
    }
  }

  .home_categorybtn {
    text-align: center;
    width: 100px;
    border: solid 1px #fff;
    color: #fff;
    border-radius: 30px;
    padding: 5px 10px;
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover {
      background: #fff;
      color: #333;
    }
  }
}

.gaming_section {
  background: url('../assets/img/gaming_bg.jpg') no-repeat center center;
  background-size: cover;
  padding: 5em 2em;
  color: #fff;

  @media(max-width:960px) {
    background: url('../assets/img/gaming_bg.jpg') no-repeat center left;
    padding: 2em;
  }

  .sectionimg {
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);

    @media(max-width:960px) {
      clip-path: none;
    }
  }

  .section_title {
    font-size: 5em;
    font-weight: bold;
    margin-top: 10%;

    @media(max-width:960px) {
      font-size: 2em;
      margin-top: 30px;
    }
  }

  .home_categorybtn {
    text-align: center;
    width: 100px;
    border: solid 1px #fff;
    color: #fff;
    border-radius: 30px;
    padding: 5px 10px;
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover {
      background: #fff;
      color: #333;
    }
  }
}
</style>

<script>
export default {
  methods: {
    toCategory(category) {
      this.$router.push(`/productlist/${category}`);
    },
  },
};
</script>
