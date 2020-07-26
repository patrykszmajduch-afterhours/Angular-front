import { User } from './auth.service';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const storageUser = localStorage.getItem('currentUser');
    const loggedUser = JSON.parse(storageUser) ? JSON.parse(storageUser).token : null;
    if (loggedUser) {
      request = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Bearer '+loggedUser
          )
      });
    }
    return next.handle(request);
  }
}