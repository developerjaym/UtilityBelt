import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../model/chat-message';
import { CustomFunctionItem, FunctionInputType } from '../model/function-item';

@Injectable({
  providedIn: 'root'
})
export class RemoteImportService {
  constructor(private http: HttpClient) { }

  importFromServer(conversationId: string): Observable<CustomFunctionItem[]> {
    return this.http.get<ChatMessage>(environment.serverUrl + conversationId)
    .pipe(
      map((message) => message.value)
    );
  }

  exportToServer(text: string): Observable<string> {
    const path = environment.url + "#/import";
    return this.http.post<ChatMessage>(environment.serverUrl, this.createMessage(text))
      .pipe(
        map(message => path + "/" + message.id)
      );
  }

  private createMessage(text: string): ChatMessage {
    return JSON.parse(text);
  }
}
