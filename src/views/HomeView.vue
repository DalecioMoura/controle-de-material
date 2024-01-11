<template>
  <div class="home">
    <!--IconeLogin/-->
    <PaginaInicial/>
  </div>
</template>

<script>
// @ is an alias to /src
//import IconeLogin from '@/components/IconeLogin.vue';
import PaginaInicial from '@/components/PaginaInicial.vue';

export default {
  name: 'HomeView',
  components: {
    PaginaInicial,
    //IconeLogin,
  }
}
</script>
