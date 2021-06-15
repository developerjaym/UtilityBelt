import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFunctionItem, FunctionItem } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';
import { FunctionService } from 'src/app/service/function.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items$: Observable<FunctionItem[]>;
  customItems$: Observable<CustomFunctionItem[]>;

  constructor(private functionService: FunctionService, private customFunctionService: CustomFunctionService) { }

  ngOnInit(): void {
    this.items$ = this.functionService.subscribe();
    this.customItems$ = this.customFunctionService.subscribe();
  }

  search(event): void {
    let searchTerm = event.target.value;
    this.functionService.search(searchTerm);
    this.customFunctionService.search(searchTerm);
  }

}
