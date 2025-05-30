import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelComponent } from "./model/model.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";
import { CursorParticleComponent } from "./cursor-particle/cursor-particle.component";
import { FooterComponent } from "./footer/footer.component";
import { ProjectsComponent } from "./projects/projects.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModelComponent, NavbarComponent, StartScreenComponent, CursorParticleComponent, FooterComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
}
