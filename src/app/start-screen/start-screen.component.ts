import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticulesComponent } from "../particules/particules.component";

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.css'
})
export class StartScreenComponent implements AfterViewInit {
  @ViewChild('textContainer') textContainer!: ElementRef;
  
  private readonly letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/=";
  private readonly loopDelay = 1000;
  private readonly initDelay = 100;
  
  isVisible = false;
  iteration = 0;
  originalText = "Welcome to my world"; 
  displayText = ":)";
  private observer: IntersectionObserver | null = null;
  private animationInterval: any = null;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      });
    });

    if (this.textContainer?.nativeElement) {
      this.observer.observe(this.textContainer.nativeElement);
    }
  }

  private encrypt(iteration: number): string {
    return this.originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return this.originalText[index];
        }
        return this.letters[Math.floor(Math.random() * this.letters.length)];
      })
      .join("");
  }

  private startAnimation() {
    setTimeout(() => {
      this.iteration = 0;
      this.animationInterval = setInterval(() => {
        this.iteration += 5/6;
        this.displayText = this.encrypt(this.iteration);
        
        if (this.iteration >= this.originalText.length) {
          this.stopAnimation();
          setTimeout(() => {
            this.iteration = 0;
            this.startAnimation();
          }, this.loopDelay);
        }
      }, 50);
    }, this.initDelay);
  }

  private stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopAnimation();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  btnClick(){
    const screen = document.querySelector(".screen") as HTMLElement;
    if (screen) {
      screen.classList.add("active");
      setTimeout(() => {
        screen.style.display = "none";
      }, 1000);
    }
  }
}
