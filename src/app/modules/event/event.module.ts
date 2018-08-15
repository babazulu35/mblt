import { EventSearchResultComponent } from './routes/event-search-result/event-search-result.component';
import { NgModule } from '@angular/core';
import { EventListComponent } from './routes/event-list/event-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from '../shared/shared.module';
import { EventSearchComponent } from './routes/event-search/event-search.component';
import { EventCalendarBoxComponent } from './components/event-calendar-box/event-calendar-box.component';
import { EventMoodSelectBoxComponent } from './components/event-mood-select-box/event-mood-select-box.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventDetailComponent } from './routes/event-detail/event-detail.component';
import { EventFilterBarComponent } from './components/event-filter-bar/event-filter-bar.component';
import { EventTicketCardComponent } from './components/event-ticket-card/event-ticket-card.component';
import { EventSessionBoxComponent } from './components/event-session-box/event-session-box.component';
import { ListEventListType } from '../../enum/list-event-list-type.enum';

const routes: Routes = [
  { path: 'list/by-date', component: EventListComponent, data: {listType: ListEventListType.ByDate} },
  { path: 'list/by-mood', component: EventListComponent, data: {listType: ListEventListType.ByMood} },
  { path: 'search', component: EventSearchComponent},
  { path: 'search/:key', component: EventSearchResultComponent },
  { path: 'detail/:id', component: EventDetailComponent },
  { path: 'list', redirectTo: 'list/by-date', pathMatch: 'full' },
  { path: '', redirectTo: 'list/by-date', pathMatch: 'full' }
];

@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes), MyDatePickerModule
  ],
  declarations: [
    EventListComponent,
    EventSearchComponent,
    EventSearchResultComponent,
    EventCalendarBoxComponent,
    EventMoodSelectBoxComponent,
    EventDetailComponent,
    EventCardComponent,
    EventFilterBarComponent,
    EventTicketCardComponent,
    EventSessionBoxComponent
  ],
  exports: [
    EventListComponent,
    EventSearchComponent,
    EventSearchResultComponent,
    EventCalendarBoxComponent,
    EventMoodSelectBoxComponent,
    EventCalendarBoxComponent,
    EventMoodSelectBoxComponent
  ],
  entryComponents: [EventCalendarBoxComponent, EventMoodSelectBoxComponent]
})
export class EventModule { }
