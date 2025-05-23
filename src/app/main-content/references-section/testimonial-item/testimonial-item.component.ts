import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../interfaces/testimonial';

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
}
