export class TokenManager {
  private token: string | null = null
  private isClient: boolean

  constructor() {
    this.isClient = typeof window !== 'undefined'
    if (this.isClient) {
      this.loadToken()
    }
  }

  private loadToken(): void {
    if (this.isClient) {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string): void {
    this.token = token
    if (this.isClient) {
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken(): void {
    this.token = null
    if (this.isClient) {
      localStorage.removeItem('auth_token')
    }
  }

  getToken(): string | null {
    return this.token
  }
}