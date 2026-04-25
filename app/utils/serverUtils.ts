import { HttpServiceConfig } from '@/app/types'

export class ServerUtils {
  static withToken(token: string, config?: HttpServiceConfig, HttpServiceClass?: any): any {
    const service = new HttpServiceClass(config)
    service.setServerToken(token)
    return service
  }

  static fromHeaders(headers: Headers, config?: HttpServiceConfig, HttpServiceClass?: any): any {
    const service = new HttpServiceClass(config)
    const authHeader = headers.get('authorization')
    
    if (authHeader?.startsWith('Bearer ')) {
      service.setServerToken(authHeader.substring(7))
    }
    
    return service
  }

  static fromCookies(cookies: any, tokenKey = 'auth_token', config?: HttpServiceConfig, HttpServiceClass?: any): any {
    const service = new HttpServiceClass(config)
    const token = cookies.get(tokenKey)?.value
    
    if (token) {
      service.setServerToken(token)
    }
    
    return service
  }
}