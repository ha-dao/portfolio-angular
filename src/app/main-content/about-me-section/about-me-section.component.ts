import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutInfo } from '../../interfaces/about-info';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {
  headerText = 'Who I am';
  title = 'About me';
  introduction = 'Hey there, I\'m Lukas! Write some information about yourself that is IT related. Why are you passionate about coding? What is your source of inspiration for improving your programming skills?';
  imageUrl = 'assets/img/2-about-me/working.png';

  infoItems: AboutInfo[] = [
    {
      title: 'Location',
      icon: 'assets/img/2-about-me/location-marker-icon.svg',
      description: 'Where are you based? Would you be open to working remotely or potentially relocating?'
    },
    {
      title: 'Open-minded',
      icon: 'assets/img/2-about-me/open-minded-icon.svg',
      description: 'Show that you are open-minded. Are you enthusiastic about learning new technologies and continually improving your skills?'
    },
    {
      title: 'Problem-solving',
      icon: 'assets/img/2-about-me/prove-badge-icon.svg',
      description: 'A brief description of your problem-solving approach. Do you learn from each challenge as you search for the most efficient or elegant solution? You can include some keywords like: analytical thinking, creativity, persistence and collaboration.'
    }
  ];
}
