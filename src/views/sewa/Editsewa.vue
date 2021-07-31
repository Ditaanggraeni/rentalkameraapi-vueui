<template>
<div class="card shadow mt-3">
  <div class="card-body">
    <h5 class="card-title">Edit Data Sewa</h5>
     <form class="row g-3" @submit.prevent="update">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Gambar</label>
    <input type="file" class="form-control" id="inputEmail4" 
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
  <div class="col-6">
    <label for="inputAddress" class="form-label">Jaminan</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Jaminan"
    v-model="sewas.jaminan" />
    <div class="alert alert-danger" v-if="validation.jaminan">
        {{ validation.jaminan[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Tanggal sewa</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Tanggal Sewa"
    v-model="sewas.tgl_sewa" />
    <div class="alert alert-danger" v-if="validation.tgl_sewa">
        {{ validation.tgl_sewa[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Tanggal Kembali</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Tanggal Kembali"
    v-model="sewas.tgl_kembali" />
    <div class="alert alert-danger" v-if="validation.tgl_kembali">
        {{ validation.tgl_kembali[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Denda</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Jumlah Denda"
    v-model="sewas.denda" />
    <div class="alert alert-danger" v-if="validation.denda">
        {{ validation.denda[0] }}
      </div>
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Total</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Masukkan Total Yang Harus Dibayar"
    v-model="sewas.total" />
    <div class="alert alert-danger" v-if="validation.total">
        {{ validation.total[0] }}
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
    })

    let kamera = ref([]);
    let customer = ref([]);
    const validation = ref([]);

    const router = useRouter();

    const route = useRoute()

    onMounted(()=>{
      axios.get(`http://127.0.0.1:8000/api/sewa/${route.params.id}/edit`)
      .then(response => {
        console.log(response.data.data.image)

        sewas.image = response.data.data.image
        sewas.merk = response.data.data.merk
        sewas.harga = response.data.data.harga
        sewas.penyewa = response.data.data.penyewa
        sewas.jaminan = response.data.data.jaminan
        sewas.tgl_sewa = response.data.data.tgl_sewa
        sewas.tgl_kembali = response.data.data.tgl_kembali
        sewas.denda = response.data.data.denda
        sewas.total = response.data.data.total
      }).catch(error =>{
        console.log(error.response.data)
      })

      axios.get('http://127.0.0.1:8000/api/kamera')
      .then((response) => {
        kamera.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
    })

      axios.get('http://127.0.0.1:8000/api/customer')
      .then((response) => {
        customer.value = response.data.data;
        console.log(response);
      })
      .catch((error) => {
        validation.value = error.response.data;
        console.log(error);
      });
    

    function update(){
      let image = sewas.image
      let merk = sewas.merk
      let harga = sewas.harga
      let penyewa = sewas.penyewa
      let jaminan = sewas.jaminan
      let tgl_sewa = sewas.tgl_sewa
      let tgl_kembali = sewas.tgl_kembali
      let denda = sewas.denda
      let total = sewas.total

      axios.put(`http://127.0.0.1:8000/api/sewa/${route.params.id}`, {
        image: image,
        merk: merk,
        harga: harga,
        penyewa: penyewa,
        jaminan: jaminan,
        tgl_sewa: tgl_sewa,
        tgl_kembali: tgl_kembali,
        denda: denda,
        total: total
      })
      .then(() => {
        router.push({
          name:'Sewa'
        })
      }).catch(error => {
        console.log(error)
      })
    }
    return {
      sewas,
      validation,
      router, 
      update,
      route,
      kamera,
      customer
    }
  },
}
</script>
