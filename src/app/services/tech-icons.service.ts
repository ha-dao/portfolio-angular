import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechIconService {
  private readonly iconMapping: Record<string, string> = {
    'Angular': 'assets/img/4-projects/tech-icons/angular.svg',
    'TypeScript': 'assets/img/4-projects/tech-icons/typescript.svg',
    'HTML': 'assets/img/4-projects/tech-icons/html.svg',
    'CSS': 'assets/img/4-projects/tech-icons/css.svg',
    'Firebase': 'assets/img/4-projects/tech-icons/firebase.svg',
    'JavaScript': 'assets/img/4-projects/tech-icons/javascript.svg',
    'Database': 'assets/img/4-projects/tech-icons/database.svg',
    'Rest-API': 'assets/img/4-projects/tech-icons/rest-api.svg',
  };

  constructor() { }

  getIconPath(technology: string): string | null {
    return this.iconMapping[technology] || null;
  }

  hasTechIcon(technology: string): boolean {
    return technology in this.iconMapping;
  }
}
