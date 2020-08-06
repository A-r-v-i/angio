import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // req.headers.set('New-Header', 'Middleware-Header')
    const _req = req.clone({ headers: req.headers.append('Valid-Header', 'Valid-one') })
    return next.handle(_req)
  }
}