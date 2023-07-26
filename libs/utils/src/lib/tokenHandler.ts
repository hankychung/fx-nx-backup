class TokenHandler {
  static get() {
    return localStorage.getItem('auth') || ''
  }

  static update(token: string) {
    localStorage.setItem('auth', token)
  }
}

export { TokenHandler }
