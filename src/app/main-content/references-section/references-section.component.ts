import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../services/testimonial.service';
import { Testimonial } from '../../interfaces/testimonial';
import { TestimonialItemComponent } from './testimonial-item/testimonial-item.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-references-section',
  standalone: true,
  imports: [CommonModule, TestimonialItemComponent, TranslatePipe],
  templateUrl: './references-section.component.html',
  styleUrls: ['./references-section.component.scss']
})
export class ReferencesSectionComponent implements OnInit, OnDestroy {
  activeIndex = 1;
  testimonials: Testimonial[] = [];

  isDragging = false;
  startPosition = 0;
  currentOffset = 0;

  private langChangeSubscription?: Subscription;

  constructor(
    private testimonialService: TestimonialService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  private loadTestimonials(): void {
    this.testimonials = this.testimonialService.getTestimonialsSync();
  }

  get prevTestimonial(): Testimonial {
    return this.testimonialService.getTestimonialAt(this.activeIndex - 1, this.testimonials);
  }

  get currentTestimonial(): Testimonial {
    return this.testimonialService.getTestimonialAt(this.activeIndex, this.testimonials);
  }

  get nextTestimonial(): Testimonial {
    return this.testimonialService.getTestimonialAt(this.activeIndex + 1, this.testimonials);
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
    return this.testimonialService.getItemIndex(this.activeIndex, this.testimonials.length) === index;
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
