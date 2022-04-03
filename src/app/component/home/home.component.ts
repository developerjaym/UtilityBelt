import { Component, OnInit } from '@angular/core';
import { CustomFunctionItem } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalVisible = false;
  customItems: CustomFunctionItem[];
  dataList: string[] = [];
  constructor(private customFunctionService: CustomFunctionService) { }

  ngOnInit(): void {
    this.customItems = this.customFunctionService.search('');
  }

  search(event): void {
    this.customItems = this.customFunctionService.search(event.target.value);
  }

  loadDatalist(): void {
    this.dataList = this.customFunctionService.search('').map(item => item.title);
  }
}
