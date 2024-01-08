import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private dataTest: string = '';
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.dataModel.subscribe((p) => {
      console.log(p);
    });
  }
}
