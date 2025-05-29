import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-three-dcard',
  imports: [CommonModule],
  templateUrl: './three-dcard.component.html',
  styleUrl: './three-dcard.component.css'
})
export class ThreeDCardComponent {
  rotateX = 0;
  rotateY = 0;

  get cardStyle() {
    return {
      transform: `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    };
  }

  onMouseMove(event: MouseEvent) {
    const element = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - element.left;
    const y = event.clientY - element.top;

    const centerX = element.width / 2;
    const centerY = element.height / 2;

    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = -((y - centerY) / centerY) * 20;

    this.rotateX = rotateX;
    this.rotateY = rotateY;
  }

  onMouseLeave() {
    this.rotateX = 0;
    this.rotateY = 0;
  }
}
