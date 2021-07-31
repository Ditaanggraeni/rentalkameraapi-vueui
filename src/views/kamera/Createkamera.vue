<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Tambah Data Kamera</h5>
     <form class="row g-3" @submit.prevent="store">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Gambar</label>
    <input type="file" class="form-control" v-on:change="onChange" id="inputEmail4" 
    v-bind="kameras.image" />
      <div class="alert alert-danger" v-if="validation.image">
        {{ validation.image[0] }}
      </div>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Merk</label>
    <input type="text" class="form-control" id="inputPassword4"
    v-model="kameras.merk"/>
    <div class="alert alert-danger" v-if="validation.merk">
        {{ validation.merk[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Harga</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Harga"
    v-model="kameras.harga" />
    <div class="alert alert-danger" v-if="validation.harga">
        {{ validation.harga[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Kategori</label>
    <select class="form-select" aria-label="Default select example" v-model="kameras.kategori_id">
        <option v-for="kategoris in kategori" :key="kategoris.id" :value="kategoris.id">
          {{ kategoris.name }}
          </option>
    </select>
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

    const kameras = reactive({
      kategori_id: '',
      image: '',
      merk: '',
      harga: ''
    });

    let kategori = ref([]);

    const validation = ref([]);

    const router = useRouter();

    onMounted(() =>{

      axios.get('http://127.0.0.1:8000/api/kategori')
      .then((response) => {
        kategori.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
});
    
    function store(){
      let image = kameras.image;
      let merk = kameras.merk;
      let harga = kameras.harga;
      let kategori_id = kameras.kategori_id;

      axios.post('http://127.0.0.1:8000/api/kamera', {
          headers: {'Content-type': 'multipart/form-data'},
        image: image,
        merk: merk,
        harga: harga,
        kategori_id: kategori_id
      }).then(() => {
        router.push({
          name:'Home'
        })
      }).catch(error => {
        console.log("ERRRR:: ",error.response.data);
      })
    }
    return {
      kameras,
      validation,
      router, 
      store,
      kategori
    }
  },
}
</script>
