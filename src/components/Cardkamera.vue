<template>
<div class="row">
    <div class="col-lg-4 mt-3" v-for="(kameras, index) in kamera" :key="index">     
<div class="card">
  <div class="card-header"><img :src="kameras.image" /></div>
  <div class="card-body">
    <h5 class="card-title">{{ kameras.merk }}</h5>
    <p class="card-text">{{ kameras.harga }}</p>
    <p class="card-text">{{kameras.kategori.name}}</p>
  </div>
  <div class="card-footer text-muted">
    <router-link class="btn btn-primary" :to="{name:'Detailkamera', params:{id:kameras.id}}">Detail</router-link>
  </div>
  </div>
</div>
</div>
</template>

<script>
export default {
    props: ["kamera"],
};

</script>

