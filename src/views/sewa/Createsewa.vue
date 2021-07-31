<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Tambah Data Sewa</h5>
     <form class="row g-3" @submit.prevent="store">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Gambar</label>
    <input type="file" class="form-control" v-on:change="onChange" id="inputEmail4" 
    v-bind="sewas.image" />
      <div class="alert alert-danger" v-if="validation.image">
        {{ validation.image[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Merk</label>
    <select class="form-select" aria-label="Default select example" v-model="sewas.merk">
        <option v-for="kameras in kamera" :key="kameras.id" :value="kameras.id">
          {{ kameras.merk }}
          </option>
    </select>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Harga</label>
    <select class="form-select" aria-label="Default select example" v-model="sewas.harga">
        <option v-for="kameras in kamera" :key="kameras.id" :value="kameras.id">
          {{ kameras.harga }}
          </option>
    </select>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Penyewa</label>
    <select class="form-select" aria-label="Default select example" v-model="sewas.penyewa">
        <option v-for="customers in customer" :key="customers.id" :value="customers.id">
          {{ customers.nama }}
          </option>
    </select>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Jaminan</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="sewas.jaminan"/>
    <div class="alert alert-danger" v-if="validation.jaminan">
        {{ validation.jaminan[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Tanggal Sewa</label>
    <input type="date" class="form-control" id="inputPassword4"
    v-model="sewas.tgl_sewa"/>
    <div class="alert alert-danger" v-if="validation.tgl_sewa">
        {{ validation.tgl_sewa[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Tanggal Kembali</label>
    <input type="date" class="form-control" id="inputPassword4"
    v-model="sewas.tgl_kembali"/>
    <div class="alert alert-danger" v-if="validation.tgl_kembali">
        {{ validation.tgl_kembali[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Denda</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="sewas.denda"/>
    <div class="alert alert-danger" v-if="validation.denda">
        {{ validation.denda[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Total</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="sewas.total"/>
    <div class="alert alert-danger" v-if="validation.total">
        {{ validation.total[0] }}
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
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
//import { response } from 'express';
export default {
  setup() {

    const sewas = reactive({
      image: '',
      merk: '',
      harga: '',
      penyewa: '',
      jaminan: '',
      tgl_sewa: '',
      tgl_kembali: '',
      denda: '',
      total: ''
    });

    let kamera = ref([]);

    let customer = ref([]);

    const validation = ref([]);

    const router = useRouter();

    onMounted(() =>{

      axios.get('http://127.0.0.1:8000/api/kamera')
      .then((response) => {
        kamera.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
});
    onMounted(() =>{

      axios.get('http://127.0.0.1:8000/api/customer')
      .then((response) => {
        customer.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
});
    
    function store(){
      let image = sewas.image;
      let merk = sewas.merk;
      let harga = sewas.harga;
      let penyewa = sewas.penyewa;
      let jaminan = sewas.jaminan;
      let tgl_sewa = sewas.tgl_sewa;
      let tgl_kembali = sewas.tgl_kembali;
      let denda = sewas.denda;
      let total = sewas.total;

      axios.post('http://127.0.0.1:8000/api/sewa', {
          headers: {'Content-type': 'multipart/form-data'},
        image: image,
        merk: merk,
        harga: harga,
        penyewa: penyewa,
        jaminan: jaminan,
        tgl_sewa: tgl_sewa,
        tgl_kembali: tgl_kembali,
        denda: denda,
        total: total
      }).then(() => {
        router.push({
          name:'Sewa'
        })
      }).catch(error => {
        console.log("ERRRR:: ",error.response.data);
      })
    }
    return {
      sewas,
      validation,
      router, 
      store,
      kamera,
      customer
    }
  },
}
</script>
