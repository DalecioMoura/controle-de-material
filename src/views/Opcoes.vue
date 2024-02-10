<template>
  <div class="class-div-principal">   
    <div class="class-div-option">
      <h2>Escolha a opção desejada.</h2>
      <input type="button" value="Consulta de Material" v-on:click="Consultar">
      <input type="button" value="Cadastro de Material" v-on:click="Cadastrar">
      <input type="button" value="Retirada de Material" v-on:click="Retirar">
      <input type="button" value="Devolução de Material" v-on:click="Devolver">
    </div>
  </div>
</template>

<script>
import router from '@/router'
import IconeLogin from '@/components/IconeLogin.vue'
  export default {
    props:{

    },
    components: {
      IconeLogin
    },
    data(){
      return{
        txtname:      "",
        txtmatricula: "",
        txtsetor:     ""
       
      }
    },
    methods:{
      Consultar: function(){
        router.push('/consulta')
      },
      Cadastrar: function(){
        router.push('/cadastro')
      },
      Retirar: function(){
        router.push('/retirada')
      },
      Devolver: function(){
        router.push('/devolucao')
      }    
    }
  }

</script>

<style scoped>
.class-div-principal{
  text-align: center;
}
</style>
