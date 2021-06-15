import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FunctionInputType, FunctionItem } from 'src/app/model/function-item';

@Component({
  selector: 'app-function-item',
  templateUrl: './function-item.component.html',
  styleUrls: ['./function-item.component.css']
})
export class FunctionItemComponent implements OnInit {

  @Input()
  item: FunctionItem;

  @ViewChild("logger") logger: ElementRef;
  @ViewChild("output") output: ElementRef;

  Types = FunctionInputType;

  constructor() { }

  ngOnInit(): void {
  }

  executeFunction(): void {
    this.logger.nativeElement.textContent = "";
    this.output.nativeElement.textContent = "";
    this.item.function((str) => this.logger.nativeElement.textContent += str + '\n', (str) => this.output.nativeElement.textContent = str)(this.item.inputs.map(i => i.value));
  }

  doTextareaValueChange(ev, index: number) {
      this.item.inputs[index].value = ev.target.value;
  }

}
