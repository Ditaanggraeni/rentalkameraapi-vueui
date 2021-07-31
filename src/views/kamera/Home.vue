<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png"> -->
    <Slider />
    <hr class="my-3">
      <router-link class="btn btn-primary" to="/createkamera">Add Kamera</router-link>

      <Cardkamera :kamera="kamera" />

    <!-- <table class="table">
  <thead>
    <tr>
      <th scope="col">Nama</th>
      <th scope="col">No. Tlp</th>
      <th scope="col">Alamat</th>
      <th scope="col">Aksi</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(friend, index) in friends" :key="index">
      <td>{{ friend.nama }}</td>
      <td>{{ friend.no_tlp }}</td>
      <td>{{ friend.alamat }}</td>
      <td>
        <router-link class="btn btn-success" :to="{name:'Editfriends', params:{id:friend.id}}">Edit</router-link>
        <button @click.prevent="friendDelete(friend.id)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  </tbody>
</table> -->
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
import Cardkamera from "@/components/Cardkamera.vue";
import { ref, onMounted } from 'vue';

export default {
  name: "Home",
  components: {
    Slider,
    Cardkamera,
  },
  setup(){
    let kamera = ref([])

    onMounted(() => {
      axios.get('http://127.0.0.1:8000/api/kamera')
      .then(response => {
        kamera.value = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
    })

    function kameraDelete(id){
      axios.delete(`http://127.0.0.1:8000/api/kamera/${id}`)
      .then(()=>{
        let z = this.kamera.map(kamera => kamera.id).indexOf(id);
        this.kamera.splice(z, 1)
      }).catch(error => {
        console.log(error)
      })
    }

      return {
      kamera,
      kameraDelete
    }
  }
};
</script>
