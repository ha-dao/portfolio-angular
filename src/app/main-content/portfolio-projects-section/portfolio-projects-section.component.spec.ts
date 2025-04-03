import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjectsSectionComponent } from './portfolio-projects-section.component';

describe('PortfolioProjectsSectionComponent', () => {
  let component: PortfolioProjectsSectionComponent;
  let fixture: ComponentFixture<PortfolioProjectsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioProjectsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
