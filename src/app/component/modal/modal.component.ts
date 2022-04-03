import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input()
  title: string = '';

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.onClose.emit(true);
  }
}
