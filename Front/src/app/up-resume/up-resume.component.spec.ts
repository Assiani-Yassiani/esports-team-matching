import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpResumeComponent } from './up-resume.component';

describe('UpResumeComponent', () => {
  let component: UpResumeComponent;
  let fixture: ComponentFixture<UpResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
