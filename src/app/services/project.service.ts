import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: '01',
      name: 'Join',
      description: 'What is this project about?',
      longDescription: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      technologies: ['Firebase', 'Angular', 'Typescript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/join-screenshot.png',
      liveUrl: 'https://join-example.com',
      githubUrl: 'https://github.com/example/join'
    },
    {
      id: '02',
      name: 'El Pollo Locco',
      description: 'What is this project about?',
      longDescription: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      technologies: ['HTML', 'CSS', 'Javascript'],
      imageUrl: 'assets/img/4-projects/el-pollo-locco-screenshot.png',
      liveUrl: 'https://el-pollo-locco-example.com',
      githubUrl: 'https://github.com/example/el-pollo-locco'
    },
    {
      id: '03',
      name: 'DA Bubble',
      description: 'What is this project about?',
      longDescription: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      technologies: ['Angular', 'Firebase', 'Typescript'],
      imageUrl: 'assets/img/4-projects/da-bubble-screenshot.png',
      liveUrl: 'https://da-bubble-example.com',
      githubUrl: 'https://github.com/example/da-bubble'
    }
  ];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}
