export interface User {
    Id: number;
    FirmCode: string;
    FirmId: number;
    ChannelCode: string;
    ChannelId: number;
    SubChannelId: number;
    TerminalId: number;
    PasswordHash: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    Images: string;
    Roles: string[];
    ApiKey: string;
    isReady: boolean;
    PromoterFirmId?:number;    
}
