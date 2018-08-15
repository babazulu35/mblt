import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class Confirmation {
  id?: any;
  title: string;
  description?: string;
  theme?:string;
  confirmButton?: { label: string, theme?: string };
  dismissButton?: { label: string; theme?: string };
  resolve?: (result?: any) => void;
  reject?: (reason?: any) => void;
}
@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  readonly confirmations:Confirmation[] = [];
  readonly confirmations$:BehaviorSubject<Confirmation[]> = new BehaviorSubject(null);

  constructor() { }

  confirm(confirmation: Confirmation):Promise<any> {
    this.confirmations.push(confirmation);
    this.confirmations$.next(this.confirmations);
    return new Promise((resolve, reject) => {
      confirmation.resolve = resolve;
      confirmation.reject = reject;
    });
  }
}
