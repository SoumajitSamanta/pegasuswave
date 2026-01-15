import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  focus: any;
  focus1: any;
  private toggleButton: any;
  private sidebarVisible: boolean;

  @ViewChild('nav', { static: false }) navbar!: ElementRef;


  constructor(public location: Location, private element: ElementRef, private renderer: Renderer2,) {
    this.sidebarVisible = false;
  }


  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
        // add logic
        navbar.classList.remove('navbar-transparent');
      } else {
        // remove logic
        navbar.classList.add('navbar-transparent');
      }
    });
  }
  ngAfterViewInit(): void {
    this.renderer.listen('window', 'scroll', () => {
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition > 150) {
        this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
      } else {
        this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
      }
    });
    requestAnimationFrame(() => this.animate());
    this.startDrag();
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee === '/home') {
      return true;
    }
    else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee === '/documentation') {
      return true;
    }
    else {
      return false;
    }
  }
   @ViewChild('track', { static: true })
  track!: ElementRef<HTMLDivElement>;

  logos = [
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
    './assets/img/placeholder.jpg',
  ];

  private position = 0;
  private speed = 0.4; // px per frame

  animate(): void {
    const trackEl = this.track.nativeElement;
    const firstLogo = trackEl.children[0] as HTMLElement;

    this.position -= this.speed;
    trackEl.style.transform = `translateX(${this.position}px)`;

    if (firstLogo) {
      const logoWidth = firstLogo.offsetWidth + 60; // include gap

      if (Math.abs(this.position) >= logoWidth) {
        trackEl.appendChild(firstLogo);
        this.position += logoWidth;
      }
    }

    requestAnimationFrame(() => this.animate());
  }
  
  @ViewChild('reviewTrack', { static: true })
  reviewTrack!: ElementRef<HTMLDivElement>;

  reviews = [
    {
      text: 'Excellent speed and reliable connection!',
      name: 'Amit Sharma',
      role: 'Software Engineer',
    },
    {
      text: 'Best broadband service in my area.',
      name: 'Neha Verma',
      role: 'Content Creator',
    },
    {
      text: 'Low latency and great customer support.',
      name: 'Rohit Das',
      role: 'Gamer',
    },
    {
      text: 'Perfect for work-from-home needs.',
      name: 'Priya Sen',
      role: 'UX Designer',
    },
  ];

   private intervalId!: number;
  private index = 0;
  private cardWidth = 0;
  private totalCards = 0;

  startDrag(): void {
     const track = this.reviewTrack.nativeElement;

    // 1️⃣ Clone ALL cards once
    const cards = Array.from(track.children);
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });

    this.totalCards = cards.length;

    // 2️⃣ Calculate width (including gap)
    this.cardWidth = (track.children[0] as HTMLElement).offsetWidth + 24;

    // 3️⃣ Start step-based auto scroll
    this.intervalId = window.setInterval(() => {
      this.move();
    }, 1000);
  }

  move(): void {
    const track = this.reviewTrack.nativeElement;
    this.index++;

    // Small drag/snap effect
    track.style.transition = 'transform 160ms cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${this.index * this.cardWidth}px)`;

    // 4️⃣ Seamless reset at midpoint
    if (this.index === this.totalCards) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        this.index = 0;
      }, 170);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
