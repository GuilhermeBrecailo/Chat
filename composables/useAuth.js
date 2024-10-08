// composables/useAuth.js
import { ref } from 'vue';
import { useNuxtApp } from '#app';

export const useAuth = () => {
    const { $supabase } = useNuxtApp();
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const error = ref('');

    const login = async () => {
        console.log('Tentando login com:', email.value, password.value);
        const { error: loginError } = await $supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (loginError) {
            alert('Login falhou: ' + loginError.message);
            return null;
        }

        const { data: { user }, error: userError } = await $supabase.auth.getUser();

        if (userError) {
            console.error('Error getting user:', userError);
            return null; 
        }

        console.log(user);
        return user; 
    };

    const register = async () => {
        const { user, error: registerError } = await $supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });

        if (registerError) {
            error.value = registerError.message;
            return null;
        }
        if (!user) {
            error.value = 'Usuário não foi criado, tente novamente.';
            return null;
        }
       
        const { error: insertError } = await $supabase
            .from('users') 
            .insert([{ id: user.id, name: name.value }]);

        if (insertError) {
            error.value = insertError.message;
            return null;
        }

        return user;
    };

    return {
        email,
        name,
        password,
        error,
        login,
        register,
    };
};
