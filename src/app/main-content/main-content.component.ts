import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { PortfolioProjectsSectionComponent } from './portfolio-projects-section/portfolio-projects-section.component';
import { ReferencesSectionComponent } from './references-section/references-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, AboutMeSectionComponent, PortfolioProjectsSectionComponent, ReferencesSectionComponent, SkillsSectionComponent, ContactSectionComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
