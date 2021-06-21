import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionInputType } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  Types = Object.keys(FunctionInputType);
  tested = false;
  testing = false;
  creating = true;
  confirmDelete = false;
  viewJson = false;

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
      function: [`log('hi')`, Validators.required],
      inputs: this.fb.array([]),
    });
    this.activatedRoute.params.subscribe((map) => {
      if (map.id) {
        // Updating... patch the existing value into the form
        this.patchForm(map.id);
        this.creating = false;
      } else {
        // Creating... prepare an input form group
        this.addInput();
        this.creating = true;
      }
    });
    this.form.valueChanges.subscribe(newValue => {
      this.tested = false;
      this.testing = false;
      this.viewJson = false;
    });
  }

  patchForm(id: string) {
    let item = this.customFunctionService.get(Number(id));
    this.form.patchValue(item);
    for (let i = 0; i < item.inputs.length; i++) {
      this.addInput();
      this.inputs.at(i).patchValue(item.inputs[i]);
    }
  }

  get inputs() {
    return this.form.get('inputs') as FormArray;
  }

  addInput() {
    this.inputs.push(
      this.fb.group({
        label: ['', Validators.required],
        type: ['', Validators.required],
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
  }

  destroy() {
    this.customFunctionService.delete(this.form.value.id);
    this.router.navigate(['']);
  }
}
