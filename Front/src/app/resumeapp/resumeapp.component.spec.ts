import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeappComponent } from './resumeapp.component';

describe('ResumeappComponent', () => {
  let component: ResumeappComponent;
  let fixture: ComponentFixture<ResumeappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
