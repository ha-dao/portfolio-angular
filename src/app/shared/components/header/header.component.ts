import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isHovered: boolean = false;
  isScrolled = false;
  isEnglish: boolean = false;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'de']);

    const savedLanguageState = localStorage.getItem('isEnglish');
    if (savedLanguageState !== null) {
      this.isEnglish = savedLanguageState === 'true';
      const savedLang = this.isEnglish ? 'de' : 'en';

      translate.setDefaultLang(savedLang);
      translate.use(savedLang);
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
      console.log('No saved language preference, using default: en');
    }
  }

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    const newLang = this.isEnglish ? 'de' : 'en';
    this.translate.use(newLang);

    localStorage.setItem('isEnglish', this.isEnglish.toString());
  }

}
