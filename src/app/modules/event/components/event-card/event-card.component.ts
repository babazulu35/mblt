import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { ListEvent } from '../../../../interface/list-event';
import { ListEventImageType } from '../../../../enum/list-event-image-type.enum';
import { ListEventImage } from '../../../../interface/list-event-image';
import { AppControllerService } from '../../../../services/app-controller.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @HostBinding('class.c-event-card') readonly cClass: boolean = true;
  @Input() listEvent: ListEvent;
  @Output() eventCardSelected: EventEmitter<ListEvent> = new EventEmitter();
  listEventImage: ListEventImage;

  constructor(
      private appControllerService: AppControllerService,
  ) { }

  ngOnInit() {
    this.listEventImage = this.getListEventImage(this.listEvent);
  }

  private getListEventImage(listEvent: ListEvent): ListEventImage {
    let listEventImage: ListEventImage;
    try {
      listEventImage = listEvent.CmsEventCard.Images.find(i => i.ImageType === ListEventImageType.Cover);
      listEventImage.Url = this.appControllerService.configService.getSettings('listEventAssetsCDNSource') + listEventImage.Url;
    } catch (error) {
      console.log(error);
    }
    return listEventImage;
  }

  onEventCardSelected(e) {
      this.eventCardSelected.emit(this.listEvent);
  }
}
