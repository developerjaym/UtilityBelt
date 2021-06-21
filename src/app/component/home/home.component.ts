import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFunctionItem } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customItems$: Observable<CustomFunctionItem[]>;

  constructor(private customFunctionService: CustomFunctionService) { }

  ngOnInit(): void {
    this.customItems$ = this.customFunctionService.subscribe();
  }

  search(event): void {
    let searchTerm = event.target.value;
    this.customFunctionService.search(searchTerm);
  }

}
