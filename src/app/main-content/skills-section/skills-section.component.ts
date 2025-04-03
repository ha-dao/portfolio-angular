import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {
  defaultImage: string = 'assets/img/3-skills/GrowthMindset-icon.svg';
  hoverImage: string = 'assets/img/3-skills/angular-icon.svg';
  currentImage: string = this.defaultImage;

  onMouseOver() {
    this.currentImage = this.hoverImage; // Bild beim Hover ändern
  }

  onMouseLeave() {
    this.currentImage = this.defaultImage; // Bild zurücksetzen
  }
}
