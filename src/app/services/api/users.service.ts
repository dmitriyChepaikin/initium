import { Injectable } from '@angular/core'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UsersType} from "../../types/users.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getManyUsers(): Observable<UsersType> {
    const url = `https://test-data.directorix.cloud/task1`
    return this.http.get<UsersType>(url)
  }
}
