import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteBannerComponent } from './infinite-banner.component';

describe('InfiniteBannerComponent', () => {
  let component: InfiniteBannerComponent;
  let fixture: ComponentFixture<InfiniteBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfiniteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
