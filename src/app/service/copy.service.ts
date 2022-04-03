import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor(private toastService: ToastService) { }

  copy(content: string): void {
    if( navigator?.clipboard?.writeText(content)) {
      this.toastService.push({message: "Copied", mood: "happy"});
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
      this.toastService.push({message: "Copied", mood: "happy"});
    } catch (err) {
      console.error(err.name, err.message);
      this.toastService.push({message: "Failed to copy", mood: "sad"})
    }
  }
}
