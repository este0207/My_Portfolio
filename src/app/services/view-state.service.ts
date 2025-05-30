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

  toggleHeadOnlyView() {
    this.isHeadOnlyView.next(!this.isHeadOnlyView.value);
  }

  toggleZoomView() {
    this.isZoomedView.next(!this.isZoomedView.value);
  }
} 