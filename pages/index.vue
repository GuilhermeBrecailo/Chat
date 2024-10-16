<template >
  <div>
    <v-app>
      <NavigationDrawer @updateComponent="updateComponent" />
      <v-main class="bg-black d-flex align-center justify-center" style="height: 100vh;">
        <v-container class="bg-grey-darken-4 rounded" style="height: 95%; max-width: 95%;">
          <component :is="currentComponent" :updateComponent="updateComponent" :userId="userId" />
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
import MensagemContatos from '~/components/paginasComponent/MensagemContatos.vue';  

const currentComponent = ref(Mensagens);
const userId = ref(null);

const updateComponent = (componentName, id) => {
  userId.value = id; 
  if (componentName === 'mensagens') {
    currentComponent.value = Mensagens; 
  } else if (componentName === 'contatos') {
    currentComponent.value = Contatos; 
  } else if (componentName === 'configuracao') {
    currentComponent.value = Configuracoes; 
  } else if (componentName === 'MensagemContatos') {
    currentComponent.value = MensagemContatos; 
  }
};
</script>
