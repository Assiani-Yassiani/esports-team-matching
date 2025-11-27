import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultigamingprofileComponent } from './multigamingprofile.component';

describe('MultigamingprofileComponent', () => {
  let component: MultigamingprofileComponent;
  let fixture: ComponentFixture<MultigamingprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultigamingprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultigamingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
