import { Products } from "./products";

export interface Performances {
  AccessIntegrationTypeId:any;
  Campaigns:any;
  CountOfProductsSelected:number;
  DateTime:string;
  EndDateTime:string;
  ExpirationTime:number;
  ExpirationType:number;
  ExpirationType_Desc:string;
  Id:number;
  Images:string;
  IsAccessIntegrationActive:boolean;
  IsSeatSelectionEnabled:boolean;
  IsSocialReservationAvailable:boolean;
  MaxAllowedCountOfProducts:number;
  Name:string;
  NoExpire:boolean;
  Products:Products[];
  SalesBeginDate:any;
  SalesEndDate:any;
  Srtatus:number;
  Status_Desc:string;
  SubTotal:any[];
  UId:string;
  Venue:string;
  VenueAddress:string;
}
