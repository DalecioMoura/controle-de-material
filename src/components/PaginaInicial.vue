<template>
  <div class="class-div-principal">
    <div id="div-menu">
      <Menu />
    </div>
    <h3>Olá {{}}! Seja bem vindo ao sistema de controle de material do laboratório da DONFP.</h3>
    <p>Aqui você pode consultar, cadastrar, registrar a retirada e a devolução dos materiais e equipamentos do laboratório.</p>
    
  </div>
  
  
</template>

<script>
import Menu from './Menu.vue';
  export default {
    data(){
      return{               
      }
    },
    components:{
      Menu
    },
    methods:{            
    }
  }

</script>

<style scoped>
.class-div-principal{
  text-align: center;
}

</style>
