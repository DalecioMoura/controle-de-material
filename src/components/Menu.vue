<template>
    <div id="div-menu">   
      <nav>
        <button><router-link to="/">Home</router-link></button>
        <button><router-link to="/cadastro">Cadastrar Material</router-link></button>
        <button><router-link to="/consulta">Consulta de Material</router-link></button>
        <button><router-link to="/editar">Editar Material</router-link></button>
        <button><router-link to="/excluir">Excluir Material</router-link></button> 
        <button><router-link to="/retirada">Retirada de Material</router-link></button>
        <button><router-link to="/devolucao">Devolucao de Material</router-link></button>
      </nav>
    </div>
  </template>

  <style scoped>
  #div-menu{
    background-color: aqua;
    margin: 5px 0;
  }
  nav{
    padding: 10px;
  }
  button{
    margin: 2px;
    padding: 10px 20px;
    border-radius: 5px;
  }
</style>