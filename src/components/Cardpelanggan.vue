<template>
<div class="row">
    <div class="col-lg-4 mt-3" v-for="(data, index) in customer" :key="index.id">     
<div class="card">
  <div class="card-header">{{ data.nama }}</div>
  <div class="card-body">
    <h5 class="card-title">{{ data.no_tlp }}</h5>
    <p class="card-title">{{ data.alamat }}</p>
  </div>
  <div class="card-footer text-center">
    <router-link class="btn btn-primary" :to="{name:'Detailpelanggan', params:{id:data.id}}">Detail</router-link>
  </div>
  </div>
</div>
</div>
</template>

<script>
export default {
    props: ["customer"],

};

</script>

