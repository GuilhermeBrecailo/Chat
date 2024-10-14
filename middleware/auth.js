export default function ({ $supabase, redirect}){
    const user = $supabase.auth.user()

    if(!user){
        return redirect('/login');
    }
}