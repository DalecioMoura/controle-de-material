<template>
    <div id="div-principal">
        <div v-show="true"><button id="btn-nova-pesquisa" @click="resetaEstado">{{ texto_botao }}</button></div>
        <h2>Lista de Material</h2>
        <div class="cabecalho">
            <div id="id_col" class="col">#:</div>
            <div class="col">Código:</div>
            <div class="col">Tipo:</div>
            <div class="col">Localização:</div>
            <div class="col">Nº de Série:</div>
            <div class="col">Modelo:</div>
            <div class="col">Fabricante:</div>
            <div class="col">Descrição:</div>
            <div class="col">Status:</div>
        </div>
        <div v-for="(item) in itens" :key="item.id" class="linhas">
            <div id="id_linha" class="linha">{{item.id}}</div>
            <div class="linha">{{item.codigo}}</div>
            <div class="linha">{{item.tipo}}</div>
            <div class="linha">{{item.localizacao}}</div>
            <div class="linha">{{item.n_serie}}</div>
            <div class="linha">{{item.modelo}}</div>
            <div class="linha">{{item.fabricante}}</div>
            <div class="linha">{{item.descricao}}</div>
            <div v-if="item.st" class="linha">
                <div class="">{{item.st.st}}</div>
                <div class="">{{item.st.nome}}</div>
                <div class="">{{item.st.destino}}</div>
                <div class="">{{item.st.data}}</div>
            </div>
            <div v-else>sem informações</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ExibirLista',
        props:['itens','texto_botao'],
        data(){
            return {

            }
        },
        methods:{
            resetaEstado(){
                this.$emit('estado')   
            },
        }
    }
</script>

<style scoped>
    #div-principal{
        width: 100%;
        margin: 0 auto;
        margin-bottom: 70px;
    }
    #div-principal h2{
        margin-bottom: 10px;
        margin-top: 20px;
    }
    .cabecalho,
    .linhas{
        display: flex;
        flex-wrap: wrap;
        padding: 3px;
    }
    .cabecalho{
        border-bottom: solid 3px;
        margin-bottom: 2px;
        padding: 5px;
    }
    .linhas{
        border-bottom: solid 1px ;
    }
    
    .col,
    .linha{
        display: inline-block;
        width: 10%;
        margin: 2px auto;
        justify-content: left;
    }
    #id_linha,
    #id_col{
        width: 3%;
    }

    #btn-nova-pesquisa{
    margin-top: 20px;
    padding: 10px 15px;
}
    
</style>