<template>
  <v-container>
    <v-card class="bg-grey-darken-3" style=" max-width: 100%;">
      <v-card-title>
        <h2>{{ contact.name }}</h2>
        <v-chip>{{ contact.email }}</v-chip>
      </v-card-title>
      <v-card-subtitle>
        <p>Envie suas mensagens abaixo:</p>
      </v-card-subtitle>

      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(msg, index) in messages"
              :key="index"
              
            >
              <v-list-item-content>
                <v-list-item-title>{{ msg.sender }}: {{ msg.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-text-field
          v-model="input"
          label="Digite sua mensagem"
          @keyup.enter="sendMessage"
        />
        <v-btn @click="sendMessage">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useAuth } from '~/composables/Registro/auth/useAuth';

const props = defineProps(['userId']);
const contact = ref({});
const messages = ref([]);
const input = ref('');
const { userData } = useAuth();
const { $supabase, $socket } = useNuxtApp();

const fetchContact = async () => {
  const userId = props.userId;
  if (!userId) {
    console.error('userId não está definido');
    return;
  }

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

const sendMessage = () => {
  if (input.value.trim() === '') return;

  const messageData = {
    sender: userData.value.user_metadata.name,
    text: input.value,
  };

  $socket.emit('chat message', messageData);


  messages.value.push(messageData);
  input.value = '';
};

onMounted(() => {
  fetchContact();

  $socket.on('chat message', (msg) => {
    
    if (msg.sender !== userData.value.user_metadata.name) {
      messages.value.push(msg);
    }
  });
});
</script>


