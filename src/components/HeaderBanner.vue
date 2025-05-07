<template>
  <div>
    <div id="carouselExampleAutoplaying" class="headerbanner carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/headerbanner01.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/headerbanner02.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/headerbanner03.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/headerbanner04.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div id="carouselExampleAutoplaying1" class="headerbannermobi carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/mobibanner-1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/mobibanner-2.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/mobibanner-3.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/mobibanner-4.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying1"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying1"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.headerbanner {
  z-index: 1;
  display: block;

  @media(max-width:960px) {
    display: none;
  }
}

.headerbannermobi {
  display: none;

  @media(max-width:960px) {
    display: block;
  }
}
</style>
