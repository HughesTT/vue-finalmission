<template>
  <div>
    <nav class="navbg navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../assets/img/logo.png" class="img-fluid" alt="BolbydigitalLogo" style="width: 100px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link to="/productlist" class="nav-link">Product</router-link>
            <router-link to="/aboutus" class="nav-link">About BOLBY</router-link>
            <router-link to="/backstage" class="nav-link">後台登入</router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
nav {
  z-index: 99;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 20px;
  color: #7030a0;
  text-decoration: none;
  background-image: linear-gradient(#7030a0, #7030a0);
  background-size: 0% 0.15em;
  background-position-y: 100%;
  background-position-x: 100%;
  background-repeat: no-repeat;
  transition: background-size 0.2s ease-in-out;
}

.nav-link:hover,
.nav-link:focus,
.nav-link:active {
  color: #7030a0;
  background-size: 100% 0.1em;
  background-position-x: 0%;
}
</style>
