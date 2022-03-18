import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SvgService } from 'src/app/service/svg.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private svgService: SvgService
  ) {}

  ngOnInit() {
    this.svgService
      .getSvgByName('icon/logo/logo_no_text_black_transparent_512_256')
      .subscribe((newNode) => {
        this.element.nativeElement.innerHTML = newNode;
        this.element.nativeElement.classList.add('logo');
        this.renderer.setAttribute(this.element.nativeElement, 'role', 'img');
        this.renderer.setAttribute(
          this.element.nativeElement,
          'aria-label',
          'img'
        );
      });
  }
}
