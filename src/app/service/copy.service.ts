import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor() { }

  copy(content: string): void {
    if( navigator?.clipboard?.writeText(content)) {
      return;
    }
    this.write(content);
  }

  private async write(str): Promise<void> {
    try {
      const blob = new Blob([str], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

    } catch (err) {
      console.error(err.name, err.message);
    }
  }
}
