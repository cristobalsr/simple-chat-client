import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";
import { MdInputContainer, MdInputModule, MdIcon}  from '@angular/material';

export class Message {
  userId: string;
  text: string;
}


const MESSAGES: Message[] = [
  { userId: 'user', text: 'Mr. Nice' },
  { userId: 'bot', text: 'Narco' },
  { userId: 'user', text: 'Bombasto' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})



export class AppComponent implements OnInit {
  messages = [];
  client = new ApiAiClient({accessToken: '177c2b972c69460290b47b3eb62a6fb0', streamClientClass: ApiAiStreamClient});
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit(): void {
    console.log("Inicializando ...");
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }


  onClick(texto): void {
    this.messages.push({text:texto.value,userId:'user'});
    this.client
          .textRequest(texto.value)
          .then((response) => {
            console.log(response.result.fulfillment.speech)
            this.messages.push({text:response.result.fulfillment.speech, userId:'bot'})
          })
          .catch((error) => {console.log("error")})
    texto.value="";
    
  }

  keyDownFunction(event, texto) {
    if(event.keyCode == 13) {
      console.log(event);
      this.onClick(texto);
    }
  }




}

