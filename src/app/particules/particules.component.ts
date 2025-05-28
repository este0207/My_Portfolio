import { Component, OnInit, AfterViewInit } from '@angular/core';
import ParticlesConfig from './../asset/particlesjs-config.json';

declare const particlesJS: any;

@Component({
  selector: 'app-particules',
  templateUrl: './particules.component.html',
  styleUrls: ['./particules.component.css']
})
export class ParticulesComponent implements OnInit, AfterViewInit {
    constructor() { }

    ngOnInit() {
        // Initialisation déplacée dans ngAfterViewInit
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', ParticlesConfig);
            } else {
                console.error('particlesJS n\'est pas défini');
            }
        }, 0);
    }
}