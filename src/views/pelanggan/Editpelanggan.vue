<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Edit Data Pelanggan</h5>
     <form class="row g-3" @submit.prevent="update">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Nama</label>
    <input type="text" class="form-control" id="inputEmail4" 
    v-model="customers.nama" />
      <div class="alert alert-danger" v-if="validation.nama">
        {{ validation.nama[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Nomor Telepon</label>
    <input type="text" class="form-control" id="inputEmail4" 
    v-model="customers.no_tlp" />
      <div class="alert alert-danger" v-if="validation.no_tlp">
        {{ validation.no_tlp[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Alamat</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="customers.alamat"/>
    <div class="alert alert-danger" v-if="validation.alamat">
        {{ validation.alamat[0] }}
      </div>
  </div>
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Edit</button>
  </div>
</form>
  </div>
</div>
 
</template>
<script>
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
  setup() {

    const customers = reactive({
      nama: '',
      no_tlp: '',
      alamat: '' 
    })

    const validation = ref([]);

    const router = useRouter();

    const route = useRoute()

    onMounted(()=>{
      axios.get(`http://127.0.0.1:8000/api/customer/${route.params.id}`)
      .then(response => {
        console.log(response.data.data.nama)

        customers.nama = response.data.data.nama
        customers.no_tlp = response.data.data.no_tlp
        customers.alamat = response.data.data.alamat
      }).catch(error =>{
        console.log(error.response.data)
      })
    })

    function update(){
      let nama = customers.nama
       let no_tlp = customers.no_tlp
       let alamat = customers.alamat

      axios.put(`http://127.0.0.1:8000/api/customer/${route.params.id}`, {
        nama: nama,
        no_tlp: no_tlp,
        alamat: alamat
      })
      .then(() => {
        router.push({
          name:'Index'
        })
      }).catch(error => {
        console.log(error)
      })
    }
    return {
      customers,
      validation,
      router, 
      update,
      route
    }
  },
}
</script>
