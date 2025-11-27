import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpTeamComponent } from './up-team.component';

describe('UpTeamComponent', () => {
  let component: UpTeamComponent;
  let fixture: ComponentFixture<UpTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
