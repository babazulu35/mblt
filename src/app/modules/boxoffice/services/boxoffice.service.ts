

import { State } from './../interface/state';
import { BaseApiService } from './../../../classes/base-api-service';
import { Injectable } from '@angular/core';
import { AppControllerService } from '../../../services/app-controller.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { SetProductCount } from './../interface/set-product-count';


export interface EventInfo {
  Name:string,
  Venue:string,
  DateTime:string;
  EventInfo:string;
}

export interface Navigator {
  Action:string,
  Route:string,
  Current:number;
}



@Injectable({
  providedIn: 'root'
})
export class BoxofficeService extends BaseApiService {
  
  navigator:Navigator;

  currentStateSubject:BehaviorSubject<State> = new BehaviorSubject(null);
  titleSubject$:BehaviorSubject<string> = new BehaviorSubject('');
  subtotalSubject$:BehaviorSubject<any> = new BehaviorSubject(null);
  eventInfoSubject$:BehaviorSubject<EventInfo> = new BehaviorSubject(null);
  selectedSeatSubject$:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient
  ) {
    super(appControllerService,authenticationService,http,BaseApiService.API_BOXOFFICE);
    authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      if(user) {
        this.setEndpoint(`${user.FirmCode}/${user.ChannelCode.toUpperCase()}/ShoppingCart/`);
        this.setHeader('PublishingPoint', 'MobiletWeb');
      }
    });
  }
   
   /* Returns the state data with called Id */
   selectEvent(eventId:number) {
    this.post('SelectEvent?includeStateModel=true',{EventId:eventId}).then(state => {
      if(state) {
        this.currentStateSubject.next(state);
      }
    })
  }
  
  /* Add product count value to service and returns satate data with added count value */
  setProductToCount(itemCountValue:SetProductCount[]):Promise<State> {
    return this.post('SetProductAndCount?includeStateModel=true',{Selections:itemCountValue});
  }
  
  /* Trigger the basket state and returns previous,current state data  */
  goToBasket() {
    this.post('GotoBasket?includeStateModel=true',{}).then(state => {
      if(state)
      {
        this.currentStateSubject.next(state);
      }
      
    })
  }
  
  // Select Seat
  selectSeat(selectSeatData:Object) {
    this.post('SelectSeats?includeStateModel=true',selectSeatData).then(state => {
      if(state) {
        this.currentStateSubject.next(state);
      }
    })
  }
  
  // Mevcut Stati verecektir.
  getCurrentState():Promise<State> {
    return this.get('GetCurrentState?includeStateModel=true')
  }
  
  // Previous State e geri dönüş sağlar
  goBackState() {
    this.post('GoBack?includeStateModel=true',{}).then(state => {
      if(state) {
        this.currentStateSubject.next(state);
      }
    })
  }

  /* Kills all Shopping Cart Session and State data */
  destroyStateSession():Promise<boolean> {
    return new Promise((resolve,reject) => {
      this.post('CreateShoppingSession',{}).then(result => {
         if(result === null) {
           resolve(true);
         }
      }).catch(error => {
        reject(false);
      });
    })   
  }

  eventInfo(eventInfo:EventInfo) { 
    this.eventInfoSubject$.next(eventInfo);
  }



  titleService(eventName:string) {
    return this.titleSubject$.next(eventName);
  }

  /* it show the sub total value */
  subTotalService(subtotal:any):void {
    this.subtotalSubject$.next(subtotal);
  }

  boxofficeError(error) {
    this.handleError(error).subscribe(result => {
      console.log(result);
    });
  }

  /* Sets the current state */
  setCurrentState() {
  
  }
 
  /* Some buttons returns state data and you must to re navigate your page . */
  stateNavigator(currentState):Promise<Navigator> {
    return new Promise((resolve,reject) => {
      switch(currentState) {
        case 1:
         this.navigator = {
           Action:'redirect',
           Route: 'basket',
           Current: currentState
         }
         resolve(this.navigator);
        break;
        case 2:
         this.navigator = {
           Action:'redirect',
           Route: 'select-seats',
           Current: currentState
         }
        resolve(this.navigator);
        break;
        case 4:
          this.navigator = {
           Action: 'redirect',
           Route: 'purchase',
           Current:currentState
         }
         resolve(this.navigator);
        break;
        case 8:
         this.navigator = {
           Action:'collect-data',
           Route: null,
           Current: currentState
         }
         resolve(this.navigator);
        break;
      }
    })
    

  }
}
 