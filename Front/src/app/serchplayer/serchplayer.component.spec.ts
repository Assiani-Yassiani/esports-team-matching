import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchplayerComponent } from './serchplayer.component';

describe('SerchplayerComponent', () => {
  let component: SerchplayerComponent;
  let fixture: ComponentFixture<SerchplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerchplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerchplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
