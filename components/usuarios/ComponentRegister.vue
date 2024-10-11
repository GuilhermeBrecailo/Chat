<template>
    <div>
        <v-card-title class="text-h4">Registre-se</v-card-title>
        <v-text-field v-model="name" class="mx-auto" label="Seu nome" type="text" outlined></v-text-field>
        <v-text-field v-model="email" class="mx-auto" label="Seu email" type="email" outlined></v-text-field>
        <v-text-field v-model="password" class="mx-auto" label="Sua Senha" type="password" outlined></v-text-field>
        <v-text-field v-model="confirmPassword" class="mx-auto" label="Confirme sua senha" type="password" outlined></v-text-field>
        <v-card-actions>
            <v-btn color="green" @click="handleRegister">Registre-se</v-btn>
        </v-card-actions>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/Registro/auth/useAuth';

const { email, password, name, error, register } = useAuth();
const confirmPassword = ref('');

const handleRegister = async () => {
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'Por favor, preencha todos os campos.';
        return;
    }
    if (password.value !== confirmPassword.value) {
        error.value = 'As senhas não correspondem.';
        return;
    }

    const user = await register();
    if (user) {
        alert('Registro bem-sucedido!'); 
    }
};
</script>
