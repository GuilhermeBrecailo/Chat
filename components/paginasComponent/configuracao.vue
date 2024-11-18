<template>
  <v-container>
    <h1>Editar Perfil</h1>
    <v-card>
      <v-card-title>Alterar informações</v-card-title>
      <v-text-field
        v-model="user.name"
        class="mx-auto"
        type="text"
        label="Nome"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        class="mx-auto"
        type="email"
        label="E-mail"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="password"
        class="mx-auto"
        type="password"
        label="Nova senha"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        class="mx-auto"
        type="password"
        label="Confirmar senha"
        outlined
      ></v-text-field>
      <v-btn class="bg-blue" @click="handleUpdate">Atualizar</v-btn>
      <p v-if="error" class="error-message">{{ error }}</p>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router';


const { userData, update, error } = useAuth()

const user = ref({
  name: '',
  email: '',
})
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const fetchUser = () => {
  if (userData.value) {
    user.value.name = userData.value.name || ''
    user.value.email = userData.value.email || ''
  }
}

const handleUpdate = async () => {
  if (!user.value.name || !user.value.email) {
    error.value = 'Por favor, preencha os campos obrigatórios.'
    return
  }

  if (password.value && password.value !== confirmPassword.value) {
    error.value = 'As senhas não correspondem.'
    return
  }

  const result = await update(user.value.name, user.value.email, password.value)
  if (result.error) {
    error.value = result.error.message
  } else {
    alert('Informações atualizadas com sucesso!')

    router.push('/')
    window.location.reload()
    
  }
}

onMounted(fetchUser)
</script>
