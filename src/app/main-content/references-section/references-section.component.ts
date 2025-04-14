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

  touchStart(event: TouchEvent | MouseEvent): void {
    this.isDragging = true;

    if (event instanceof TouchEvent) {
      this.startPosition = event.touches[0].clientX;
    } else {
      this.startPosition = event.clientX;
    }
  }

  touchMove(event: TouchEvent | MouseEvent): void {
    if (!this.isDragging) return;

    let clientX = 0;
    if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }

    const diff = clientX - this.startPosition;

    const maxDrag = window.innerWidth / 3;
    this.currentOffset = Math.sign(diff) * Math.min(Math.abs(diff), maxDrag);
  }

  touchEnd(): void {
    if (!this.isDragging) return;

    this.isDragging = false;

    if (Math.abs(this.currentOffset) > 80) {
      if (this.currentOffset > 0) {
        this.handlePrevClick();
      } else {
        this.handleNextClick();
      }
    }

    this.currentOffset = 0;
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
    return this.isDragging ? 'none' : 'all 0.5s ease-in-out';
  }
}
