<template>
    <v-container>
      <v-list class="bg-grey-darken-3">
        <v-list-item-group>
          <v-list-item
            v-for="user in users"
            :key="user.id"
            @click="handleUserClick(user)"
            class="user-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-divider v-if="user !== users[users.length - 1]" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  updateComponent: Function,
  userId: String
});

const UserSelected = ref(null)
const users = ref([]);


const fetchUsers = async () => {
  const { $supabase } = useNuxtApp();

  const { data, error } = await $supabase.from('users').select('*');

  if (error) {
    console.error('Erro ao buscar usuários:', error);
  } else {
    users.value = data;
  }
};

const handleUserClick = (user) => {
  console.log('Usuário clicado:', user);

   


  if (typeof props.updateComponent === 'function') {
    props.updateComponent('MensagemContatos', user.id);
  } else {
    console.error('updateComponent não é uma função', props);
  }
};

onMounted(fetchUsers);
</script>

  
  <style>
  .user-item {
    cursor: pointer;
    transition: background-color 0.3s;
  }

  
  .v-list-item-title {
    font-weight: bold;
  }
  
  .v-list-item-subtitle {
    color: #666;
  }
  </style>
  