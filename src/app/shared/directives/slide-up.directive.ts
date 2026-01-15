import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

type SlideDirection = 'up' | 'left' | 'right';

@Directive({
  selector: '[slide]',
  standalone: true,
})
export class SlideUpDirective implements AfterViewInit {

  @Input() slide: SlideDirection = 'up';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const baseClass = `slide-${this.slide}`;

    // Set initial state
    this.renderer.addClass(this.el.nativeElement, 'slide');
    this.renderer.addClass(this.el.nativeElement, baseClass);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'show');
          observer.unobserve(this.el.nativeElement); // animate once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.el.nativeElement);
  }
}
