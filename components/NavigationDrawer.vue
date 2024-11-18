<template>
    <v-navigation-drawer expand-on-hover rail color="grey-darken-4">
        
        <v-list>
          <v-list-item
             v-if="userData"
           :subtitle="userData.email || 'Carregando...'"
           :title="userData.name || 'Carregando...'"
          ></v-list-item>
        </v-list>
      <v-divider></v-divider>
  
      <v-list density="compact" nav>
        <div>
        <v-list-item @click="changeComponent('DashBoard')" prepend-icon="mdi-view-dashboard" title="DashBoard"></v-list-item>
        <v-list-item @click="changeComponent('contatos')" prepend-icon="mdi-account-multiple" title="Contatos"></v-list-item>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-list-item @click="changeComponent('configuracao')" prepend-icon="mdi-cog" title="Perfil"></v-list-item>
        <v-list-item @click="handleLogout"  prepend-icon="mdi-logout" title="Sair"></v-list-item>
      </div>
        </v-list>
    </v-navigation-drawer>
  </template>
  
<script setup>

import { defineEmits } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

const { userData,logout } = useAuth();

console.log('userData:', userData.value);
const emit = defineEmits()

const changeComponent = (component) => {
  emit('updateComponent', component)
}

const handleLogout = async() => {
  await logout()
  alert('Usuario saiu com sucesso')
  router.push('/login')
}


</script>