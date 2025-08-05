import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../interfaces/project';
import { WordpressProject } from '../interfaces/wordpress-project';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsMetadata = [
    {
      id: '01',
      technologies: ['Firebase', 'Angular', 'TypeScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/join-screenshot.png',
      liveUrl: 'https://join.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/join-kanban-board',
    },
    {
      id: '02',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/el-pollo-locco-screenshot.png',
      liveUrl: 'https://el-pollo-locco.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/el-pollo-locco',
    },
    {
      id: '03',
      technologies: ['Rest-API', 'JavaScript', 'HTML', 'CSS'],
      imageUrl: 'assets/img/4-projects/pokedex-screenshot.png',
      liveUrl: 'https://pokedex.ha-dao.de/',
      githubUrl: 'https://github.com/ha-dao/pokedex',
    },
  ];

  private wordpressProjectsMetadata = [
    {
      id: 'wp01',
      logoUrl: 'assets/img/4-projects/wp-logos/Berlinerfinanzmanufaktur-Logo-BlueWhite.svg',
      websiteUrl: 'https://berlinerfinanzmanufaktur.de/',
      hasWhiteBackground: false,
      isSpecificImg: false,
    },
    {
      id: 'wp02',
      logoUrl: 'assets/img/4-projects/wp-logos/bestattungshaus logo.svg',
      websiteUrl: 'https://bestattungen-sternberg.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp03',
      logoUrl: 'assets/img/4-projects/wp-logos/friedhof guestrow logo.svg',
      websiteUrl: 'https://friedhof-guestrow.de/',
      hasWhiteBackground: false,
      isSpecificImg: false,
    },
    {
      id: 'wp04',
      logoUrl:
        'assets/img/4-projects/wp-logos/ABC office24_Logo_Medizinischer-Schreibservice-3.svg',
      websiteUrl: 'https://www.abc-office24.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp05',
      logoUrl: 'assets/img/4-projects/wp-logos/Beerdigungsintitut-Weber-Logo.svg',
      websiteUrl: 'https://beerdigungsinstitut-kaiserslautern.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp06',
      logoUrl: 'assets/img/4-projects/wp-logos/freitagtischlerei logo.svg',
      websiteUrl: 'https://freitag-tischlerwerkstaetten.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp07',
      logoUrl: 'assets/img/4-projects/wp-logos/fritzschulz logo.svg',
      websiteUrl: 'https://fritz-schulz.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp08',
      logoUrl: 'assets/img/4-projects/wp-logos/Goodquest-Logo-Neu.svg',
      websiteUrl: 'https://goodquest.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp09',
      logoUrl: 'assets/img/4-projects/wp-logos/HIT_LOGO_ohneAnschnitt2.svg',
      websiteUrl: 'https://garagenpark-rostock.de/',
      hasWhiteBackground: false,
      isSpecificImg: false,
    },
    {
      id: 'wp10',
      logoUrl: 'assets/img/4-projects/wp-logos/IC-Individual-Cosmetics-Logo.svg',
      websiteUrl: 'https://individual-cosmetics.com/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp11',
      logoUrl: 'assets/img/4-projects/wp-logos/Inspektorenhaus-Logo-Querformat-gruen.svg',
      websiteUrl: 'https://inspektorenhaus-dobbin.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp12',
      logoUrl: 'assets/img/4-projects/wp-logos/JH_Logo_RZ.svg',
      websiteUrl: 'https://renejunghans.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp13',
      logoUrl: 'assets/img/4-projects/wp-logos/logo-jimmy-versicherung-quer.svg',
      websiteUrl: 'https://jimmy-versicherung.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp14',
      logoUrl: 'assets/img/4-projects/wp-logos/logo-jimmy-zusatz.svg',
      websiteUrl: 'https://jimmy-zusatzversicherung.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp16',
      logoUrl: 'assets/img/4-projects/wp-logos/Meat-Point-Logo.svg',
      websiteUrl: 'https://meat-point.de/',
      hasWhiteBackground: false,
      isSpecificImg: false,
    },
    {
      id: 'wp17',
      logoUrl: 'assets/img/4-projects/wp-logos/wohnungsaufloesung logo.svg',
      websiteUrl: 'https://www.wohnungsaufloesung-mv.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp18',
      logoUrl: 'assets/img/4-projects/wp-logos/radiologie-packebusch-logo.svg',
      websiteUrl: 'https://radiologie-packebusch.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp19',
      logoUrl: 'assets/img/4-projects/wp-logos/Nico-Dudek-Logo-black-bg-Pfad.svg',
      websiteUrl: 'https://versicherungen-guestrow.de/',
      hasWhiteBackground: false,
      isSpecificImg: false,
    },
    {
      id: 'wp20',
      logoUrl: 'assets/img/4-projects/wp-logos/Ostsee-Heu-Logo-Original.svg',
      websiteUrl: 'https://ostsee-heu.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp21',
      logoUrl: 'assets/img/4-projects/wp-logos/praxisdiering logo.png',
      websiteUrl: 'https://www.praxis-diering.de/',
      hasWhiteBackground: true,
      isSpecificImg: true,
    },
    {
      id: 'wp22',
      logoUrl: 'assets/img/4-projects/wp-logos/NeuWerk-Logo.svg',
      websiteUrl: 'https://neuwerk-kassel.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp23',
      logoUrl: 'assets/img/4-projects/wp-logos/reha gardersee logo.svg',
      websiteUrl: 'https://www.reha-gardersee.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp24',
      logoUrl: 'assets/img/4-projects/wp-logos/skodaservice LogoO.svg',
      websiteUrl: 'https://skodaservice.de/',
      hasWhiteBackground: true,
      isSpecificImg: false,
    },
    {
      id: 'wp25',
      logoUrl: 'assets/img/4-projects/wp-logos/mt-mecklenburger-textildruck-logo-full.png',
      websiteUrl: 'https://mecklenburger-textildruck.de/',
      hasWhiteBackground: true,
      isSpecificImg: true,
    },
    {
      id: 'wp26',
      logoUrl: 'assets/img/4-projects/wp-logos/unternehmen-mit-strahlkraft-logo.webp',
      websiteUrl: 'https://unternehmen-mit-strahlkraft.de/',
      hasWhiteBackground: false,
      isSpecificImg: true,
    },
  ];

  constructor(private translateService: TranslateService) {}

  getAllProjects(): Observable<Project[]> {
    return this.translateService.get('projects').pipe(
      map((translations: any) =>
        this.projectsMetadata.map((metadata) => {
          const translatedProject = translations[metadata.id];
          return {
            ...metadata,
            name: translatedProject?.name || `Project ${metadata.id}`,
            description:
              translatedProject?.description || 'No description available',
            longDescription:
              translatedProject?.longDescription ||
              'No detailed description available',
          };
        })
      )
    );
  }

  getAllProjectsSync(): Project[] {
    const translations = this.translateService.instant('projects');

    return this.projectsMetadata.map((metadata) => {
      const translatedProject = translations[metadata.id];
      return {
        ...metadata,
        name: translatedProject?.name || `Project ${metadata.id}`,
        description:
          translatedProject?.description || 'No description available',
        longDescription:
          translatedProject?.longDescription ||
          'No detailed description available',
      };
    });
  }

  getAllWordpressProjects(): Observable<WordpressProject[]> {
    return this.translateService.get('wordpressProjects').pipe(
      map((translations: any) =>
        this.wordpressProjectsMetadata.map((metadata) => {
          const translatedProject = translations[metadata.id];
          return {
            ...metadata,
            logoAlt: translatedProject?.logoAlt || `${metadata.id} Logo`,
            technologies: translatedProject?.technologies || [
              'WordPress',
              'Elementor',
            ],
          };
        })
      )
    );
  }

  getAllWordpressProjectsSync(): WordpressProject[] {
    const translations = this.translateService.instant('wordpressProjects');

    return this.wordpressProjectsMetadata.map((metadata) => {
      const translatedProject = translations[metadata.id];
      return {
        ...metadata,
        logoAlt: translatedProject?.logoAlt || `${metadata.id} Logo`,
        technologies: translatedProject?.technologies || [
          'WordPress',
          'Elementor',
        ],
      };
    });
  }

  getProjectById(id: string): Project | undefined {
    const projects = this.getAllProjectsSync();
    return projects.find((project) => project.id === id);
  }

  getWordpressProjectById(id: string): WordpressProject | undefined {
    const projects = this.getAllWordpressProjectsSync();
    return projects.find((project) => project.id === id);
  }
}
