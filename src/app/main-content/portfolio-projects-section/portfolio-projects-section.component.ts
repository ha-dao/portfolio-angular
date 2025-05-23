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
  private langChangeSubscription?: Subscription;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchMoved: boolean = false;
  private readonly TOUCH_THRESHOLD: number = 10;

  constructor(
    private projectService: ProjectService,
    private techIconService: TechIconService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.loadProjects();
    });

    this.checkOrientation();
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
    this.langChangeSubscription?.unsubscribe();
  }

  private loadProjects(): void {
    this.projects = this.projectService.getAllProjectsSync();
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

  handleTouchStart(event: TouchEvent, projectId: string): void {
    if (event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      this.touchMoved = false;

      this.activeProjectId = projectId;

      const trElement = (event.currentTarget as HTMLElement);
      const tableRect = this.projectsTable.nativeElement.getBoundingClientRect();
      const trRect = trElement.getBoundingClientRect();

      this.hoverPosition = trRect.top - tableRect.top + (trRect.height / 2) - 100;
    }
  }

  handleTouchEnd(event: TouchEvent, index: number): void {
    event.preventDefault();

    if (!this.touchMoved) {
      this.openModal(index);
    }

    this.clearActiveProject();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      const deltaX = Math.abs(touchX - this.touchStartX);
      const deltaY = Math.abs(touchY - this.touchStartY);

      if (deltaX > this.TOUCH_THRESHOLD || deltaY > this.TOUCH_THRESHOLD) {
        this.touchMoved = true;
        this.clearActiveProject();
      }
    }
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

  getProjectScreenshotAlt(projectId: string | null): string {
    if (!projectId) return 'Project screenshot';
    const project = this.projects.find(p => p.id === projectId);
    const projectName = project ? project.name : 'Project';
    return `${projectName} screenshot`;
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
