import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CopyService } from 'src/app/service/copy.service';
import { CustomFunctionService } from 'src/app/service/custom-function.service';
import { RemoteImportService } from 'src/app/service/remote-import.service';

@Component({
  selector: 'app-export-link',
  templateUrl: './export-link.component.html',
  styleUrls: ['./export-link.component.css'],
})
export class ExportLinkComponent implements OnInit {
  link = 'Loading...';
  loading = true;
  constructor(
    private exportService: RemoteImportService,
    private activatedRoute: ActivatedRoute,
    private customFunctionService: CustomFunctionService,
    private copyService: CopyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((map) => {
      if (map.id) {
        const item = this.customFunctionService.get(Number(map.id));
        this.exportService
          .exportToServer(JSON.stringify([item], null, 2))
          .subscribe((link) => {
            this.link = link;
            this.loading = false;
          });
      }
    });
  }

  copy(): void {
    this.copyService.copy(this.link);
  }
}
