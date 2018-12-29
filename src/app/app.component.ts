import { Component } from '@angular/core';
import { UiSelectionService } from './services/ui-selection/ui-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  pageIndex = 0;

  constructor(private uiSelectionService: UiSelectionService) {}

  setPage(index) {
    this.pageIndex = index;
    if(index === 0) {
      this.uiSelectionService.usePerson();
    }
  }
}
