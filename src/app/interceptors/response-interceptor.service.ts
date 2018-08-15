
import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler, HttpInterceptor,HttpEvent, HttpResponse   } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    const self = this;
    return next.handle(req).pipe(tap(event => {
        if(event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
    }))
  }
}
