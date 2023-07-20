const getToken = () => localStorage.getItem('auth')

const handleLogin = (token: string) => {
  localStorage.setItem('auth', token)
}

export { getToken, handleLogin }
