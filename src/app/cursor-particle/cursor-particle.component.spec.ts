import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorParticleComponent } from './cursor-particle.component';

describe('CursorParticleComponent', () => {
  let component: CursorParticleComponent;
  let fixture: ComponentFixture<CursorParticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursorParticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursorParticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
