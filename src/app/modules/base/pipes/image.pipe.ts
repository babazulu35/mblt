import { AppControllerService } from './../../../services/app-controller.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
	constructor(
    private appControllerService: AppControllerService) {
  }
  
  transform(value: any, args?: any): any {
    if(value != 'null' && value != null && value != undefined && value.length > 0){
			if(value.slice(0,4) === 'http'){
				return value
			}else{
				let seperator = value.indexOf(',') > -1 ? ',' : ';';
        let images = value.split(seperator);
        let image = (images.length > 0) ? images[0] : value;
        let size = args || '760/430';
        return this.appControllerService.configService.getSettings("assetsBackstageCDNSource") + size + "/static/" + image;
			}
		}
  }

}
