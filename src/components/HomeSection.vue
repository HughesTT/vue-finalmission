<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <img src="../assets/img/homesection.png" class="img-fluid">
        </div>
        <div class="bgcolorsection"></div>
        <div class="col-md-5">
          <img src="../assets/img/pursue.png" class="img-fluid">
        </div>
      </div>
    </div>
  </section>
</template>

<style>
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
  margin: 5em 0;

  @media(max-width:960px) {
    margin: 1em 0;
  }
}
</style>

<script></script>
