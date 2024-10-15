<template>
  <v-container>
    <v-card>
      <v-card-title>{{ contact.name }}</v-card-title>
      <v-card-subtitle>{{ contact.email }}</v-card-subtitle>
      <v-card-text>
        <p>Detalhes adicionais sobre o contato...</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['userId'])
const route = useRoute()
const contact = ref({})

const fetchContact = async () => {
  const userId = props.userId; 
  console.log('userId:', userId)

  if (!userId) {
    console.error('userId não está definido');
    return;
  }

  const { $supabase } = useNuxtApp()
  const { data, error } = await $supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single(); 

  if (error) {
    console.error('Erro ao buscar detalhes do contato:', error);
  } else {
    contact.value = data;
  }
};

onMounted(fetchContact)
</script>
