<template>
  <div class="sewa">
    <!--<img alt="Vue logo" src="../assets/logo.png"> -->
    <hr class="my-3">
      <router-link class="btn btn-primary" to="/createsewa">Add Data Sewa</router-link>

      <Cardsewa :sewa="sewa" />
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import Cardsewa from "@/components/Cardsewa.vue";
import { ref, onMounted } from 'vue';

export default {
  name: "Sewa",
  components: {
    Cardsewa,
  },
  setup(){
    let sewa = ref([])

    onMounted(() => {
      axios.get('http://127.0.0.1:8000/api/sewa')
      .then(response => {
          
        sewa.value = response.data.data
        console.log(sewa)
      })
      .catch(error => {
        console.log(error)
      })
    })

    function sewaDelete(id){
      axios.delete(`http://127.0.0.1:8000/api/sewa/${id}`)
      .then(()=>{
        let z = this.sewa.map(sewa => sewa.id).indexOf(id);
        this.sewa.splice(z, 1)
      }).catch(error => {
        console.log(error)
      })
    }

      return {
      sewa,
      sewaDelete
    }
  }
};
</script>
