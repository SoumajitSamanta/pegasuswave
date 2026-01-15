import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit , OnInit{
  ngOnInit(): void {
     window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
  title = 'pegasuswave';
 isLoading = true;

ngAfterViewInit() {
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}

}
