<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Edit Data Kamera</h5>
     <form class="row g-3" @submit.prevent="update">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Gambar</label>
    <input type="file" class="form-control" id="inputEmail4" 
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
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Alamat"
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

    const kameras = reactive({
      image: '',
      merk: '',
      harga: '',
      kategori_id: ''
    })

    let kategori = ref([]);
    const validation = ref([]);

    const router = useRouter();

    const route = useRoute()

    onMounted(()=>{
      axios.get(`http://127.0.0.1:8000/api/kamera/${route.params.id}/edit`)
      .then(response => {
        console.log(response.data.data.image)

        kameras.image = response.data.data.image
        kameras.merk = response.data.data.merk
        kameras.harga = response.data.data.harga
        kameras.kategori_id = response.data.data.kategori_id
      }).catch(error =>{
        console.log(error.response.data)
      })

      axios.get('http://127.0.0.1:8000/api/kategori')
      .then((response) => {
        kategori.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
    })

    function update(){
      let image = kameras.image
      let merk = kameras.merk
      let harga = kameras.harga
      let kategori_id = kameras.kategori_id

      axios.put(`http://127.0.0.1:8000/api/kamera/${route.params.id}`, {
        image: image,
        merk: merk,
        harga: harga,
        kategori_id: kategori_id
      })
      .then(() => {
        router.push({
          name:'Home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
    return {
      kameras,
      validation,
      router, 
      update,
      route,
      kategori
    }
  },
}
</script>
