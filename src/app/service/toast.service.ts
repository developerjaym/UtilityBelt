import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Toast } from '../model/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSubject: BehaviorSubject<Toast>;
  timeoutNumber: number = 0;
  constructor() {
    this.toastSubject = new BehaviorSubject<Toast>({message: "Welcome", mood: "happy"});
  }
  push(message: Toast): void {
    this.toastSubject.next(message);
  }
  pull(): Observable<Toast> {
    return this.toastSubject.asObservable().pipe(
      tap((value) => window.clearTimeout(this.timeoutNumber)),
      distinctUntilChanged(),
      tap((value) => this.pushEmpty(value))
    );
  }
  private pushEmpty(message: Toast): void {
    if (message.message) {
      this.timeoutNumber = window.setTimeout(() => this.push({message: "", mood: "neutral"}), 2000);
    }
  }
}
