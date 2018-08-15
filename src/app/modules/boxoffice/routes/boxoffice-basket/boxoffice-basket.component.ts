import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { BoxofficeService } from '../../services/boxoffice.service';

@Component({
  selector: 'app-boxoffice-basket',
  templateUrl: './boxoffice-basket.component.html',
  styleUrls: ['./boxoffice-basket.component.scss'],
})
export class BoxofficeBasketComponent implements OnInit {

  constructor(
    private boxofficeService:BoxofficeService,
    private activeRoute:ActivatedRoute
  ) {


   }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.startState(params.id)
    })
  }

  startState(eventId:number):void {
    this.boxofficeService.selectEvent(eventId);
  }

}
