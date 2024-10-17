import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new BehaviorSubject<{ content: string; severity: string } | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showError(message: string) {
    this.notificationSubject.next({ content: message, severity: 'error' });
  }

  showSuccess(message: string) {
    this.notificationSubject.next({ content: message, severity: 'success' });
  }

  clearNotification() {
    this.notificationSubject.next(null);
  }
}
