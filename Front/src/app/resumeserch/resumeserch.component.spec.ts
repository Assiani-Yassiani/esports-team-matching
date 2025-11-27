import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeserchComponent } from './resumeserch.component';

describe('ResumeserchComponent', () => {
  let component: ResumeserchComponent;
  let fixture: ComponentFixture<ResumeserchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeserchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeserchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
