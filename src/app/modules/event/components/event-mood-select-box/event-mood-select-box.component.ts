import { AppControllerService } from './../../../../services/app-controller.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EventCmsContentsService } from '../../services/event-cms-contents.service';
import { CmsAttribute } from '../../../../interface/cms-attribute';

@Component({
  selector: 'app-event-mood-select-box',
  templateUrl: './event-mood-select-box.component.html',
  styleUrls: ['./event-mood-select-box.component.scss']
})
export class EventMoodSelectBoxComponent implements OnInit {
  @HostBinding('class.c-event-mood-select-box') readonly cClass: boolean = true;

  assetsPath: string;

  constructor(
    private appControllerService: AppControllerService,
    private dialogRef: MatDialogRef<EventMoodSelectBoxComponent>,
    private eventCmsContentsService: EventCmsContentsService,
  ) { }

  containerTypes: CmsAttribute[];

  ngOnInit() {
    this.assetsPath = this.appControllerService.configService.getSettings('assetsCDNSource');
    this.eventCmsContentsService.getCmsAttributes().then(response => {
      if (response) {
        this.containerTypes = response;
        this.containerTypes.forEach(c => {
          c.AttributeImage = this.assetsPath.concat(c.AttributeImage);
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  closeWithAttributeId(containerType){
    this.dialogRef.close(containerType);
  }

}
