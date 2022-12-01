import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
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
  public static OUTPUT_SIZE = '285px';
  public static BUTTON_SIZE = '32px';
  public static INPUT_SIZE = '32px;';

  constructor(private sanitizer: DomSanitizer) { }

  buildHtmlFromCustomFunctionItem(item: CustomFunctionItem): SafeHtml {

    let inputs = this.generateInput(item.inputs);
    let button = `<button title="Execute" id="executeButton" onclick="execute()"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="white" d="M3 22v-20l18 10-18 10z"/></svg>EXECUTE FUNCTION</button>`;
    let logArea = `<label class="input-label with-textarea output-area__label" id="logAreaLabel"><span class="output-label__text">Logs</span><textarea class="output logs" readonly id="logArea"></textarea></label>`;
    let resultArea = `<div class="output-area"><button title="Copy the output to your clipboard" class="copy-button" onclick="copyResultsToClipboard()">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 4h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>COPY</button><label id="resultsAreaLabel" class="input-label with-textarea output-area__label"><span class="output-label__text">Results</span><textarea class="output results" readonly id="resultsArea"></textarea></label></div>`;
    let script = `<script>
    function copyResultsToClipboard() {
      const text = document.getElementById('resultsArea').value;
      navigator["clipboard"].writeText(text).then(
        () => log('COPIED'), () => log('Failed to copy to clipboard. Do it yourself.')
      );
    }
  function log(...strings) {
    for(let str of strings) {
      document.getElementById("logArea").value += str + '\\n';
    }
  }
  function print(str) {
    document.getElementById("resultsArea").value += str + '\\n';
  }
  async function execute() {
    // proxy localStorage
    const localStorage = {
      getItem: (key) => window.localStorage.getItem('${item.id}-' + key),
      setItem: (key, value) => window.localStorage.setItem('${item.id}-' + key, value),
      removeItem: (key, value) => window.localStorage.removeItem('${item.id}-' + key),
      clear: () => {
        for(let key of Object.keys(window.localStorage)) {
          if(key.startsWith('${item.id}')) {
            window.localStorage.removeItem(key);
          }
        }

      }
    }

    // proxy sessionStorage
    const sessionStorage = {
      getItem: (key) => window.sessionStorage.getItem('${item.id}-' + key),
      setItem: (key, value) => window.sessionStorage.setItem('${item.id}-' + key, value),
      removeItem: (key, value) => window.sessionStorage.removeItem('${item.id}-' + key),
      clear: () => {}
    };

    // proxy console
    const console = {};
    console.log = log;
    console.error = (...str) => log(...str.map(s => 'ERROR: ' + s));
    console.info = (...str) => log(...str.map(s => 'INFO: ' + s));
    console.debug = (...str) => log(...str.map(s => 'DEBUG: ' + s));
    console.warn = (...str) => log(...str.map(s => 'WARN: ' + s));

    // clear output fields
    if(document.getElementById("logArea")) {
      document.getElementById("logArea").value = '';
    }
    if(document.getElementById("resultsArea")) {
      document.getElementById("resultsArea").value = '';
    }

    let paramArray = [];
    for(let counter = 0; counter < 1_000; counter++) {
      let inputElement = document.getElementById(String(counter));
      if(!inputElement) {
        break;
      }
      paramArray.push(inputElement.value);
    }
    const CORS_URL = "${environment.corsUrl}";
    const outputsElement = Array.from(document.getElementsByClassName("outputs"))[0];
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
  svg {
    margin-right: 4px;
    transform: translateY(2px);
  }
  .copy-button {
    grid-area: only;
    width: fit-content;
    z-index: 2;
    height: fit-content;
    place-self: end;
    align-self: start;
    padding: 6px 12px;
    margin-right: 6px;
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
    border-color: black !important;
    background-color: gold !important;
    color: black !important;
  }
  #executeButton {
    background-color: #5FA300;
    color: white;
    text-shadow: 0px 0px 4px black;
    box-sizing: border-box;
    border-width: 1px;
    border-color: white;
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
    grid-template-columns: 3fr 1fr;
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
  #resultsAreaLabel {
    grid-area: only;
  }
  .output-area__label {
    display: grid;
    grid-template-rows: ${HtmlBuilderService.BUTTON_SIZE} ${HtmlBuilderService.OUTPUT_SIZE};
  }
  .output-label__text {
    align-self: center;
  }
  .results {
    height:  ${HtmlBuilderService.OUTPUT_SIZE};
  }
  .logs {
    height:  ${HtmlBuilderService.OUTPUT_SIZE};
  }
  #executeButton:hover {
    border-color: #5FA300;
    background-color: white;
    color: #5FA300;
    text-shadow: none;
  }
  #executeButton:hover svg path {
    fill: #5FA300;
  }
  #executeButton:active {
    border-color: black !important;
    background-color: gold !important;
    color: black !important;
    text-shadow: none !important;
  }
  #executeButton:active svg path {
    fill: black !important;
  }
  ::selection {
    background-color: rgb(74, 48, 141);
    color: white;
  }
  @media only screen and (max-width: 378px) {
    button {
      font-size: 0 !important;
      column-gap: 0 !important;
    }
    button svg {
      margin-right: 0 !important;
      transform: none !important;
    }
    .big-screen-only {
      display: none;
    }
  }
  </style>`;
    let combined = `${style} ${script} <div class="item"> ${inputs} ${button} <div class="outputs">${resultArea} ${logArea} </div> </div>`;
    return this.sanitizer.bypassSecurityTrustHtml(combined);
  }

  generateInput(
    inputValues: { label: string; type: string; value: string; options?: string }[]
  ): string {
    let inputHtml = `<div class="inputs">`;
    for (let i = 0; i < inputValues.length; i++) {
      inputHtml += `<label class="input-label with-${inputValues[i].type.toLowerCase()}">${inputValues[i].label}`;
      if (inputValues[i].type === FunctionInputType.YES_NO) {
        inputHtml += this.createSelectOption("YES,NO", i, inputValues[i].value);
      } else if(inputValues[i].type === FunctionInputType.SELECT_OPTION) {
        inputHtml += this.createSelectOption(inputValues[i].options, i, inputValues[i].value);
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

  private createSelectOption(options: string, i: number, defaultValue: string): string {
    let selectOption = `<select id="${i}" value="${
      defaultValue
    }">`;
    options.split(',').filter(Boolean).map(s => s.trim()).forEach(
      opt => {
        selectOption += ` <option ${
          opt === defaultValue ? "selected" : ""
        }>${opt}</option>`
      }
    );
    return selectOption + `</select>`
  }
}
