
import { useNuxtApp } from '#app';

export const useAuth = () => {
    const { $supabase } = useNuxtApp();
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const error = ref('');
    const userData = ref(null)

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
        userData.value = user;
        console.log(user);
        return user; 
    };

    const register = async () => {
        if (!email.value || !password.value || !name.value) {
            error.value = 'Por favor, preencha todos os campos.';
            return null;
        }

        const { user, error: registerError } = await $supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });

        if (registerError) {
            error.value = registerError.message;
            console.error('Erro ao registrar:', registerError);
            return null;
        }

        alert("Usuário registrado com sucesso!");

        const { data, insertError } = await $supabase
            .from('users')
            .insert([{ name: name.value, email: email.value, password: password.value}]);

        if (insertError) {
            error.value = insertError.message;
            console.error('Erro ao inserir dados do usuário:', insertError);
            return null;
        } else {
            console.log("Dados do usuário inseridos:", data);
            const { $router } = useNuxtApp();
            $router.push('/');
        }
        userData.value = user;
        return user;
    };
    const logout = async () => {
        const { $supabase } = useNuxtApp();
        const { $router } = useNuxtApp();
        $supabase.auth.signOut(); 
        $router.push('/login');
        userData.value = null;
    }

    return {
        email,
        name,
        password,
        error,
        userData,
        login,
        register,
        logout,
    };
};
