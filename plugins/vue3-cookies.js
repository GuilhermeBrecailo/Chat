import { defineNuxtPlugin } from '#app';
import  VueCookies  from 'vue3-cookies';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueCookies);
});
