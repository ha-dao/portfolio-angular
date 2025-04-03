import { Component } from '@angular/core';
import { InfiniteBannerComponent } from './infinite-banner/infinite-banner.component';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [InfiniteBannerComponent, TranslatePipe, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
