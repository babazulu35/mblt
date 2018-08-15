import { BarcodeInfo } from './barcode-info';
import { TicketProductInfo } from './ticket-product-info';
import { TicketType } from './ticket-type.enum';

export interface Ticket {
    ProductInfo: TicketProductInfo[];
    TotalProductCount: number;
    PerformanceId: number;
    TransferredTo: any[];
    PerformanceName: string;
    PerformanceDate: string;
    PerformanceVenue: string;
    PerformanceImageUrl: string;
    IsDonatable: boolean;
    IsTicketDonated: boolean;
    PerformanceInfo: string;
    EventInfo: string;
    PerformanceVenueLogo: string;
    SponsorLogo: string;
    Count: number;
    BasketId: number;
    UID: string;
    VenueName: string;
    BarcodeInfo?: BarcodeInfo[],
    Type?: TicketType
}