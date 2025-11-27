import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchmultiComponent } from './serchmulti.component';

describe('SerchmultiComponent', () => {
  let component: SerchmultiComponent;
  let fixture: ComponentFixture<SerchmultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerchmultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerchmultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
