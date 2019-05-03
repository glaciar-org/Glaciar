import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>()
  private channel = new Subject<any>()
  private actions = new Subject<any>()

  constructor() { }

  // ----[Chanel Generico @2]-----------------------
  sendMessage(message: string) {
      this.subject.next({ text: message })
  }

  clearMessage() {
      this.subject.next()
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable()
  }

  // ----[Chanel Generico @1]-----------------------
  sendObject(obj: any) {
    console.info(`MessageService:[Friccion->>]:sendObject(${JSON.stringify(obj)})`)
    this.channel.next(obj)
  }

  clearObject() {
      this.channel.next()
  }

  getObject(): Observable<any> {
      return this.channel.asObservable()
  }


  // ----[Chanel Generico @2]-----------------------
  sendAction(obj: any) {
    console.info(`MessageService:[Friccion->>]:sendAction(${JSON.stringify(obj)})`)
    this.actions.next(obj)
  }

  clearAction() {
      this.actions.next()
  }

  getAction(): Observable<any> {
      return this.actions.asObservable()
  }


}
