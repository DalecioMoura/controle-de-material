<<<<<<< HEAD
<template>
    <div id="icone-login-div-principal">
        <div id="div-icone-usuario">
            <div style="border: solid; display: inline-block; padding: 0px; st">
                <img src="../assets/login3.jpg" alt="" style="margin: 0px; padding: 0px;">
                <p v-if="usuario!=''" style="margin: 0px; padding: 0px;">{{ usuario }}</p>
                <p v-if="usuario!=''" style="color: red; background-color: antiquewhite; font-weight: bolder; margin: 0px; padding: 0px;"><a href="" @click="logout">Sair</a></p>
                <p v-else style="margin: 0px; color: green; font-weight: bolder; background-color: blanchedalmond;"><a href="" @click="login">Login</a></p>

            </div>
        </div>
    </div>
</template>

<script>
  import router from '@/router'
    export default {
      components:{
      },
    props:['usuario'],
    data(){
      return{
        flagLogin:    Number,
      }
    },
    
    methods:{
      login(){
        router.push('/')        
      },
      logout(){
        this.$emit('logout', '')      
      }   
    }
  }
</script>

<style scoped>
 
=======
<template>
    <div id="icone-login-div-principal">
        <div id="div-icone-usuario">
            <div style="border: solid; display: inline-block; padding: 0px; st">
                <img src="../assets/login3.jpg" alt="" style="margin: 0px; padding: 0px;">
                <p v-if="usuario!=''" style="margin: 0px; padding: 0px;">{{ usuario }}</p>
                <p v-if="usuario!=''" style="color: red; background-color: antiquewhite; font-weight: bolder; margin: 0px; padding: 0px;"><a href="" @click="logout">Sair</a></p>
                <p v-else style="margin: 0px; color: green; font-weight: bolder; background-color: blanchedalmond;"><a href="" @click="login">Login</a></p>

            </div>
        </div>
    </div>
</template>

<script>
  import router from '@/router'
    export default {
      components:{
      },
    props:['usuario'],
    data(){
      return{
        flagLogin:    Number,
      }
    },
    
    methods:{
      login(){
        router.push('/')        
      },
      logout(){
        this.$emit('logout', '')      
      }   
    }
  }
</script>

<style scoped>
 
>>>>>>> bd75c4d906c682e764b220df534e361fa35bf0e1
</style>