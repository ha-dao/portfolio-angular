import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isHovered: boolean = false;
  isScrolled = false;

  ngOnInit() {
    // Initiale Überprüfung des Scroll-Status
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Überprüfen, ob die Scroll-Position mehr als 100px ist
    this.isScrolled = window.scrollY > 100;
  }
}
