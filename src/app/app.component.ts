import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelComponent } from "./model/model.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { CursorParticleComponent } from "./cursor-particle/cursor-particle.component";
import { FooterComponent } from "./footer/footer.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AboutContainerComponent } from "./about-container/about-container.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModelComponent, NavbarComponent, StartScreenComponent, CursorParticleComponent, FooterComponent, ProjectsComponent, AboutContainerComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
}
