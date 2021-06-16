import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFunctionService } from 'src/app/service/custom-function.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  testing = false;
  tested = false;
  importedJson = '';
  form;

  constructor(private customFunctionService: CustomFunctionService, private fb: FormBuilder, private router: Router) {
    this.form =  this.fb.group({
      importedJson: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  save() {
    const item = JSON.parse(this.form.value.importedJson);
    item.author = "OTHER";
    item.id = new Date().getTime();
    this.customFunctionService.save(item);
    this.router.navigate(['']);
  }

  getValue() {
    return JSON.parse(this.form.value.importedJson);
  }
}
