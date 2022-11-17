import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

// @ViewChild('sendMessageForm') form:ElementRef;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'WebSockets';
  header: String = 'Header';
  footer: String = 'Footer';

  // current text in message input
  messageInputValue: String = '';

  constructor(public form:ElementRef, private socket: Socket) {
    this.form.nativeElement;
  }

  ngAfterViewInit() {
    console.log('fired: ', this.socket);
    this.socket.connect();
    this.setSocketListeners();
    this.socket.emit('message', '123');
    console.log('here');
  }

  private setSocketListeners(): void {
    this.socket.on('new-message', this.handleNewMessage);
  }

  public handleFormSubmit(event: Event): void {
    event.preventDefault();
    console.log('form submited: ', this.messageInputValue);
  }

  private handleNewMessage(message: String): void {
    console.log('new message arrived: ', message)
  }


}