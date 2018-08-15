import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  static readonly LOADING_MAIN: string = "main";
  static readonly LOADING_API_REQUEST: string = "api-request";

  private activeLoadings: string[];
  public activeLoadings$: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor() { }

  showLoading(loadingName: string = LoadingService.LOADING_MAIN) {
    this.addLoading(loadingName);
  }

  hideLoading(loadingName?: string) {
    this.removeLoading(loadingName);
  }

  getLoadingStatus(...loadingNames:any[]) {
    if(!this.activeLoadings) return false;
    if(!loadingNames || !loadingNames[0]) return true;
    if(Array.isArray(loadingNames[0])) loadingNames = loadingNames[0];
    let hasStatus: boolean = false;
    loadingNames.forEach( name => {
      let index = this.activeLoadings.indexOf(name);
      hasStatus = index >= 0;
      if(hasStatus) return true;
    })
    return hasStatus;
  }

  private addLoading(loadingName: string) {
    if(!this.activeLoadings) this.activeLoadings = [];
    let index = this.activeLoadings.indexOf(loadingName);
    if(index < 0) {
      this.activeLoadings.push(loadingName);
      this.activeLoadings$.next(this.activeLoadings);
    }
  }

  private removeLoading(loadingName: string) {
    if(!this.activeLoadings) return;
    let index = this.activeLoadings.indexOf(loadingName);
    if(index >= 0) {
      this.activeLoadings.splice(index, 1);
      this.activeLoadings$.next(this.activeLoadings);
    }
  }
}
