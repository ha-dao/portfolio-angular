import { Injectable } from '@angular/core';
import { Testimonial } from '../interfaces/testimonial';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  constructor(private translateService: TranslateService) {}

  getTestimonials(): Observable<Testimonial[]> {
    return this.translateService.get('references.testimonials').pipe(
      map((testimonials: any[]) =>
        testimonials.map((testimonial, index) => ({
          text: testimonial.text,
          author: testimonial.author,
          index
        }))
      )
    );
  }

  getTestimonialsSync(): Testimonial[] {
    const testimonials = this.translateService.instant('references.testimonials');
    if (Array.isArray(testimonials)) {
      return testimonials.map((testimonial, index) => ({
        text: testimonial.text,
        author: testimonial.author,
        index
      }));
    }
    return [];
  }

  getItemIndex(index: number, totalLength: number): number {
    return ((index % totalLength) + totalLength) % totalLength;
  }

  getTestimonialAt(index: number, testimonials: Testimonial[]): Testimonial {
    const adjustedIndex = this.getItemIndex(index, testimonials.length);
    return testimonials[adjustedIndex];
  }
}
