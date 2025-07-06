import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  private isHeadOnlyView = new BehaviorSubject<boolean>(false);
  isHeadOnlyView$ = this.isHeadOnlyView.asObservable();

  private isZoomedView = new BehaviorSubject<boolean>(false);
  isZoomedView$ = this.isZoomedView.asObservable();

  private isContactView = new BehaviorSubject<boolean>(false);
  isContactView$ = this.isContactView.asObservable();

  // Méthode pour réinitialiser tous les états
  resetAllStates() {
    this.isHeadOnlyView.next(false);
    this.isZoomedView.next(false);
    this.isContactView.next(false);
  }

  // Méthode pour activer une vue spécifique ou la désactiver si déjà active
  activateView(viewType: 'head' | 'zoom' | 'contact') {
    // Vérifier si la vue demandée est déjà active
    const isAlreadyActive = this.isViewActive(viewType);
    
    // Si elle est déjà active, la désactiver (dézoom)
    if (isAlreadyActive) {
      this.resetAllStates();
      return;
    }
    
    // Sinon, activer la nouvelle vue
    this.resetAllStates();
    
    switch (viewType) {
      case 'head':
        this.isHeadOnlyView.next(true);
        break;
      case 'zoom':
        this.isZoomedView.next(true);
        break;
      case 'contact':
        this.isContactView.next(true);
        break;
    }
  }

  // Méthode pour vérifier si une vue est active
  isViewActive(viewType: 'head' | 'zoom' | 'contact'): boolean {
    switch (viewType) {
      case 'head':
        return this.isHeadOnlyView.value;
      case 'zoom':
        return this.isZoomedView.value;
      case 'contact':
        return this.isContactView.value;
      default:
        return false;
    }
  }

  toggleHeadOnlyView() {
    // Désactiver les autres vues avant d'activer celle-ci
    this.isZoomedView.next(false);
    this.isContactView.next(false);
    this.isHeadOnlyView.next(!this.isHeadOnlyView.value);
  }

  toggleZoomView() {
    // Désactiver les autres vues avant d'activer celle-ci
    this.isHeadOnlyView.next(false);
    this.isContactView.next(false);
    this.isZoomedView.next(!this.isZoomedView.value);
  }

  toggleContactView() {
    // Désactiver les autres vues avant d'activer celle-ci
    this.isHeadOnlyView.next(false);
    this.isZoomedView.next(false);
    this.isContactView.next(!this.isContactView.value);
  }
} 