<template>
  <div class="errorpage">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-4 errorimg">
          <img src="../assets/img/404.png" class="img-fluid">
        </div>
        <div class="errorcontent text-center">Oooops,找不到頁面</div>
        <router-link to="/" class="errbackhome text-center">回 Bolby Digital 首頁</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.errorimg {
  margin-top: 8%;
}

.errorcontent {
  font-size: 1.7em;
  margin-top: 1em;
}

.errbackhome {
  width: 190px;
  margin-top: 1.5em;
  text-decoration: none;
  color: purple;
  font-weight: bold;
  padding: 1em;
  border: solid 1px purple;
  border-radius: 30px;
  transition: ease-in-out 0.3s;

  &:hover {
    background: purple;
    color: #fff;
  }
}
</style>

<script></script>
