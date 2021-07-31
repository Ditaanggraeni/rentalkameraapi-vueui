<template>
    <div class="card text-center mt-4" v-for="s in sewas" :key="s.id">
  <div class="card-header">
    Detail Sewa
  </div>
  <div class="card-body">
    <h5 class="card-title">{{s.image}}</h5>
    <p class="card-text">{{s.kamera.merk}}</p>
    <p class="card-text">{{s.kamera.harga}}</p>
    <p class="card-text">{{s.penyewa}}</p>
    <p class="card-text">{{s.jaminan}}</p>
    <p class="card-text">{{s.tgl_sewa}}</p>
    <p class="card-text">{{s.tgl_kembali}}</p>
    <p class="card-text">{{s.denda}}</p>
    <p class="card-text">{{s.total}}</p>
  </div>
  <div class="card-footer">
    <router-link class="btn btn-success" :to="{name:'Editsewa', params:{id:s.id}}">Edit</router-link>
        <button @click.prevent="sewaDelete(s.id)" class="btn btn-danger">Delete</button>
  </div>
</div>

</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
      let sewas = ref([]);

    const router = useRouter();

    const route = useRoute()

    onMounted(()=>{
      axios.get(`http://127.0.0.1:8000/api/sewa/${route.params.id}`)
      .then(response => {
        console.log(response.data.data.merk);

        sewas.value = response.data.data;
        
      }).catch(error =>{
        console.log(error.response.data);
      });
    });

    function sewaDelete(id){
      axios.delete(`http://127.0.0.1:8000/api/sewa/${id}`)
      .then(()=>{
        router.go(-1);
      }).catch(error => {
        console.log(error)
      })
    }

    
    return {
      sewas,
      router, 
      sewaDelete,
      route
    }
  },
}
</script>

