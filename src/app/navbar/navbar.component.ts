import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../services/view-state.service';
// import { ProjectsComponent } from '../projects/projects.component';
// import { AboutContainerComponent } from '../about-container/about-container.component';
// import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private viewStateService: ViewStateService) {}

  onProjectClick() {
    const textElements = document.querySelectorAll(".text");
    const contactContainer = document.querySelector(".form-container") as HTMLElement;
    const aboutContainer = document.querySelector(".AboutContainer") as HTMLElement;
    const projectContainer = document.querySelector(".projects-container") as HTMLElement;
    
    // Vérifier si la vue est déjà active
    const isAlreadyActive = this.viewStateService.isViewActive('head');
    
    // Activer ou désactiver l'animation Three.js
    this.viewStateService.activateView('head');
    
    // Animation des éléments de texte
    textElements.forEach(element => {
      element.classList.toggle("active");
    });
    
    // Masquer les autres conteneurs immédiatement
    aboutContainer.classList.remove("active");
    contactContainer.classList.remove("active");
    
    if (isAlreadyActive) {
      // Si on dézoom, masquer le conteneur de projets
      projectContainer.classList.remove("active");
    } else {
      // Si on zoom, afficher le conteneur de projets
      setTimeout(() => {
        projectContainer.classList.add("active");
      }, 200);
    }
  }

  onAboutClick() {
    const textElements = document.querySelectorAll(".text");
    const contactContainer = document.querySelector(".form-container") as HTMLElement;
    const aboutContainer = document.querySelector(".AboutContainer") as HTMLElement;
    const projectContainer = document.querySelector(".projects-container") as HTMLElement;

    // Vérifier si la vue est déjà active
    const isAlreadyActive = this.viewStateService.isViewActive('zoom');

    // Activer ou désactiver l'animation Three.js
    this.viewStateService.activateView('zoom');
    
    // Animation des éléments de texte
    textElements.forEach(element => {
      element.classList.toggle("active");
    });
    
    // Masquer les autres conteneurs immédiatement
    projectContainer.classList.remove("active");
    contactContainer.classList.remove("active");
    
    if (isAlreadyActive) {
      // Si on dézoom, masquer le conteneur about
      aboutContainer.classList.remove("active");
    } else {
      // Si on zoom, afficher le conteneur about
      setTimeout(() => {
        aboutContainer.classList.add("active");
      }, 150);
    }
  }

  onContactClick(){
    const contactContainer = document.querySelector(".form-container") as HTMLElement;
    const aboutContainer = document.querySelector(".AboutContainer") as HTMLElement;
    const projectContainer = document.querySelector(".projects-container") as HTMLElement;

    // Vérifier si la vue est déjà active
    const isAlreadyActive = this.viewStateService.isViewActive('contact');

    // Activer ou désactiver l'animation Three.js
    this.viewStateService.activateView('contact');
    
    // Masquer les autres conteneurs immédiatement
    aboutContainer.classList.remove("active");
    projectContainer.classList.remove("active");
    
    if (isAlreadyActive) {
      // Si on dézoom, masquer le conteneur de contact
      contactContainer.classList.remove("active");
    } else {
      // Si on zoom, afficher le conteneur de contact
      setTimeout(() => {
        contactContainer.classList.add("active");
      }, 200);
    }
  }
}
