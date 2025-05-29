import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDCardComponent } from './three-dcard.component';

describe('ThreeDCardComponent', () => {
  let component: ThreeDCardComponent;
  let fixture: ComponentFixture<ThreeDCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
