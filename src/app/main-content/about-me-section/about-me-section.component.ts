import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutInfo } from '../../interfaces/about-info';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {
  imageUrl = 'assets/img/2-about-me/working.png';

  infoItems: AboutInfo[] = [
    {
      title: 'Location',
      icon: 'assets/img/2-about-me/location-marker-icon.svg',
      description: 'location'
    },
    {
      title: 'Open-minded',
      icon: 'assets/img/2-about-me/open-minded-icon.svg',
      description: 'openminded'
    },
    {
      title: 'Problem-solving',
      icon: 'assets/img/2-about-me/prove-badge-icon.svg',
      description: 'problemsolving'
    }
  ];
}
