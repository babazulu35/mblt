import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
