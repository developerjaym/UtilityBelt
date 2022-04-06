import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { CustomFunctionItem } from 'src/app/model/function-item';
import { CustomFunctionService } from 'src/app/service/custom-function.service';
import { RemoteImportService } from 'src/app/service/remote-import.service';

@Component({
  selector: 'app-import-helper',
  templateUrl: './import-helper.component.html',
  styleUrls: ['./import-helper.component.css'],
})
export class ImportHelperComponent implements OnInit {
  newItems: ImportItem<CustomFunctionItem>[] = [];
  helpModalVisible = false;
  errorModalVisible = false;
  theme = 'vs-dark';

  options = {
    readonly: true,
    contextmenu: false,
    minimap: {
      enabled: false,
    },
  };
  constructor(
    private importService: RemoteImportService,
    private activatedRoute: ActivatedRoute,
    private customFunctionService: CustomFunctionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const conversationId = this.activatedRoute.snapshot.params['conversationId'];

    this.importService
      .importFromServer(conversationId)
      .subscribe((toImport) => this.display(toImport), (err) => this.errorModalVisible = true);
  }

  save(): void {
    this.newItems.filter(item => item.checked).forEach((item) => {
      item.item.author = 'OTHER';
      item.item.id = new Date().getTime();
      this.customFunctionService.save(item.item);
    });
    this.router.navigate(['']);
  }

  onErrorModalClose(): void {
    this.router.navigate(['']);
  }

  private display(toImport: CustomFunctionItem[]) {
    this.newItems = toImport.map(item => new ImportItem<CustomFunctionItem>(item));
  }
}

class ImportItem<T> {
  checked: boolean;
  expanded: boolean;
  item: T;
  constructor(item) {
    this.item = item;
    this.checked = true;
    this.expanded = false;
  }
}
