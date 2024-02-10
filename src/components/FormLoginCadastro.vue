<template>
<div id="div-principal">
        <div id="div-form">
            <h3>{{ msg }}</h3>
            <form>
                <p v-show="!exibir_linha">Entre com seu nome ou a sua matrícula</p>
                <table>
                    <tr>
                        <th class="th-col1">Matricula:</th>
                        <td class="td-col2"><input v-model="matricula" type="text" placeholder="Informe o código do material"></td>
                    </tr>
                    <tr>
                        <th class="th-col1">Nome:</th>
                        <td class="td-col2"><input v-model="nome" type="text" placeholder="Informe o tipo do material"></td>
                    </tr>
                    <tr v-show="exibir_linha">
                        <th class="th-col1">Setor:</th>
                        <td class="td-col2"><input v-model="setor" type="text" placeholder="Informe a localização do objeto"></td>
                    </tr>
                </table>
                <input id="id-input-enviar" type="button" value="Enviar" v-on:click="enviarDados">
            </form>         
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormLoginCadastro",

        props:['msg', 'msg_2', 'exibir_linha', 'acao'],

        data(){
            return {
                matricula:'',
                nome: '',
                apelido: '',
                setor: ''
                
        
            }
        },
        methods:{
            async enviarDados(){
                const req = await fetch('https://apicontroledematerial.onrender.com/api/usuarios')
                const res = await req.json()
                console.log(res.result)
                if(this.acao == 'login'){
                    this.fazerLogin(res.result)
                }

                if(this.acao == 'cadastro'){
                    this.fazerCadastro(res.result)  
                }

                if(this.acao == 'editarCadastroDeUsuario'){
                    this.editarCadastroDeUsuario(res.result)
                }

                if(this.acao == 'deletarUsuario'){
                    this.deletarUsuario(res.result)
                }
                
                this.matricula = '';
                this.nome = '';
                this.apelido = '';
                this.setor = '';
            },

            fazerLogin(res){
                let msg = ''
                let resultado = false
                for(let i = 0 ; i < res.length; i++){
                    if(this.matricula != '' && this.matricula != null){
                        if(this.matricula == res[i].matricula){
                        this.apelido = res[i].apelido
                        resultado = true
                        break
                        }
                    }
                    else if(this.nome != '' && this.nome != null){
                        if(this.nome.toUpperCase() == res[i].nome.toUpperCase()){
                        this.apelido = res[i].apelido
                        resultado = true
                        break
                        }
                    }
                }
                sessionStorage.apelido = this.apelido
                sessionStorage.matricula = this.matricula
                this.$emit('enviaDados', [this.matricula, this.nome, this.apelido, this.setor, resultado, msg])
            },

            async fazerCadastro(res){
                let msg = ''
                let resultado = false
                let usuarioNaoCadastrado = true

                let dados = {
                    matricula:this.matricula,
                    nome: this.nome,
                    apelido: this.nome.substring(0, this.nome.indexOf(' ')),
                    setor:this.setor
                }
                
                for(let i in res){
                    if(res[i].matricula == this.matricula){
                        usuarioNaoCadastrado = false
                        msg = "Usuário já está cadastrado!"
                        break
                    }
                }

                if(usuarioNaoCadastrado){
                    let dadosJson = JSON.stringify(dados)

                    const req = await fetch('https://apicontroledematerial.onrender.com/api/usuario',{
                        method: "POST",
                        headers:{"content-Type":"application/json"},
                        body:dadosJson
                    });
                    const resp = await req.json()
                    console.log(resp)
                    msg = 'Usuário cadastrado com sucesso!'
                    resultado = true
                }
                this.$emit('enviaDados', [this.matricula, this.nome, this.apelido, this.setor, resultado, msg])
            },
            
            async editarCadastroDeUsuario(res){
                let id = ''
                let msg = ''
                let resultado = ''
                for(i in res){
                    if(res[i].matricula == this.matricula){
                        id = res[i].id
                        this.matricula = res[i].matricula
                        this.nome = res[i].nome
                        this.apelido = res[i].apelido
                        this.setor = res[i].setor
                        break
                    }
                }

                if(id == ''){
                    msg = 'Usuário não encontrado na base de dados!'
                }else{
                    const dados = {
                        matricula: this.matricula,
                        nome: this.nome,
                        apelido: this.apelido,
                        setor: this.setor
                    }
                    const dadosJson = JSON.stringify(dados);
                    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${id}`,{
                        method: "PATCH",
                        headers: {"content-Type":"application/json"},
                        body: dadosJson
                    });

                    this.$emit('enviaDados', [this.matricula, this.nome, this.apelido, this.setor, resultado, msg])
                }
            },

            async deletarUsuario(res){
                let id = ''
                let msg = ''
                let resultado = ''
                for(i in res){
                    if(res[i].matricula == this.matricula){
                        id = res[i].id
                        break
                    }
                }

                if(id == ''){
                    msg = 'Usuário não encontrado na base de dados!'
                }else{
                    const dados = {
                        matricula: this.matricula,
                        nome: this.nome,
                        apelido: this.apelido,
                        setor: this.setor
                    }
                    const dadosJson = JSON.stringify(dados);
                    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${id}`,{
                        method: "DELETE",
                        headers: {"content-Type":"application/json"}
                    });

                    this.$emit('enviaDados', [this.matricula, this.nome, this.apelido, this.setor, resultado, msg])
                }
            }
        }
    }
</script>

<style scoped>
    #div-principal{
        width: 300px;
        border: solid 3px;
        border-radius: 5px;
        padding: 10px;
    }
    #div-form{
        text-align: center;
    }
    #div-form h1{
        text-align: center;
        margin: 0 auto;
    }
    form{
        text-align: right;
    }
    #div-form h3{
        margin-bottom: 10px;
    }
    form p{
        margin: 5px;
        padding-top: 3px;
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