<template>
  <div>
    <v-card-title class="text-h4">Login</v-card-title>
    <v-text-field v-model="email" class="mx-auto" label="Seu email" type="email" outlined></v-text-field>
    <v-text-field v-model="password" class="mx-auto" label="Sua Senha" type="password" outlined></v-text-field>
    <v-card-actions>
      <v-btn color="green" @click="handleLogin">Login</v-btn>
    </v-card-actions>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const router = useRouter();
const { login, email, password, error } = useAuth();

const handleLogin = async () => {
  const user = await login(email.value, password.value);
  if (user) {
    router.push('/');
    console.log('Login bem-sucedido', user);
  }
};
</script>
