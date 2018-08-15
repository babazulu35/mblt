import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

export interface EcrCommands {
  POSTransactionBaslat?: (amount) => string;
  POSTransactionSonOnay?: (flag) => string;
  POSTransactionIptal?: () => string;
  barkodOkumaBaslat?: () => number; // 0 | 1
  barkodOkumaDurdur?: () => string;
  biletYazdirilabilirMi?: () => number; // 0 | 1
  biletYazdir?: (data: any) => any;
  terminalID?: () => number;
  channelCode?: () => string;
}

export interface PrintOptions {
  onReady?: () => void;
}
export interface QrOptions {
  onReady?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class EcrDeviceService {
  static readonly EVENT_BARCODE_READ_COMPLETE:string = "BarkodOkundu";
  static readonly EVENT_POS_TRANSACTION_COMPLETE:string = "POSTransactionSonuc";
  static readonly EVENT_POS_INFO_VIEW:string = "POSBilgiGoster";

  ecrCommands: EcrCommands;

  constructor(
    
  ) { 
    this.ecrCommands = environment.production ? window['jsDen'] : this.createMockJsDen();
  }

  addEventHandler(event: string, handler: Function) {
    window[event] = handler;
  }

  print(data:any, options?: PrintOptions): Promise<any> {
    return new Promise((resolve,reject) => {
      let isPrintAvailable: boolean = this.ecrCommands.biletYazdirilabilirMi() == 1;
      let printedData: any;

      setTimeout(() => {
        if(isPrintAvailable) {
          if(options && options.onReady) options.onReady();
          printedData = this.ecrCommands.biletYazdir(data);

          setTimeout(() => {
            let printTimeoutInterval = setTimeout(() => {
              if(printedData == null) reject({errorCode: 'PRINT_TIMEOUT'});
            }, 2*1000);
    
            if(printedData != null) {
              // printTimeoutInterval.unref();
              clearTimeout(printTimeoutInterval);
              resolve(printedData);
            }else {
              reject({errorCode: 'PRINT_ERROR'});
            }
          }, 1000);

        }else{
          reject({errorCode: 'PRINTER_NOT_AVAILABLE'});
        }    
      }, 1000);

    });
  }

  readQR(options?: QrOptions): Promise<any> {
    return new Promise((resolve,reject) => {
      let isQrReaderReady: boolean = this.ecrCommands.barkodOkumaBaslat() == 1;

      setTimeout(() => {
        if(isQrReaderReady) {
          if(options && options.onReady) options.onReady();

          this.addEventHandler(EcrDeviceService.EVENT_BARCODE_READ_COMPLETE, function(event: any){
            if(event != "" || event != null) {
              resolve(event);
            }else{
              reject({errorCode: 'QR_NOT_READ'});
            }
          });
        }else{
          reject({errorCode: 'QR_NOT_AVAILABLE'});
        }
      }, 300);

    });
  }

  private createMockJsDen():EcrCommands {
    return <EcrCommands>{
      POSTransactionBaslat: (amount) => {
        return "Total " + amount;
         //POSTransactionSonuc('0', 'Test', 'Test', '1', '123456', '123456******1234', Amount)
      },
  
      POSTransactionSonOnay: (flag) => {
         return "Flag" + flag;
      },
  
      POSTransactionIptal: () => {
        return "Transaction Iptal" + 1
      },
  
      barkodOkumaBaslat: () => {
        return 1
      },
  
      barkodOkumaDurdur: () => {
        return "Barkod Okum Durdur" + 1
      },
  
      biletYazdirilabilirMi: () => {
        return 1 // simulasyon yazdÄ±rÄ±labilir olarak ayarlandÄ±
      },
  
      biletYazdir: (biletDetay) => {
          return biletDetay
      },
  
      terminalID: () => {
        return 1
      },
  
      channelCode: () => {
        return "Web"
      } 
    }
  }
}
