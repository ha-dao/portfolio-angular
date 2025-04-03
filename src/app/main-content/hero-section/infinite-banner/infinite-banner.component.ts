import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-infinite-banner',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './infinite-banner.component.html',
  styleUrls: ['./infinite-banner.component.scss']
})
export class InfiniteBannerComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  cloneCount = signal([0, 1, 2, 3, 4, 5]);

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;
    const content = container.querySelector('.banner-content');

    let position = 0;
    const speed = 1;

    function animate() {
      position -= speed;
      container.style.transform = `translateX(${position}px)`;

      const firstElementWidth = content.offsetWidth;

      if (Math.abs(position) >= firstElementWidth) {
        position += firstElementWidth;
        container.style.transform = `translateX(${position}px)`;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
}
