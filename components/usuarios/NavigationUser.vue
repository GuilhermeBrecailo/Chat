<template >
    <v-container >
      <v-row justify="center" align="center" style="height: 100vh;">
        <v-col cols="12" sm="6">
          <v-card class="rounded-container bg-grey-darken-4" outlined>
            <div class="d-flex">
              <v-btn text @click="showLogin" class="ma-2 bg-black">Login</v-btn>
              <v-btn text @click="showRegister" class="ma-2 bg-black" >Registre-se</v-btn>
            </div>
            <v-card-text>
              <component :is="currentComponent" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ComponentLogin from '@/components/usuarios/ComponentLogin.vue';
  import ComponentRegister from '@/components/usuarios/ComponentRegister.vue';
  
  const currentComponent = ref(ComponentLogin);
  
  const showLogin = () => {
    currentComponent.value = ComponentLogin;
  };
  
  const showRegister = () => {
    currentComponent.value = ComponentRegister;
  };
  </script>
  
  <style scoped>
  .rounded-container {
    border-radius: 16px;
    background-color: #f0f0f0;
    padding: 16px;
  }
  </style>
  