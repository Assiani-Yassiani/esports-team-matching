import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamrecrutemnentComponent } from './teamrecrutemnent.component';

describe('TeamrecrutemnentComponent', () => {
  let component: TeamrecrutemnentComponent;
  let fixture: ComponentFixture<TeamrecrutemnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamrecrutemnentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamrecrutemnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
