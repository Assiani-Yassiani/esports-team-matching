import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamappComponent } from './teamapp.component';

describe('TeamappComponent', () => {
  let component: TeamappComponent;
  let fixture: ComponentFixture<TeamappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
