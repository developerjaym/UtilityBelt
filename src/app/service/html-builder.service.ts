import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomFunctionItem, FunctionInputType } from '../model/function-item';

@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {

  constructor(private sanitizer: DomSanitizer) { }

  buildHtmlFromCustomFunctionItem(item: CustomFunctionItem): SafeHtml {

    let inputs = this.generateInput(item.inputs);
    let button = `<button id="executeButton" onclick="execute()">Execute</button>`;
    let logArea = `<textarea class="output logs" disabled id="logArea">Logs</textarea>`;
    let resultArea = `<textarea class="output results" disabled id="resultsArea">Results</textarea>`;
    let script = `<script>
  function log(str) {
    document.getElementById("logArea").value += str;
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
  #executeButton {
    background-color: green;
    color: white;
  }
  .item {
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    row-gap: 4px;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }
  input {
    font-size: 16px;
  }
  .inputs textarea {
    height: 24vh;
    font-family: monospace;
    font-size: 16px;
  }
  .input-label {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }
  .output {
    background-color: black;
    color: white;
    font-family: monospace;
    font-size: 16px;
  }
  .results {
    height: 24vh;
  }
  .logs {
    height: 12vh;
  }
  </style>`;
    let combined = `${style} ${script} <div class="item"> ${inputs} ${button} ${logArea} ${resultArea} </div>`;
    return this.sanitizer.bypassSecurityTrustHtml(combined);
  }

  generateInput(
    inputValues: { label: string; type: string; value: string }[]
  ): string {
    let inputHtml = `<div class="inputs">Inputs`;
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
        inputHtml += `<textarea id="${i}" value="${inputValues[i].value}"></textarea>`;
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
