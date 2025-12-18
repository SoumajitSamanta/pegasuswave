import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pegasuswave';
  menuItems = [
    {
      title: 'Home',
      link: '/home',
      icon: 'home-outline',
    }];
}
