import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  notificationData: BehaviorSubject<any> = new BehaviorSubject('');

  
  constructor(
    private httpService: HttpService
  ) { 
  }
  postRegistrationToken(identity,token){

    let body = {
      "identity": identity,
      "token":token
    }
    return this.httpService.post("https://notification-rest.herokuapp.com/api/notify/user/",body)
  }

  changeNotificationSettings(notification1,notification2,notification3){

    let body = {
      "notification_type1": notification1,
      "notification_type2": notification2,
      "notification_type3": notification3,
      "identity": localStorage.getItem("Identity")
    }
    return this.httpService.post("https://notification-rest.herokuapp.com/api/notify/user/settings/",body)

  }
}
