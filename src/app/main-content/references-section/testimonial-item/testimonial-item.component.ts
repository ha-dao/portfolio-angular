import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../interfaces/testimonial';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-item.component.html',
  styleUrl: './testimonial-item.component.scss'
})
export class TestimonialItemComponent {
  @Input() testimonial!: Testimonial;
  @Input() isActive = false;

  constructor(private translateService: TranslateService) {}

  getTranslatedText(testimonial: Testimonial): string {
    const index = this.getTestimonialIndex(testimonial);
    return this.translateService.instant(`references.testimonials.${index}.text`);
  }

  getTranslatedAuthor(testimonial: Testimonial): string {
    const index = this.getTestimonialIndex(testimonial);
    return this.translateService.instant(`references.testimonials.${index}.author`);
  }

  private getTestimonialIndex(testimonial: Testimonial): number {
    const allTestimonials = this.getTestimonials();
    const index = allTestimonials.findIndex(t =>
      t.text === testimonial.text && t.author === testimonial.author
    );
    return index >= 0 ? index : 0;
  }

  private getTestimonials(): Testimonial[] {
    return [
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
  }
}
