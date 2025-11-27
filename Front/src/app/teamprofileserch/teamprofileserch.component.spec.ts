import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamprofileserchComponent } from './teamprofileserch.component';

describe('TeamprofileserchComponent', () => {
  let component: TeamprofileserchComponent;
  let fixture: ComponentFixture<TeamprofileserchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamprofileserchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamprofileserchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
