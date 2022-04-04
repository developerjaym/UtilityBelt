import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input()
  icon: "delete" | "cancel" | "save" | "edit" | "copy" | "expand" | "collapse" | "help" | "test" | "run" | "add" | "share";
  svg: SafeHtml = '';
  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.httpClient.get('assets/icon/' + this.icon + '.svg', { responseType: 'text' }).subscribe(svg => this.svg = this.domSanitizer.bypassSecurityTrustHtml(svg));
  }

}
