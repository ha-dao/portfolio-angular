import { Injectable } from '@angular/core';
import { Testimonial } from '../interfaces/testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private testimonialsData: Testimonial[] = [
    {
      text: "Our project benefited enormously from Lukas efficient way of working.",
      author: "T.Schulz - Frontend Developer"
    },
    {
      text: "Lukas has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
      author: "H.Janisch - Team Partner"
    },
    {
      text: "I had the good fortune of working with Simon in a group project at the Developer Akademie that involved a lot of effort. He always stayed calm, cool, and focused, and made sure our team was set up for success. He's super knowledgeable, easy to work with, and I'd happily work with him again given the chance.",
      author: "A. Fischer - Team Partner"
    }
  ];

  getTestimonials(): Testimonial[] {
    return this.testimonialsData;
  }

  getItemIndex(index: number): number {
    const length = this.testimonialsData.length;
    return ((index % length) + length) % length;
  }

  getTestimonialAt(index: number): Testimonial {
    return this.testimonialsData[this.getItemIndex(index)];
  }
}
