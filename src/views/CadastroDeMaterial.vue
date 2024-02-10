<template> 
    <div id="div-principal">
        <Menu />
        <div id="div-form" v-show="!estado">
            <FormPrincipal msg="Cadastro de Material" :rota="habilitar_componente" @enviaDados="recebeDados"/>
        </div>
        <p>{{ msg }}</p>
        <div v-show="estado">
            <ExibirLista :itens="itens" @estado="estado = false" texto_botao="Cadastrar outro ítem"/>
        </div>
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue';
    import FormPrincipal from '@/components/FormPrincipal.vue';
    import ExibirLista from '@/components/ExibirLista.vue';
    import router from '@/router';
    export default {
        name: 'CadastroDeMaterial',
        data(){
            return {
                rota_atual:router.currentRoute,
                habilitar_componente:'',
                itens:[],
                estado:false,
                msg:''
            }
        },
        components: {
            FormPrincipal,
            Menu,
            ExibirLista
        },
        methods:{
            recebeDados(arg){
                console.log(arg)
                this.itens = arg[0]
                this.msg = arg[1]
                this.estado = arg[2]
                setTimeout(()=> this.msg='', 3000)
            }
        },
        mounted(){
            this.habilitar_componente = this.rota_atual.name
        }
    }
</script>

<style scoped>
#div-principal{
    margin-bottom: 30px;
}
#div-form{
    display:inline-block;
    text-align: right;    
}
</style>