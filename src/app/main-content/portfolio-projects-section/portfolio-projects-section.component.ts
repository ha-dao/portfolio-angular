import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';
import { TechIconService } from '../../services/tech-icons.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-projects-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './portfolio-projects-section.component.html',
  styleUrl: './portfolio-projects-section.component.scss'
})
export class PortfolioProjectsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('projectsTable') projectsTable!: ElementRef;

  projects: Project[] = [];
  activeProjectId: string | null = null;
  hoverPosition: number | null = null;
  showModal = false;
  currentProjectIndex = 0;
  isLandscape = false;
  private resizeSubscription?: Subscription;

  constructor(
    private projectService: ProjectService,
    private techIconService: TechIconService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    this.checkOrientation();
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkOrientation();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.checkOrientation();
  }

  private checkOrientation(): void {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  setActiveProject(projectId: string, event: MouseEvent): void {
    this.activeProjectId = projectId;

    const trElement = (event.currentTarget as HTMLElement);
    const tableRect = this.projectsTable.nativeElement.getBoundingClientRect();
    const trRect = trElement.getBoundingClientRect();

    this.hoverPosition = trRect.top - tableRect.top + (trRect.height / 2) - 100;
  }

  clearActiveProject(): void {
    this.activeProjectId = null;
    this.hoverPosition = null;
  }

  openModal(index: number): void {
    this.currentProjectIndex = index;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
    this.checkOrientation();
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  goToNextProject(): void {
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
  }

  get currentProject(): Project {
    return this.projects[this.currentProjectIndex];
  }

  getActiveProjectImage(): string {
    const project = this.projects.find(p => p.id === this.activeProjectId);
    return project ? project.imageUrl : '';
  }

  getActiveProjectName(): string {
    const project = this.projects.find(p => p.id === this.activeProjectId);
    return project ? project.name : '';
  }

  getActiveProjectNameTranslated(): string {
    const project = this.projects.find(p => p.id === this.activeProjectId);
    if (!project) return '';
    const translationKey = 'projects.' + project.id + '.name';
    return this.translateService.instant(translationKey);
  }

  getProjectScreenshotAlt(projectId: string | null): string {
    if (!projectId) return 'Project screenshot';
    const translatedName = this.translateService.instant('projects.' + projectId + '.name');
    return `${translatedName} screenshot`;
  }

  getNextProjectText(): string {
    return this.translateService.instant('projects.nextProject');
  }

  hasTechIcon(technology: string): boolean {
    return this.techIconService.hasTechIcon(technology);
  }

  getTechIconPath(technology: string): string | null {
    return this.techIconService.getIconPath(technology);
  }
}
