<template>
    <div id="div-principal"> 
        <div id="div-form">
            <h1>{{ msg }}</h1>
            <form>
                <table>
                    <tr>
                        <th class="th-col1">Código:</th>
                        <td class="td-col2"><input v-model="codigo" type="text" placeholder="Informe o código do material"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || rota == 'consulta' || (rota == 'editar' && edite)">
                        <th class="th-col1">Tipo:</th>
                        <td class="td-col2"><input v-model="tipo" type="text" placeholder="Informe o tipo do material"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || rota == 'consulta' || (rota == 'editar' && edite)">
                        <th class="th-col1">Localização:</th>
                        <td class="td-col2"><input v-model="localizacao" type="text" placeholder="Informe a localização do objeto"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || (rota == 'editar' && edite)">
                        <th class="th-col1">Nº de Série:</th>
                        <td class="td-col2"><input v-model="n_serie" type="text" placeholder="Informe o número de série do objeto"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || rota == 'consulta' || (rota == 'editar' && edite)">
                        <th class="th-col1">Modelo:</th>
                        <td class="td-col2"><input v-model="modelo" type="text" placeholder="Informe o modelo do objeto"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || rota == 'consulta' || (rota == 'editar' && edite)">
                        <th class="th-col1">Fabricante:</th>
                        <td class="td-col2"><input v-model="fabricante" type="text" placeholder="Informe o Fabricante do objeto"></td>
                    </tr>
                    <tr v-show="rota == 'cadastro' || (rota == 'editar' && edite)">
                        <th id="th-description" class="th-col1">Descrição:</th>
                        <td class="td-col2"><textarea v-model="descricao" name="" id="" cols="" rows="" placeholder="Faça uma breve descrição do objeto"></textarea></td>
                    </tr>
                    <tr v-show="rota == 'retirada'">
                        <th class="th-col1">Destino:</th>
                        <td class="td-col2"><input v-model="destino" type="text" placeholder="Informe o Destinno do produto"></td>
                    </tr>
                </table>
                <input id="id-input-enviar" type="button" value="Enviar" v-on:click="enviarConsulta">
            </form>
           
        </div>
    </div>
</template>

<script>
    import router from '@/router'
    import moment, { relativeTimeThreshold } from 'moment'
import { renderSlot } from 'vue'

    export default {
        name: 'FormPrincipal',
        props:['msg','rota', 'edite'],
        data(){
            return {
                itens:[],
                id:'',
                codigo:'',
                tipo:'',
                localizacao:'',
                n_serie:'',
                modelo:'',
                fabricante:'',
                descricao:'',
                destino:'',
                st:{"st":"Disponível","nome":"","destino":"","data":""},
                estado:false
            }
        },

        methods:{
            async enviarConsulta(){
                const req = await fetch('https://apicontroledematerial.onrender.com/api/itens')
                const res = await req.json()
                if(this.rota == 'consulta')
                    this.exibirLista(res.result)
                if(this.rota == 'cadastro')
                    this.cadastrar(res.result)
                if(this.rota == 'retirada')
                    this.retirar(res.result)
                if(this.rota == 'devolucao')
                    this.devolver(res.result)
                if(this.rota == 'editar')
                    this.editar(res.result)
                if(this.rota == 'excluir')
                    this.excluir(res.result)
            },

            limpaDados(){
                this.itens = []
                this.codigo = ''
                this.tipo = ''
                this.localizacao = ''
                this.n_serie = ''
                this.modelo = ''
                this.fabricante = ''
                this.descricao = ''
                this.destino = ''
            },

            async cadastrar(resp){
                let msg = ''
                let estado = true
                let itemNaoCadastrado = true

                const dados = {
                    "codigo":this.codigo,
                    "tipo":this.tipo,
                    "localizacao":this.localizacao,
                    "n_serie":this.n_serie,
                    "modelo":this.modelo,
                    "fabricante":this.fabricante,
                    "descricao":this.descricao,
                    "status":{"st":"Disponível", "nome":"", "destino":"", "data":""}
                }

                for(let i in resp){
                    if(resp[i].codigo == this.codigo){
                        itemNaoCadastrado = false
                        estado = false
                        msg = "Já existe um ítem com esse código. Favor atribuir um código diferente."
                        this.$emit('enviaDados', [this.itens,msg,estado])
                        break
                    }
                }
                
                if(itemNaoCadastrado){
                    const dadosJson = JSON.stringify(dados)
                    const req = await fetch('https://apicontroledematerial.onrender.com/api/item',{
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: dadosJson
                    })
                    const res = await req.json()
                    if(res.error){
                        msg = ('Ítem não cadastrado!' + res.error)
                    }else{
                        //res.result.st = JSON.parse(res.result.st)
                        this.itens.push(res.result[0])
                        msg = 'Ítem cadastrado com sucesso!'
                    }
                    this.$emit('enviaDados', [this.itens,msg,estado])
                    this.limpaDados()
                    
                }  
            },

            async exibirLista(res){
                let produtoExiste = false
                
                if(this.codigo != '' && this.codigo != null){
                    for(let i = 0; i < res.length; i++){
                        if(res[i].codigo.toUpperCase() == this.codigo.toUpperCase()){
                            //res[i].st = JSON.parse(res[i].st)
                            this.itens.push(res[i])
                            produtoExiste = true
                            break
                        }
                    }
                }
                else if(this.tipo != '' && this.tipo != null)
                    res.forEach(item => {
                        if(item.tipo.toUpperCase() == this.tipo.toUpperCase()){
                            //item.st = JSON.parse(item.st)
                            this.itens.push(item)
                            produtoExiste = true
                        }
                    });
                else if(this.localizacao != '' && this.localizacao != null)
                    res.forEach(item => {
                        if(item.localizacao.toUpperCase() == this.localizacao.toUpperCase()){
                            //item.st = JSON.parse(item.st)
                            this.itens.push(item)
                            produtoExiste = true
                        }
                    });
                else if(this.modelo != '' && this.modelo != null)
                    res.forEach(item => {
                        if(item.modelo.toUpperCase() == this.modelo.toUpperCase()){
                            //item.st = JSON.parse(item.st)
                            this.itens.push(item)
                            produtoExiste = true
                        }
                    });
                else if(this.fabricante != '' && this.fabricante != null)
                    res.forEach(item => {
                        if(item.fabricante.toUpperCase() == this.fabricante.toUpperCase()){
                            //item.st = JSON.parse(item.st)
                            this.itens.push(item)
                            produtoExiste = true
                        }
                    });
                if(produtoExiste == false){
                    /*for(let i in res){ 
                        res[i].st = JSON.parse(res[i].st)
                    }*/
                    this.itens=res
                }
                this.$emit('enviaDados', this.itens)
                this.limpaDados()
            },

            async retirar(resp){
                let id = ''
                let exibirItem = false
                let msg = ''
                const dados = {
                    "st":"Indisponível",
                    "nome":sessionStorage.apelido,
                    "matricula":sessionStorage.matricula,
                    "destino":this.destino,
                    "data":moment().format("DD/MM/YYYY")
                }

                for(let i = 0; i < resp.length; i++){
                    if(resp[i].codigo == this.codigo){
                        id = resp[i].id
                        break
                    }       
                }
                if(id != ''){
                    const dadosJson = JSON.stringify({status:dados})
                    console.log(dados.nome)
                    console.log(dados.matricula)
                    console.log(dados[2])
                    console.log(dados[3])
                    console.log(dadosJson)
                    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${id}`,{
                        method: "PATCH",
                        headers:{"Content-Type":"application/json"},
                        body: dadosJson
                    })
                    const res = await req.json()
                    //res.result.st = JSON.parse(res.result.st)
                    this.itens.push(res.result[0])
                    msg = 'Reserva efetuada com sucesso'
                    exibirItem = true
                    this.$emit('enviaDados', [this.itens, msg, exibirItem])
                    this.limpaDados()
                }else{
                    msg = "Item não encontrado!"
                    exibirItem = false
                    this.$emit('enviaDados', [this.itens, msg, exibirItem])
                }    
            },

            async devolver(resp){
                let id = ''
                let exibirItem = false
                let msg = ''
                const dados = {
                    "st":"Disponível",
                    "nome":"",
                    "matricula":"",
                    "destino":"",
                    "data":""
                }
    
                for(let i = 0; i < resp.length; i++){
                    if(resp[i].codigo == this.codigo){
                        id = resp[i].id
                        break
                    }       
                }
                if(id != ''){
                    const dadosJson = JSON.stringify({status:dados})
                    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${id}`,{
                        method: "PATCH",
                        headers:{"Content-Type":"application/json"},
                        body: dadosJson
                    })
                    const res = await req.json()
                    //res.result.st = JSON.parse(res.result.st) //usar com mysql
                    this.itens.push(res.result[0])
                    msg = 'Devolução efetuada com sucesso'
                    exibirItem = true
                    this.$emit('enviaDados', [this.itens, msg, exibirItem])
                    this.limpaDados()
                }else{
                    msg = "Item não encontrado!"
                    exibirItem = false
                    this.$emit('enviaDados', [this.itens, msg, exibirItem])
                }
            },

            async editar(resp){
                let msg = ''
                let exibirItem = false
                
                if(!this.estado){
                    for(let i = 0; i < resp.length; i++){
                        if(resp[i].codigo == this.codigo){
                            this.id = resp[i].id
                            this.codigo = resp[i].codigo
                            this.tipo = resp[i].tipo
                            this.localizacao = resp[i].localizacao
                            this.n_serie = resp[i].n_serie
                            this.modelo = resp[i].modelo
                            this.fabricante = resp[i].fabricante
                            this.descricao = resp[i].descricao
                            this.estado = true
                            exibirItem = false
                            break
                        }
                    }
                    this.$emit('enviaDados', [this.itens,msg,this.estado, exibirItem])
                    return
                }
                if(this.estado){

                    if(this.id != ''){
                        const dados = {
                            "codigo":this.codigo,
                            "tipo":this.tipo,
                            "localizacao":this.localizacao,
                            "n_serie":this.n_serie,
                            "modelo":this.modelo,
                            "fabricante":this.fabricante,
                            "descricao":this.descricao,
                            //"status":{"st":"Disponível", "nome":"", "destino":"", "data":""}
                        }

                        const dadosJson = JSON.stringify(dados)
                        const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${this.id}`,{
                            method: "PUT",
                            headers:{"Content-Type":"application/json"},
                            body: dadosJson
                        })

                        const res = await req.json()
                        //res.result.st = JSON.parse(res.result.st)
                        this.itens.push(res.result[0])
                        msg = 'Dados atualizados com sucesso!'
                        exibirItem = true
                    }
                    this.estado=false
                    this.$emit('enviaDados', [this.itens,msg,this.estado, exibirItem])
                    this.limpaDados()

                    
                }
            },

            async excluir(resp){
                for(let i = 0; i < resp.length; i++){
                    if(resp[i].codigo == this.codigo){
                        this.id = resp[i].id
                        break
                    }
                } 
                
                if(this.id!=''){
                    await fetch(`https://apicontroledematerial.onrender.com/api/item/${this.id}`,{
                        method: "DELETE",
                        headers:{"Content-Type":"application/json"}
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #div-principal{
        width: auto;
        border: solid 3px;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
    }
    #div-form{
        text-align: center;
        max-width: 400px;
    }
    #div-form h1{
        text-align: center;
        margin: 0 auto;
    }
    form{
        text-align: right;
        height: auto;
    }
    form table{
        width: 100%;

    }
    #id-input-enviar{
        height: 25px;
        padding: 5px 10px;
        border-radius: 3px;
        font-weight: bold;
    }
    .th-col1,
    .td-col2{
        height: 25px;
        padding: 0;
        

    }
    .th-col1{
        width: 20%;
        padding-right: 5px;
        text-align: left;
    }
    #th-description{
        vertical-align: text-top;
    }
    .td-col2{
        display: flex;
        width: 100%;
        padding-right: 5px;
    }
    .td-col2 input{
        border-radius: 3px;
        width:100%;
        height: 80%;
        text-align: center;
    }
    .td-col2 textarea{
        border-radius: 3px;
        width: 100%;
        height: auto;
        text-align: center;
        
    }
</style>