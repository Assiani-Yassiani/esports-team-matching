import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileoffreserchComponent } from './profileoffreserch.component';

describe('ProfileoffreserchComponent', () => {
  let component: ProfileoffreserchComponent;
  let fixture: ComponentFixture<ProfileoffreserchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileoffreserchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileoffreserchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
