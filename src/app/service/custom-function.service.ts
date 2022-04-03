import { Injectable } from '@angular/core';
import { CustomFunctions } from '../data/custom-functions';
import { CustomFunctionItem } from '../model/function-item';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class CustomFunctionService {
  static CUSTOM_FUNCTION_KEY = 'custom-functions';

  constructor(private toastService: ToastService) {}

  save(item: CustomFunctionItem): void {
    localStorage.setItem(
      CustomFunctionService.CUSTOM_FUNCTION_KEY,
      JSON.stringify([item, ...this.loadFromStorage()])
    );
    this.toastService.push({message: "SAVED", mood: "happy"});
  }

  update(updatedItem: CustomFunctionItem): void {
    localStorage.setItem(
      CustomFunctionService.CUSTOM_FUNCTION_KEY,
      JSON.stringify(
        this.loadFromStorage().map((i) =>
          i.id === updatedItem.id ? updatedItem : i
        )
      )
    );
    this.toastService.push({message: "SAVED", mood: "happy"});
  }

  get(id: number): CustomFunctionItem {
    return [...this.loadFromStorage(), ...CustomFunctions.items].find(
      (item) => item.id === id
    );
  }

  delete(id: number) {
    localStorage.setItem(
      CustomFunctionService.CUSTOM_FUNCTION_KEY,
      JSON.stringify(this.loadFromStorage().filter((i) => i.id !== id))
    );
    this.toastService.push({message: "DELETED", mood: "sad"});
  }

  search(term: string): CustomFunctionItem[] {
    const splitTerms = term
      .toUpperCase()
      .split(',')
      .map((t) => t.toUpperCase().trim())
      .filter(Boolean);
    return [...this.loadFromStorage(), ...CustomFunctions.items].filter(
      (item) => {
        return (
          item.tags
            .split(',')
            .map((tag) => tag.trim().toUpperCase())
            .filter(Boolean)
            .some((tag) => splitTerms.includes(tag)) ||
          splitTerms.some((t) => item.title.toUpperCase().includes(t)) ||
          splitTerms.length === 0
        );
      }
    );
  }

  private loadFromStorage(): CustomFunctionItem[] {
    return (
      JSON.parse(
        localStorage.getItem(CustomFunctionService.CUSTOM_FUNCTION_KEY)
      ) || []
    );
  }
}
