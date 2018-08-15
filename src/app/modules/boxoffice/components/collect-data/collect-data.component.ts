import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collect-data',
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss']
})
export class CollectDataComponent implements OnInit {
  @Input() collectData;
  constructor( private dialog:MatDialogRef<CollectDataComponent>) { }

  ngOnInit() {
    if(this.collectData) {
      console.log("This Collect Data",this.collectData);
    }
    
  }

  close() {
    this.dialog.close({action:'goBack'});
  }

}
