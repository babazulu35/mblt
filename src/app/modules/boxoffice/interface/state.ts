import { StateEvent } from './state-event';
export interface State {

  PreviousState: number,
  PreviousState_Desc:string,
  CurrentState: number,
  CurrentState_Desc:string,
  ExpiresIn: number,
  TotalExpirySec: number,
  State?:{
    CurrentEvent?:string,
    CurrentEventId?:number,
    CurrentPerformanceId?:number,
    CurrentPerformance?:string,
    CurrentProductId?:number,
    ProductSelectionType?:number,
    ProductSelectionType_Desc?:string,
    RemainingProductSelections?:number,
    Event?:StateEvent
  }
}

