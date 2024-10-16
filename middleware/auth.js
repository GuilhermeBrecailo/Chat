export default function ({ $supabase, redirect, route }) {
    console.log('Middleware de autenticação sendo chamado');
    const user = $supabase.auth.user();
  
    if (!user && route.path !== '/login') {
   
    }
}