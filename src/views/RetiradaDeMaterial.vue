<template>
    <div id="div-principal">
        <Menu />
        <div id="div-form" v-show="!estado">   
            <FormPrincipal msg="Retirada de Material" :rota="habilitar_componente" @enviaDados="recebeDados"/> 
        </div>
        <div v-show="estado">
            <ExibirLista :itens="itens" @estado="estado = false" texto_botao="Nova Requisição"/>
        </div>
        <div v-show="msg" id="id-msg"><h3>{{ msg }}</h3></div>
    </div>
</template>

<script>
    import FormPrincipal from '@/components/FormPrincipal.vue';
    import Menu from '@/components/Menu.vue';
    import ExibirLista from '@/components/ExibirLista.vue';
    import router from '@/router';
    export default {
        name: 'RetiradaDeMaterial',
        components: {
            FormPrincipal,
            Menu,
            ExibirLista
        },
        data(){
            return {
                rotaAtual: router.currentRoute,
                habilitar_componente:'',
                itens:[],
                estado: false,
                msg:''
            }
        },
        methods:{
            recebeDados(arg){
                this.itens = arg[0]
                this.estado = arg[2]
                this.msg = arg[1]
                setTimeout(()=>this.msg = '', 5000)
                
            }
        },
        mounted(){
            this.habilitar_componente = this.rotaAtual.name
        }   
    }
</script>

<style scoped>
#div-principal{
    margin-bottom: 30px;
}

#div-form{
    display: inline-block;
    text-align: right;
}
#id-msg{
    margin: 20px;
}
#id-msg h3{
    border-radius: 5px;
    display: inline;
    background-color: aqua;
    color: red;
    padding: 10px 30px;
    
}


</style>