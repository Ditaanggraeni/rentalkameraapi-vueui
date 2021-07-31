<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Tambah Pelanggan</h5>
     <form class="row g-3" @submit.prevent="store">
     <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Nama</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="customers.nama"/>
    <div class="alert alert-danger" v-if="validation.nama">
        {{ validation.nama[0] }}
      </div>
      </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">No Telepon</label>
    <input type="text" class="form-control" id="inputEmail4" 
    v-model="customers.no_tlp" />
      <div class="alert alert-danger" v-if="validation.no_tlp">
        {{ validation.no_tlp[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Alamat</label>
    <input type="text" class="form-control" id="inputEmail4" 
    v-model="customers.alamat" />
      <div class="alert alert-danger" v-if="validation.alamat">
        {{ validation.alamat[0] }}
      </div>
  </div>
  
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Tambah</button>
  </div>
</form>
  </div>
</div>
 
</template>
<script>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
//import { response } from 'express';
export default {
  setup() {

    const customers = reactive({
      nama: '',
      no_tlp: '',
      alamat: ''
    });

    const validation = ref([]);

    const router = useRouter();
    

    function store(){
      let nama = customers.nama;
      let no_tlp = customers.no_tlp;
      let alamat = customers.alamat;

      axios.post('http://127.0.0.1:8000/api/customer', {
        nama: nama,
        no_tlp: no_tlp,
        alamat: alamat
      }).then(() => {
        router.push({
          name:'Index'
        })
      }).catch(error => {
        console.log("ERRRR:: ",error.response.data);
      })
    }
    return {
      customers,
      validation,
      router, 
      store
    }
  },
}
</script>
