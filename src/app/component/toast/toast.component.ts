import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Toast } from 'src/app/model/toast';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  message$: Observable<Toast>;
  toast: Toast;
  subscription: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.pull().subscribe(
      (toast) => this.toast = toast
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
