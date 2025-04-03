import { Component } from '@angular/core';
import { InfiniteBannerComponent } from './infinite-banner/infinite-banner.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [InfiniteBannerComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
