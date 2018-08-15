import { Performances } from "./performances";

export interface StateEvent {
  Campaigns:any[];
  CountOfProductsSelected:number;
  DateTime:string;
  EventInfo:string;
  ExpirationTime:number;
  ExpirationType:number;
  Id:number;
  ImageUrl:string;
  IsDonatable:boolean;
  MaxAllowedCountOfProducts:number;
  Name:string;
  NoExpire:boolean;
  ParentId:number;
  PaymentSubTotal:any;
  Performances?:Performances[];
  SalesBeginDate:any;
  SalesEndDate:any;
  Status:number;
  Venue:string;
}
