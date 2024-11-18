<template>
  <v-container>
    <v-card class="bg-grey-darken-3" style="max-width: 100%;">
      <v-card-title>
        <h2>{{ contact.name }}</h2>
        <v-chip>{{ contact.email }}</v-chip>
        <p>ID do Socket: {{ contact.socket_id }}</p>
      </v-card-title>
      <v-card-subtitle>
        <p>Envie suas mensagens abaixo:</p>
      </v-card-subtitle>

      <v-card-text class="chat-container">
        <v-list class="bg-black">
          <v-list-item-group >
            <v-list-item
              v-for="(msg, index) in messages"
              :key="index"
              class="bg-black"
            >
              <v-list-item-content>
                <p><strong>{{ msg.senderName }}</strong>: {{ msg.text }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      
      <v-card-actions>
        <v-text-field
          label="Digite sua mensagem"
          v-model="message"
          @keyup.enter="sendMessage"
        />
        <v-btn @click="sendMessage">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useNuxtApp } from '#app';



const props = defineProps(['userId']);
const contact = ref({});
const message = ref('');
const messages = ref([]);

const { $supabase } = useNuxtApp();
import { useAuth } from '~/composables/useAuth';

const {$socket} = useNuxtApp()
const { userData } = useAuth();

const fetchContact = async () => {
  if (!props.userId) { 
    console.error('userId não está definido');
    return;
  }

  const { data, error } = await $supabase
    .from('users')
    .select('*')
    .eq('id', props.userId) 
    .single();

  if (error) {
    console.error('Erro ao buscar detalhes do contato:', error);
  } else {
    contact.value = data;
    console.log(contact.value)
    console.log('Socket ID do contato:', contact.value.socket_id);


  }
};

const fetchMessages = async () => {
  console.log('Buscando mensagens...');
  
  const { data, error } = await $supabase
    .from('messages')
    .select('*')
    .or(`senderUid.eq.${userData.value.id},senderUid.eq.${contact.value.id}`)
    .or(`recipientUid.eq.${userData.value.id},recipientUid.eq.${contact.value.id}`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar mensagens:', error.message);
  } else {
    console.log('Mensagens encontradas:', data);
    messages.value = data;
  }
};




const sendMessage = async () => {
  if (message.value.trim() === '') return;

  const messageData = {
    senderName: userData.value.name,
    sender: userData.value.socket_id,
    text: message.value,
    recipientId: contact.value.socket_id,
    recipientUid: contact.value.id,
    senderUid: userData.value.id
  }

  const {error} = await $supabase
  .from('messages')
  .insert([messageData])

  if (error) {
    console.error('Erro ao salvar a mensagem', error)
    return
  }
  
  $socket.emit('private message', messageData);
  
  messages.value.push(messageData);
  message.value = '';



 console.log('Envio de mensagem')
 console.log(contact.value)
 console.log(props.userId)
 console.log('userData:', userData.value.socket_id);
};



onMounted( async() => {
  await fetchContact();
  await fetchMessages()

 


  $socket.on('private message', (message) => {
      console.log('Mensagem recebida:', message);  
      
    messages.value.push(message);
  });
  
});


onUnmounted(()=>{
 $socket.disconnect()
})


</script>

<style scoped>

.chat-container{
  max-height: 400px;
  overflow-y: auto;
  
}

</style>