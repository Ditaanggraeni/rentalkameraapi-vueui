<template>
    <div class="card text-center mt-4" v-for="k in kameras" :key="k.id">
  <div class="card-header">
    Detail Kamera
  </div>
  <div class="card-body">
    <h5 class="card-title">{{k.image}}</h5>
    <p class="card-text">{{k.merk}}</p>
    <p class="card-text">{{k.harga}}</p>
    <p class="card-text">{{k.kategori.name}}</p>
  </div>
  <div class="card-footer">
    <router-link class="btn btn-success" :to="{name:'Editkamera', params:{id:k.id}}">Edit</router-link>
        <button @click.prevent="kameraDelete(k.id)" class="btn btn-danger">Delete</button>
  </div>
</div>

</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
      let kameras = ref([]);

    const router = useRouter();

    const route = useRoute()

    onMounted(()=>{
      axios.get(`http://127.0.0.1:8000/api/kamera/${route.params.id}`)
      .then(response => {
        console.log(response.data.data.merk);

        kameras.value = response.data.data;
        
      }).catch(error =>{
        console.log(error.response.data);
      });
    });

    function kameraDelete(id){
      axios.delete(`http://127.0.0.1:8000/api/kamera/${id}`)
      .then(()=>{
        router.go(-1);
      }).catch(error => {
        console.log(error)
      })
    }

    
    return {
      kameras,
      router, 
      kameraDelete,
      route
    }
  },
}
</script>

