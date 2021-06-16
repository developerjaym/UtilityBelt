import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomFunctions } from '../data/custom-functions';
import { CustomFunctionItem } from '../model/function-item';

@Injectable({
  providedIn: 'root',
})
export class CustomFunctionService {
  static CUSTOM_FUNCTION_KEY = 'custom-functions';
  customItems = CustomFunctions.items;
  lastSearchTerm = '';

  private subject: BehaviorSubject<CustomFunctionItem[]> = new BehaviorSubject<
    CustomFunctionItem[]
  >(this.customItems);

  constructor() {
    this.customItems.unshift(...this.load());
    this.subject.next(this.customItems);
  }

  save(item: CustomFunctionItem): void {
    this.customItems.unshift(item);
    localStorage.setItem(CustomFunctionService.CUSTOM_FUNCTION_KEY, JSON.stringify(this.customItems.filter(i => i.author !== 'UtilityBelt')));
    this.search(this.lastSearchTerm); // Searching like this will restore the home page to its earlier state
  }

  update(updatedItem: CustomFunctionItem): void {
    // Remove the item from the array and then save it back into the array
    this.customItems = this.customItems.filter(item => item.id !== updatedItem.id);
    this.save(updatedItem);
  }

  load(): CustomFunctionItem[] {
    return JSON.parse(localStorage.getItem(CustomFunctionService.CUSTOM_FUNCTION_KEY)) || [];
  }

  get(id: number): CustomFunctionItem {
    return this.customItems.find(item => item.id === id);
  }

  delete(id: number) {
    this.customItems = this.customItems.filter(item => item.id !== id);
    localStorage.setItem(CustomFunctionService.CUSTOM_FUNCTION_KEY, JSON.stringify(this.customItems.filter(i => i.author === 'SELF')));
    this.search(this.lastSearchTerm); // Searching like this will restore the home page to its earlier state
  }

  subscribe(): Observable<CustomFunctionItem[]> {
    return this.subject.asObservable();
  }

  search(term: string): void {
    this.lastSearchTerm = term;
    term = term.toUpperCase();
    let matchingItems = this.customItems.filter((item) => {
      return (
        item.tags
          .split(',')
          .map((tag) => tag.trim().toUpperCase())
          .filter(Boolean)
          .includes(term) || item.title.toUpperCase().includes(term)
      );
    });
    this.subject.next(matchingItems);
  }


}
