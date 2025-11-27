import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreProfileComponent } from './offre-profile.component';

describe('OffreProfileComponent', () => {
  let component: OffreProfileComponent;
  let fixture: ComponentFixture<OffreProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
