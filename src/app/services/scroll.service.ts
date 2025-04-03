import { Injectable } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Diese Methode nutzt die eingebauten Angular Router-Events
    this.router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll)
    ).subscribe(e => {
      if (e.position) {
        // Ältere Position wiederherstellen
        this.viewportScroller.scrollToPosition(e.position);
      } else if (e.anchor) {
        // Zu Anker scrollen
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(e.anchor as string);
        }, 300);
      } else {
        // Zum Anfang scrollen
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
