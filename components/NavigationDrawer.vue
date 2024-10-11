<template>
    <v-navigation-drawer expand-on-hover rail color="grey-darken-4">
        
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="teste@gmail.com"
            title="teste"
          ></v-list-item>
        </v-list>
      <v-divider></v-divider>
  
      <v-list density="compact" nav>
        <div>
        <v-list-item @click="changeComponent('mensagens')" prepend-icon="mdi-message-text" title="Mensagens"></v-list-item>
        <v-list-item @click="changeComponent('contatos')" prepend-icon="mdi-account-multiple" title="Contatos"></v-list-item>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-list-item @click="changeComponent('configuracao')" prepend-icon="mdi-cog" title="Configurações"></v-list-item>
        <v-list-item @click="handleLogout"  prepend-icon="mdi-logout" title="Sair"></v-list-item>
      </div>
        </v-list>
    </v-navigation-drawer>
  </template>
  
<script setup>

import { defineEmits } from 'vue';
import { useAuth } from '~/composables/Registro/auth/useAuth';

const { logout } = useAuth();
const emit = defineEmits()

const changeComponent = (component) => {
  emit('updateComponent', component)
}

const handleLogout = async() => {
  await logout()
  alert('Usuario saiu com sucesso')
}


</script>