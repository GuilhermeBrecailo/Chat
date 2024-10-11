<template>
    <div>
      <v-app>
        <NavigationDrawer @updateComponent="updateComponent" />
        <v-main class="bg-black d-flex align-center justify-center" style="height: 100vh;">
          <v-container class="bg-grey-darken-1 rounded" style="height: auto; max-width: 600px;">
            <component :is="currentComponent" />
          </v-container>
        </v-main>
      </v-app>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Mensagens from '~/components/paginasComponent/mensagens.vue'; 
  import Contatos from '~/components/paginasComponent/contatos.vue';   
  import Configuracoes from '~/components/paginasComponent/configuracao.vue'; 
  
  const currentComponent = ref(Mensagens);
  
  const updateComponent = (componentName) => {
    if (componentName === 'mensagens') {
      currentComponent.value = Mensagens; 
    } else if (componentName === 'contatos') {
      currentComponent.value = Contatos; 
    } else if (componentName === 'configuracao') {
      currentComponent.value = Configuracoes; 
    }
  };
  </script>
  