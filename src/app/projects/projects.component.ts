import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeDCardComponent } from '../three-dcard/three-dcard.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ThreeDCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  
}
