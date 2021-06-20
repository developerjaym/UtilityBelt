import { Component, Input, OnInit } from '@angular/core';
import {
  CustomFunctionItem, FunctionInputType
} from 'src/app/model/function-item';
import { HtmlBuilderService } from 'src/app/service/html-builder.service';

@Component({
  selector: 'app-custom-function-item',
  templateUrl: './custom-function-item.component.html',
  styleUrls: ['./custom-function-item.component.css'],
})
export class CustomFunctionItemComponent implements OnInit {
  @Input()
  item: CustomFunctionItem;

  @Input()
  testing = false;

  sd;

  constructor(private htmlBuilder: HtmlBuilderService) {}

  ngOnInit(): void {
    this.sd = this.htmlBuilder.buildHtmlFromCustomFunctionItem(this.item);
  }

  calcHeight(): string {
    let heightString = `calc(`;
    heightString += `${HtmlBuilderService.ROW_GAP} + ${HtmlBuilderService.BUTTON_SIZE} + ${HtmlBuilderService.ROW_GAP} + ${HtmlBuilderService.OUTPUT_SIZE} + ${HtmlBuilderService.ROW_GAP}`;
    for(let i = 0; i < this.item.inputs.length; i++) {
      if(this.item.inputs[i].type === FunctionInputType.TEXTAREA) {
        heightString += ` + ${HtmlBuilderService.INPUT_TEXTAREA_AND_LABEL_SIZE}`;
      }
      else {
        heightString += ` + ${HtmlBuilderService.INPUT_AND_LABEL_SIZE}`;
      }
      heightString += ` + ${HtmlBuilderService.ROW_GAP}`;
    }
    heightString += ` + ${HtmlBuilderService.ROW_GAP})`;

    return heightString;
  }
}
