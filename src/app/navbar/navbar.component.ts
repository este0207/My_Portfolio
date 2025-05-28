import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../services/view-state.service';

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

    this.viewStateService.toggleHeadOnlyView();
    textElements.forEach(element => {
      element.classList.toggle("active");
    });
  }
}
