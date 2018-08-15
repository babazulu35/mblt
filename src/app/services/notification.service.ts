
import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';
import { publish,refCount,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  notificationSubject:BehaviorSubject<string> = new BehaviorSubject(null);

  readonly notification$ = this.notificationSubject.pipe(publish(),refCount());

  constructor() { 
    this.notification$
  }

  notify(message:any,timeOut:number) {
  
    this.notificationSubject.next(message);
    setTimeout(() => {
      this.notificationSubject.next(null)
    }, timeOut || 3000);
    

  }
}
