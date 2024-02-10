<template>
    <div id="div-principal">
        <Menu />
        <div id="div-form">
            <FormPrincipal msg="Excluir Material" :rota="habilitar_componente" @enviaDados="recebeDados" />
        </div>
    </div>
</template>
<script>
import Menu from '@/components/Menu.vue';
import FormPrincipal from '@/components/FormPrincipal.vue';
import router from '@/router';
    export default {
        name: 'ExcluirMaterial',

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
            Menu,
            FormPrincipal
        },

        methods: {
            recebeDados(arg){
                this.itens = arg[0]
                this.msg = arg[1]
                this.estado = arg[2]
                setTimeout(()=>this.msg = '', 3000)
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
    display: inline-block;
}
</style>