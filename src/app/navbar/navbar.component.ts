import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../services/view-state.service';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private viewStateService: ViewStateService) {}

  onProjectClick() {
    const textElements = document.querySelectorAll(".text");
    const projectContainer = document.querySelector(".projects-container") as HTMLElement;
    
    this.viewStateService.toggleHeadOnlyView();
    textElements.forEach(element => {
      element.classList.toggle("active");
    });
    setTimeout(() => {
      projectContainer.classList.toggle("active");
    }, 300);
    // document.body.style.overflow = "scrool";
  }
}
