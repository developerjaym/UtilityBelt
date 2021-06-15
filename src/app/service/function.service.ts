import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Functions } from '../data/functions';
import { FunctionItem } from '../model/function-item';

@Injectable({
  providedIn: 'root',
})
export class FunctionService {

  items = Functions.items;

  private subject: BehaviorSubject<FunctionItem[]> = new BehaviorSubject<
    FunctionItem[]
  >(this.items);

  constructor() {}

  subscribe(): Observable<FunctionItem[]> {
    return this.subject.asObservable();
  }

  search(term: string): void {
    term = term.toUpperCase();
    let matchingItems = this.items.filter((item) => {
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
