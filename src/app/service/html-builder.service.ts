import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomFunctionItem, FunctionInputType } from '../model/function-item';

@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {

  public static ROW_GAP = '4px';
  public static FONT_SIZE = '16px';
  public static LOGGER_SIZE = '120px';
  public static INPUT_TEXTAREA_SIZE = '240px';
  public static INPUT_TEXTAREA_AND_LABEL_SIZE = '264px';
  public static INPUT_AND_LABEL_SIZE = '46px';
  public static OUTPUT_SIZE = '240px';
  public static BUTTON_SIZE = '28px';
  public static INPUT_SIZE = '28px;'

  constructor(private sanitizer: DomSanitizer) { }

  buildHtmlFromCustomFunctionItem(item: CustomFunctionItem): SafeHtml {

    let inputs = this.generateInput(item.inputs);
    let button = `<button id="executeButton" onclick="execute()">Execute</button>`;
    let logArea = `<textarea class="output logs" readonly id="logArea" placeholder="logs"></textarea>`;
    let resultArea = `<textarea onclick="copyResultsToClipboard()" class="output results" readonly id="resultsArea" placeholder="results"></textarea>`;
    let script = `<script>
    function copyResultsToClipboard() {
      const text = document.getElementById('resultsArea').value;
      navigator["clipboard"].writeText(text).then(
        () => log('Copied ' + text + ' to clipboard successfully.'), () => log('Failed to copy to clipboard. Do it yourself.')
      );
    }
  function log(str) {
    document.getElementById("logArea").value += str + '\\n';
  }
  function print(str) {
    document.getElementById("resultsArea").value += str;
  }
  function execute() {
    document.getElementById("logArea").value = '';
    document.getElementById("resultsArea").value = '';
    let paramArray = [];
    let counter = 0;
    while(true) {
      let inputElement = document.getElementById(String(counter));
      if(!inputElement) {
        break;
      }
      paramArray.push(inputElement.value);
      counter++;
    }
    ${item.function}
  }
  </script>`;
    let style = `<style>
    body {
      margin: 0;
    }
  ::placeholder {
      color: rgba(244, 244, 244, 1);
  }
  #executeButton {
    background-color: rgb(25, 125, 44);
    color: rgba(244, 244, 244, 1);
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    height: ${HtmlBuilderService.BUTTON_SIZE};
    font-size: ${HtmlBuilderService.FONT_SIZE};
  }
  .item {
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    row-gap: ${HtmlBuilderService.ROW_GAP};
  }
  .inputs {
    display: flex;
    flex-direction: column;
    row-gap: ${HtmlBuilderService.ROW_GAP};
  }
  input, select {
    font-size: ${HtmlBuilderService.FONT_SIZE};
    box-sizing: border-box;
    height: ${HtmlBuilderService.INPUT_SIZE};
    border-width: 1px;
    border-radius: 4px;
  }
  .inputs textarea {
    height: ${HtmlBuilderService.INPUT_TEXTAREA_SIZE};
    font-family: monospace;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
    border-width: 1px;
    border-radius: 4px;
  }
  .input-label {
    display: flex;
    flex-direction: column;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
  }
  .output {
    background-color: rgb(9, 9, 9);
    color: rgba(244, 244, 244, 1);
    font-family: monospace;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
  }
  .results {
    height:  ${HtmlBuilderService.OUTPUT_SIZE};
  }
  .logs {
    height:  ${HtmlBuilderService.LOGGER_SIZE};
  }
  .inputs input:hover,.inputs  select:hover,.inputs textarea:hover {
    border-width: 1px;
    border-color: green;
    border-style: solid;
  }
  #executeButton:hover {
    border-width: 1px;
    border-color: rgb(9, 9, 9);
    border-style: solid;
  }
  </style>`;
    let combined = `${style} ${script} <div class="item"> ${inputs} ${button} ${logArea} ${resultArea} </div>`;
    return this.sanitizer.bypassSecurityTrustHtml(combined);
  }

  generateInput(
    inputValues: { label: string; type: string; value: string }[]
  ): string {
    let inputHtml = `<div class="inputs">`;
    for (let i = 0; i < inputValues.length; i++) {
      inputHtml += `<label class="input-label">${inputValues[i].label}`;
      if (inputValues[i].type === FunctionInputType.YES_NO) {
        inputHtml += `<select id="${i}" value="${
          inputValues[i].value
        }"><option ${
          'YES' === inputValues[i].value ? "selected" : ""
        }>YES</option><option ${
          'NO' === inputValues[i].value ? "selected" : ""
        }>NO</option></select>`;
      } else if (inputValues[i].type === FunctionInputType.TEXTAREA) {
        inputHtml += `<textarea spellcheck="false" class="input-textarea" id="${i}" value="${inputValues[i].value}"></textarea>`;
      } else if (inputValues[i].type === FunctionInputType.NUMBER) {
        inputHtml += `<input type="number" id="${i}" value="${inputValues[i].value}">`;
      } else if (inputValues[i].type === FunctionInputType.DATE) {
        inputHtml += `<input type="date" id="${i}" value="${inputValues[i].value}">`;
      } else if (inputValues[i].type === FunctionInputType.TEXTFIELD) {
        inputHtml += `<input type="text" id="${i}" value="${inputValues[i].value}">`;
      }
      inputHtml += `</label>`;
    }
    inputHtml += `</div>`;
    return inputHtml;
  }
}
