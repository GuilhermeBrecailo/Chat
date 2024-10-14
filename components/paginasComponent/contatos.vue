<template>
    <div>

        <h1>Contatos</h1>
        <h1>Bem vindo, {{ userData?.name }}</h1>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/Registro/auth/useAuth';
const { userData } = useAuth();
</script>