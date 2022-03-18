import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomFunctionItem, FunctionInputType } from '../model/function-item';

@Injectable({
  providedIn: 'root'
})
export class HtmlBuilderService {

  public static ROW_GAP = '4px';
  public static FONT_SIZE = '14px';
  public static INPUT_TEXTAREA_SIZE = '266px';
  public static INPUT_TEXTAREA_AND_LABEL_SIZE = '285px';
  public static INPUT_AND_LABEL_SIZE = '49px';
  public static OUTPUT_SIZE = '250px';
  public static BUTTON_SIZE = '32px';
  public static INPUT_SIZE = '32px;'

  constructor(private sanitizer: DomSanitizer) { }

  buildHtmlFromCustomFunctionItem(item: CustomFunctionItem): SafeHtml {

    let inputs = this.generateInput(item.inputs);
    let button = `<button id="executeButton" onclick="execute()">EXECUTE FUNCTION</button>`;
    let logArea = `<textarea class="output logs" readonly id="logArea" placeholder="logs"></textarea>`;
    let resultArea = `<div class="output-area"><button class="copy-button" onclick="copyResultsToClipboard()">COPY</button><textarea class="output results" readonly id="resultsArea" placeholder="results"></textarea></div>`;
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
    // proxy localStorage
    const localStorage = {
      getItem: (key) => window.localStorage.getItem('${item.id}-' + key),
      setItem: (key, value) => window.localStorage.setItem('${item.id}-' + key, value)
    }

    // no sessionStorage yet
    const sessionStorage = {};

    // proxy console
    const console = {};
    console.log = log;
    console.error = (str) => log('ERROR: ' + str);
    console.info = (str) => log('INFO: ' + str);
    console.debug = (str) => log('DEBUG: ' + str);
    console.warn = (str) => log('WARN: ' + str);

    // clear output fields
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
      color: white;
  }
  .output-area {
    display: grid;
    grid-template-areas: 'only';
  }
  .copy-button {
    grid-area: only;
    width: fit-content;
    z-index: 2;
    height: fit-content;
    place-self: end;
    align-self: start;
    padding: 6px 12px;
    margin-right: 20px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    background-color: white;
    color: black;
  }
  .copy-button:hover {
    background-color: rgb(236, 236, 236);
  }
  .copy-button:active {
    border-color: indigo;
    background-color: white;
    color: indigo;
  }
  #executeButton {
    background-color: rgb(5, 99, 60);
    color: white;
    box-sizing: border-box;
    border-width: 1px;
    border-color: black;
    border-style: solid;
    border-radius: 4px;
    height: ${HtmlBuilderService.BUTTON_SIZE};
    font-size: ${HtmlBuilderService.FONT_SIZE};
    padding: 6px 12px;
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
  .outputs {
    display: grid;
    grid-template-columns: min(75%, calc(100% - 100px)) max(25%, 100px);
  }
  input, select {
    font-size: ${HtmlBuilderService.FONT_SIZE};
    box-sizing: border-box;
    height: ${HtmlBuilderService.INPUT_SIZE};
    border-width: 1px;
    border-radius: 4px;
  }
  input, select, .inputs textarea {
    padding: 6px;
  }
  .inputs textarea {
    height: ${HtmlBuilderService.INPUT_TEXTAREA_SIZE};
    font-family: monospace;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
    border-width: 1px;
    border-radius: 4px;
  }
  .with-textarea {
    height: ${HtmlBuilderService.INPUT_TEXTAREA_AND_LABEL_SIZE};
  }
  .input-label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
  }
  .output {
    background-color: black;
    color: white;
    font-family: monospace;
    font-size:  ${HtmlBuilderService.FONT_SIZE};
  }
  .results {
    height:  ${HtmlBuilderService.OUTPUT_SIZE};
    grid-area: only;
  }
  .logs {
    height:  ${HtmlBuilderService.OUTPUT_SIZE};
  }
  .inputs input:hover,.inputs  select:hover,.inputs textarea:hover {
    border-width: 1px;
    border-color: green;
    border-style: solid;
  }
  #executeButton:hover {
    border-color: rgb(5, 99, 60);
    background-color: white;
    color: rgb(5, 99, 60);
  }
  #executeButton:active {
    border-color: indigo;
    background-color: white;
    color: indigo;
  }
  </style>`;
    let combined = `${style} ${script} <div class="item"> ${inputs} ${button} <div class="outputs">${resultArea} ${logArea} </div> </div>`;
    return this.sanitizer.bypassSecurityTrustHtml(combined);
  }

  generateInput(
    inputValues: { label: string; type: string; value: string }[]
  ): string {
    let inputHtml = `<div class="inputs">`;
    for (let i = 0; i < inputValues.length; i++) {
      inputHtml += `<label class="input-label with-${inputValues[i].type.toLowerCase()}">${inputValues[i].label}`;
      if (inputValues[i].type === FunctionInputType.YES_NO) {
        inputHtml += `<select id="${i}" value="${
          inputValues[i].value
        }"><option ${
          'YES' === inputValues[i].value ? "selected" : ""
        }>YES</option><option ${
          'NO' === inputValues[i].value ? "selected" : ""
        }>NO</option></select>`;
      } else if (inputValues[i].type === FunctionInputType.TEXTAREA) {
        inputHtml += `<textarea spellcheck="false" class="input-textarea" id="${i}">${inputValues[i].value}</textarea>`;
      } else  {
        inputHtml += `<input type="${inputValues[i].type}" id="${i}" value="${inputValues[i].value}">`;
      }
      inputHtml += `</label>`;
    }
    inputHtml += `</div>`;
    return inputHtml;
  }
}
