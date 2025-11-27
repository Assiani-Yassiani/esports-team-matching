import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchteamComponent } from './serchteam.component';

describe('SerchteamComponent', () => {
  let component: SerchteamComponent;
  let fixture: ComponentFixture<SerchteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerchteamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerchteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
