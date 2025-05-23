import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../interfaces/project';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsMetadata = [
    {
      id: '01',
      technologies: ['Firebase', 'Angular', 'TypeScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/join-screenshot.png',
      liveUrl: 'https://join.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/join-kanban-board'
    },
    {
      id: '02',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/el-pollo-locco-screenshot.png',
      liveUrl: 'https://el-pollo-locco.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/el-pollo-locco'
    },
    {
      id: '03',
      technologies: ['Rest-API', 'JavaScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/pokedex-screenshot.png',
      liveUrl: 'https://pokedex.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/pokedex'
    }
  ];

  constructor(private translateService: TranslateService) {}

  getAllProjects(): Observable<Project[]> {
    return this.translateService.get('projects').pipe(
      map((translations: any) =>
        this.projectsMetadata.map(metadata => {
          const translatedProject = translations[metadata.id];
          return {
            ...metadata,
            name: translatedProject?.name || `Project ${metadata.id}`,
            description: translatedProject?.description || 'No description available',
            longDescription: translatedProject?.longDescription || 'No detailed description available'
          };
        })
      )
    );
  }

  getAllProjectsSync(): Project[] {
    const translations = this.translateService.instant('projects');

    return this.projectsMetadata.map(metadata => {
      const translatedProject = translations[metadata.id];
      return {
        ...metadata,
        name: translatedProject?.name || `Project ${metadata.id}`,
        description: translatedProject?.description || 'No description available',
        longDescription: translatedProject?.longDescription || 'No detailed description available'
      };
    });
  }

  getProjectById(id: string): Project | undefined {
    const projects = this.getAllProjectsSync();
    return projects.find(project => project.id === id);
  }
}
