import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _dataMode: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private dataStore: { data: any } = { data: {} };
  readonly dataModel = this._dataMode.asObservable();

  apiUrl: string = 'http://localhost:8080/api/teacher/get';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.streamData();
  }

  getData() {
    this.http.get(`${this.apiUrl}`).subscribe((data) => {
      this.dataStore.data = data;
      this._dataMode.next(Object.assign({}, this.dataStore).data);
    });
  }

  stramURL: string = 'http://localhost:8080/gs-guide-websocket';
  client: any;
  streamMessage: any;

  streamData() {
    let ws = new SockJS(this.stramURL);
    this.client = Stomp.over(ws);
    let that = this;

    this.client.connect({}, function (frame: any) {
      that.client.subscribe('/topic1', (message: any) => {
        if (message.body) {
          that.streamMessage = message.body;
          that.dataStore.data = JSON.parse(that.streamMessage);
          that._dataMode.next(Object.assign({}, that.dataStore.data));
        }
      });
    });
  }
}
