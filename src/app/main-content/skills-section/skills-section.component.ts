import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [TranslatePipe, RouterModule],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {
  defaultImage: string = 'assets/img/3-skills/GrowthMindset-icon.svg';
  hoverImage: string = 'assets/img/3-skills/angular-icon.svg';
  currentImage: string = this.defaultImage;

  onMouseOver() {
    this.currentImage = this.hoverImage;
  }

  onMouseLeave() {
    this.currentImage = this.defaultImage;
  }
}
