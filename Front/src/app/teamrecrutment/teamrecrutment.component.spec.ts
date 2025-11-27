import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamrecrutmentComponent } from './teamrecrutment.component';

describe('TeamrecrutmentComponent', () => {
  let component: TeamrecrutmentComponent;
  let fixture: ComponentFixture<TeamrecrutmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamrecrutmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamrecrutmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
