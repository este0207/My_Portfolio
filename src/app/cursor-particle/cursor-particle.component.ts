import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cursor-particle',
  templateUrl: './cursor-particle.component.html',
  styleUrls: ['./cursor-particle.component.css']
})
export class CursorParticleComponent implements OnInit {
  @ViewChild('particle') particle!: ElementRef;
  
  private mouseX: number = 0;
  private mouseY: number = 0;
  private particleX: number = 0;
  private particleY: number = 0;
  private animationFrameId: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.animate();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private animate() {
    // Calcul de la position de la particule avec un effet de retard
    const dx = this.mouseX - this.particleX;
    const dy = this.mouseY - this.particleY;
    
    this.particleX += dx * 0.1;
    this.particleY += dy * 0.1;

    // Mise à jour de la position de la particule
    if (this.particle) {
      this.particle.nativeElement.style.transform = `translate(${this.particleX}px, ${this.particleY}px)`;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
