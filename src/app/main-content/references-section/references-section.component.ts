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
  testimonials: Testimonial[] = [];
  currentIndex = 0;
  isAnimating = false;

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
    if (this.testimonials.length > 0) {
      this.updateCarousel(0);
    }
  }

  handlePrevClick(): void {
    if (this.isAnimating) return;
    this.updateCarousel(this.currentIndex - 1);
  }

  handleNextClick(): void {
    if (this.isAnimating) return;
    this.updateCarousel(this.currentIndex + 1);
  }

  handleDotClick(index: number): void {
    if (this.isAnimating) return;
    this.updateCarousel(index);
  }

  handleCardClick(index: number): void {
    if (this.isAnimating) return;
    this.updateCarousel(index);
  }

  updateCarousel(newIndex: number): void {
    if (this.isAnimating || this.testimonials.length === 0) return;

    this.isAnimating = true;
    this.currentIndex = (newIndex + this.testimonials.length) % this.testimonials.length;

    setTimeout(() => {
      this.isAnimating = false;
    }, 100);
  }

  getCardClass(cardIndex: number): string {
    if (this.testimonials.length === 0) return 'hidden';

    const offset = (cardIndex - this.currentIndex + this.testimonials.length) % this.testimonials.length;

    if (offset === 0) {
      return 'center';
    } else if (offset === 1) {
      return 'right-1';
    } else if (offset === 2) {
      return 'right-2';
    } else if (offset === this.testimonials.length - 1) {
      return 'left-1';
    } else if (offset === this.testimonials.length - 2) {
      return 'left-2';
    } else {
      return 'hidden';
    }
  }

  isActiveTestimonial(index: number): boolean {
    return index === this.currentIndex;
  }

  isActiveDot(index: number): boolean {
    return index === this.currentIndex;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private touchStartX = 0;
  private touchEndX = 0;

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.handleNextClick();
      } else {
        this.handlePrevClick();
      }
    }
  }
}
