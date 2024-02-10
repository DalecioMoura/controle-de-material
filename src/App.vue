<template>
  <div>
    <div id="div-header">
      <h1>CONTROLE DE MATERIAL</h1>
      <div id="icone"><IconeLogin :usuario="dados_login" @logout="logout"/></div>     
    </div>   
    <div>
      <router-view/>
    </div>
    <div id="form-login-cadastro" v-show="habilitar_componente == 'home'">
      <div id="form-login" v-show="logado==false">
        <p>Usuário Cadastrado</p>
        <FormLoginCadastro msg="Login" :exibir_linha="false" @enviaDados="recebeDadosLogin" acao="login"/>
      </div>
      <div id="form-cadastro">
        Usuário não Cadastrado
        <FormLoginCadastro msg="Cadastro" :exibir_linha="true" @enviaDados="recebeDadosCadastro" acao="cadastro"/>
        <p v-show="msg"> {{ msg }}</p>
      </div>
    </div>
    <div id="div-footer">
      <Footer />
    </div>
  </div> 
</template>

<script>
  import Header from './components/Header.vue';
  import IconeLogin from './components/IconeLogin.vue';
  import Menu from './components/Menu.vue';
  import Footer from './components/footer.vue';
  import FormLoginCadastro from './components/FormLoginCadastro.vue';
  import router from './router';
  import main from './main';
  
  export default{
    name: "App",
    data (){
      return {
        rota_atual: router.currentRoute,
        habilitar_componente:null,
        dados_login:'',
        msg:'',
        logado:false,
        usuario:''
      }
    },
    
    watch:{
      rota_atual(newValue){
        this.habilitar_componente = newValue.name
      }
    },

    components: {
      Header,
      IconeLogin,
      Menu,
      Footer,
      FormLoginCadastro
    },

    methods:{
      recebeDadosLogin(dados){
        this.logado = dados[4]
        this.dados_login = dados[2]
      },

      recebeDadosCadastro(dados){       
          this.msg = dados[5]
          setTimeout(()=>this.msg='', 5000)       
      },

      logout(){
        this.dados_login = ''
        this.logado = false
      }
    }
  }

</script>

<style>
*{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
/*<!--div id="div-header" style="display: flex; background-color: aquamarine; box-sizing: border-box; border-bottom: 4px solid #555; height: 100px;
    justify-content: center; text-align: center; padding: 10px;"-->*/
#div-header{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: aquamarine;
  border-bottom: solid 4px #555;
  padding: 10px 0;
  top: 0;
}
#div-header h1{
  margin: auto;
  text-align: center;
}
#icone{
  margin-right: 2px;
}
#form-login-cadastro{
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
#form-login{
  margin: 10px;
}
#div-footer{
  position: fixed;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  bottom: 0;
  width: 100%;
}
</style>
