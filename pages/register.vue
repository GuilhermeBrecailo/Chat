<template>
    <v-container>
      <v-row justify="center" align="center" style="height: 100vh;">
        <v-col cols="12" sm="6">
          <v-card class="rounded-container" outlined>
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text>
              <v-text-field class="mx-auto" label="Seu email" type="email" outlined></v-text-field>
              <v-text-field class="mx-auto" label="Sua Senha" type="password" outlined></v-text-field>
              <v-text-field class="mx-auto" label="Confirme sua senha" type="password" outlined></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-btn color="green" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const login = () => {
    console.log("Login realizado!");
  };
  </script>
  
  <style scoped>
  .rounded-container {
    border-radius: 16px;
    background-color: #f0f0f0;
    padding: 16px;
  }
  </style>
  