<template>
<div class="row">
    <div class="col-lg-4 mt-3" v-for="(sewas, index) in sewa" :key="index">     
<div class="card">
  <div class="card-header">{{sewas.image}}</div>
  <div class="card-body">
    <h5 class="card-title">{{ sewas.kamera.merk }}</h5>
    <p class="card-text">{{ sewas.kamera.harga }}</p>
    <p class="card-text">{{ sewas.penyewa }}</p>
    <p class="card-text">{{ sewas.jaminan }}</p>
    <p class="card-text">{{ sewas.tgl_sewa }}</p>
    <p class="card-text">{{ sewas.tgl_kembali }}</p>
    <p class="card-text">{{ sewas.denda }}</p>
    <p class="card-text">{{ sewas.total }}</p>
  </div>
  <div class="card-footer text-muted">
    <router-link class="btn btn-primary" :to="{name:'Detailsewa', params:{id:sewas.id}}">Detail</router-link>
  </div>
  </div>
</div>
</div>
</template>

<script>
export default {
    props: ["sewa"],
};

</script>

