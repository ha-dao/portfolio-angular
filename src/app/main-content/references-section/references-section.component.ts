import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../services/testimonial.service';
import { TestimonialItemComponent } from './testimonial-item/testimonial-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-references-section',
  standalone: true,
  imports: [CommonModule, TestimonialItemComponent, TranslatePipe],
  templateUrl: './references-section.component.html',
  styleUrls: ['./references-section.component.scss']
})
export class ReferencesSectionComponent {
  activeIndex = 1;

  isDragging = false;
  startPosition = 0;
  currentOffset = 0;

  constructor(public testimonialService: TestimonialService) {}

  get prevTestimonial() {
    return this.testimonialService.getTestimonialAt(this.activeIndex - 1);
  }

  get currentTestimonial() {
    return this.testimonialService.getTestimonialAt(this.activeIndex);
  }

  get nextTestimonial() {
    return this.testimonialService.getTestimonialAt(this.activeIndex + 1);
  }

  get testimonials() {
    return this.testimonialService.getTestimonials();
  }

  handlePrevClick(): void {
    this.activeIndex--;
  }

  handleNextClick(): void {
    this.activeIndex++;
  }

  handleDotClick(index: number): void {
    this.activeIndex = index;
  }

  isActiveDot(index: number): boolean {
    return this.testimonialService.getItemIndex(this.activeIndex) === index;
  }

  getTransform(position: 'prev' | 'current' | 'next'): string {
    let baseTransform = '';

    switch (position) {
      case 'prev':
        baseTransform = 'translateX(calc(-60% + ' + this.currentOffset + 'px))';
        break;
      case 'current':
        baseTransform = 'translateX(calc(-50% + ' + this.currentOffset + 'px))';
        break;
      case 'next':
        baseTransform = 'translateX(calc(-50% + ' + this.currentOffset + 'px))';
        break;
    }
    return baseTransform;
  }

  getTransition(): string {
    return this.isDragging ? 'all 0.5s ease-in-out' : 'none';
  }
}
