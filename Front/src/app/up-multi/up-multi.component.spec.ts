import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpMultiComponent } from './up-multi.component';

describe('UpMultiComponent', () => {
  let component: UpMultiComponent;
  let fixture: ComponentFixture<UpMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpMultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
