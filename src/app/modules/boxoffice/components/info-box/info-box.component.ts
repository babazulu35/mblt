import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() textTitle;
  @Input() textContent;
  constructor(private dialogRef:MatDialogRef<InfoBoxComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
