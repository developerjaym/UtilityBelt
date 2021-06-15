import { Component, Input, OnInit } from '@angular/core';
import {
  CustomFunctionItem
} from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';
import { HtmlBuilderService } from 'src/app/service/html-builder.service';

@Component({
  selector: 'app-custom-function-item',
  templateUrl: './custom-function-item.component.html',
  styleUrls: ['./custom-function-item.component.css'],
})
export class CustomFunctionItemComponent implements OnInit {
  @Input()
  item: CustomFunctionItem;

  sd;

  constructor(private htmlBuilder: HtmlBuilderService) {}

  ngOnInit(): void {
    this.sd = this.htmlBuilder.buildHtmlFromCustomFunctionItem(this.item);
  }
}
