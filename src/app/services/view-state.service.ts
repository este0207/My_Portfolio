import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  private isHeadOnlyView = new BehaviorSubject<boolean>(false);
  isHeadOnlyView$ = this.isHeadOnlyView.asObservable();

  toggleHeadOnlyView() {
    this.isHeadOnlyView.next(!this.isHeadOnlyView.value);
  }
} 