import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

export const useAuth = () => {
  const { $supabase, $socket } = useNuxtApp()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const name = ref('')
  const error = ref('')
  const userData = ref(null)
  const isAuthenticated = ref(false)

  onMounted(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData)
      isAuthenticated.value = true
    } else {
      const userId = JSON.parse(localStorage.getItem('userData'))?.id
      if (!userId) {
        console.error('Usuário não autenticado')
        router.push('/login')
      }
    }
  })

  const connectSocket = () => {
    return new Promise((resolve) => {
      if (!$socket.connected) {
        $socket.connect()
        $socket.on('connect', () => {
          console.log('Socket conectado:', $socket.id)
          resolve($socket.id)
        })
      } else {
        console.log('Socket já conectado:', $socket.id)
        resolve($socket.id)
      }
    })
  }

  const register = async (name, email, password) => {
    try {
      const socketId = await connectSocket()

      const { data: authData, error: authError } = await $supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      const userId = authData.user.id

      const { data, error: insertError } = await $supabase
        .from('users')
        .insert({
          id: userId,
          name,
          email,
          password,
          socket_id: socketId,
        })

      if (insertError) throw insertError

      userData.value = data
      localStorage.setItem('userData', JSON.stringify(data))

      isAuthenticated.value = true
      router.push('/')
      console.log(socketId)
      return { data }
    } catch (error) {
      console.error('Erro no registro:', error.message)
      return { error }
    }
  }

  const login = async (email, password) => {
    try {
      const socketId = await connectSocket()

      const { data: authData, error: authError } = await $supabase.auth.signInWithPassword({
        email,
        password,
        
      })

      if (authError) throw authError

      const userId = authData.user.id

      const { error: updateError } = await $supabase
        .from('users')
        .update({ socket_id: socketId })
        .eq('id', userId)

      if (updateError) throw updateError

      const { data: user, error: userError } = await $supabase
        .from('users')
        .select('id, name, email, socket_id')
        .eq('id', userId)
        .single()

      if (userError) throw userError

      userData.value = user
      localStorage.setItem('userData', JSON.stringify(user))
      console.log('userData após login:', userData.value)

      isAuthenticated.value = true
      router.push('/')
      return user
    } catch (error) {
      console.error('Erro no login:', error.message)
      error.value = 'Credenciais inválidas'
      return { error }
    }
  }


  const update = async (name, email, password) => {
    try {
      const userId = userData.value.id
  
      const updates = {
        name,
        email,
      }
  
      if (password) {
        updates.password = password 
      }
  
      const { data, error: updateError } = await $supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
  
      if (updateError) throw updateError
  
      userData.value = { ...userData.value, ...updates }
      localStorage.setItem('userData', JSON.stringify(userData.value))
  
      return { data }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message)
      return { error }
    }
  }
  

  const logout = async () => {
    try {
      if ($socket.connected) {
        $socket.disconnect()
        console.log('Desconectado do Socket.IO')
      }

      const { error: logoutError } = await $supabase.auth.signOut()
      if (logoutError) throw logoutError

      isAuthenticated.value = false
      userData.value = null
      localStorage.removeItem('userData')
      router.push('/login')
    } catch (error) {
      console.error('Erro no logout:', error.message)
    }
  }

  return {
    email,
    name,
    password,
    error,
    userData,
    isAuthenticated,
    login,
    register,
    logout,
    update,
  }
}
