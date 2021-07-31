<template>
  <div class="index">
    <!--<img alt="Vue logo" src="../assets/logo.png"> -->
    <Slider />
    <hr class="my-3">
      <router-link class="btn btn-primary" to="/createpelanggan">Add Pelanggann</router-link>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nama</th>
      <th scope="col">Nomor Telepon</th>
      <th scope="col">Alamat</th>
      <th scope="col">Aksi</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(data, index) in customer" :key="index">
      <td>{{ data.nama }}</td>
      <td>{{ data.no_tlp }}</td>
      <td>{{ data.alamat }}</td>
      <td>
        <router-link class="btn btn-success" :to="{name:'Editpelanggan', params:{id:data.id}}">Edit</router-link>
        <button @click.prevent="pelangganDelete(data.id)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
// import Slider from "@/components/Slider.vue";
import { ref, onMounted } from 'vue';

export default {
  
  setup(){
    let customer = ref([])

    onMounted(() => {
      axios.get('http://127.0.0.1:8000/api/customer')
      .then(response => {
        customer.value = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
    })

    function pelangganDelete(id){
      axios.delete(`http://127.0.0.1:8000/api/customer/${id}`)
      .then(()=>{
        let z = this.customer.map(customer => customer.id).indexOf(id);
        this.customer.splice(z, 1)
      }).catch(error => {
        console.log(error)
      })
    }

      return {
      customer,
      pelangganDelete
    }
  }
};
</script>
