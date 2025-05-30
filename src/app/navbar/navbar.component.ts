import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../services/view-state.service';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutContainerComponent } from '../about-container/about-container.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, AboutContainerComponent],
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
  }

  onAboutClick() {
    const textElements = document.querySelectorAll(".text");
    const aboutContainer = document.querySelector(".AboutContainer") as HTMLElement;


    this.viewStateService.toggleZoomView();
    textElements.forEach(element => {
      element.classList.toggle("active");
    });
    setTimeout(() => {
      aboutContainer.classList.toggle("active");
    }, 100);
  }
}
