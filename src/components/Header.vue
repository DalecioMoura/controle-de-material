<template>
    <div id="header">
        <h1>CONTROLE DE MATERIAL</h1>
    </div>
</template>

<script>
import IconeLogin from './IconeLogin.vue';

    export default {
    name: "Header",
    data() {
        return {};
    },
    components: { IconeLogin }
}
</script>

<style scoped>
    #header{
        display: flex;
        
    }
</style>