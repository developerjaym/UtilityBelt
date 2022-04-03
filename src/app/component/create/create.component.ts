import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { FunctionInputType } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  private static DEFAULT_FUNCTION = `// paramArray is an array containing the values from the form
// in the default example, date of birth is the first parameter
let dob = paramArray[0];
try{
  let differenceInDays = Math.floor((new Date() - new Date(dob)) / 1000 / 60 / 60 / 24);
  // output the function results on the left side of the output pane
  // the user can copy this output to their clipboard
  print("You were born " + differenceInDays + " days ago");
  // log(string) will output the given string on the right side of the output pane
  log("SUCCESS");
} catch(e) { log(e); }
`;

  form: FormGroup;
  Types = Object.keys(FunctionInputType);
  tested = false;
  testing = false;
  creating = true;
  confirmDelete = false;

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: 'main.js',
    value: ``,
  };

  options = {
    contextmenu: false,
    minimap: {
      enabled: false,
    },
  };

  constructor(
    private fb: FormBuilder,
    private customFunctionService: CustomFunctionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [new Date().getTime()],
      title: ['', Validators.required],
      subtitle: [''],
      tags: [''],
      author: ['SELF'],
      function: ['', Validators.required],
      inputs: this.fb.array([]),
    });
    this.activatedRoute.params.subscribe((map) => {
      if (map.id) {
        // Updating... patch the existing value into the form
        this.patchForm(map.id);
        this.creating = false;
      } else {
        // Creating... prepare an input form group
        this.form.patchValue({ function: CreateComponent.DEFAULT_FUNCTION });
        this.codeModel.value = CreateComponent.DEFAULT_FUNCTION;

        this.addInput();
        this.creating = true;
      }
    });
    this.form.valueChanges.subscribe((newValue) => {
      this.tested = false;
      this.testing = false;
    });
  }

  patchForm(id: string) {
    let item = this.customFunctionService.get(Number(id));
    this.codeModel.value = item.function;
    this.form.patchValue(item);
    for (let i = 0; i < item.inputs.length; i++) {
      this.addInput();
      this.inputs.at(i).patchValue(item.inputs[i]);
    }
  }

  get inputs() {
    return this.form.get('inputs') as FormArray;
  }

  onCodeChanged(event): void {
    this.form.get('function').patchValue(event);
  }

  addInput() {
    this.inputs.push(
      this.fb.group({
        label: ['Date of Birth', Validators.required],
        type: [FunctionInputType.DATE, Validators.required],
        value: [''],
      })
    );
  }

  removeInput(i: number) {
    this.inputs.removeAt(i);
  }

  save() {
    this.customFunctionService.save(this.form.value);
    this.router.navigate(['']);
  }

  update() {
    this.customFunctionService.update(this.form.value);
    this.router.navigate(['']);
  }

  test() {
    this.tested = true;
    this.testing = !this.testing;
    window.scrollTo(0, 0);
  }

  destroy() {
    this.customFunctionService.delete(this.form.value.id);
    this.router.navigate(['']);
  }
}
