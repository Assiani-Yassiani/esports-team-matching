import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultigamingComponent } from './multigaming.component';

describe('MultigamingComponent', () => {
  let component: MultigamingComponent;
  let fixture: ComponentFixture<MultigamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultigamingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultigamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
