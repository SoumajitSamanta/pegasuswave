import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pegasuswave';
 isLoading = true;

ngAfterViewInit() {
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}

}
