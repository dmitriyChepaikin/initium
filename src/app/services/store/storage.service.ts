import { Injectable } from '@angular/core'
import {UserType} from "../../types/users.model";

const storeKey = 'storageData'

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  clear(): void {
    localStorage.clear()
  }

  public setData(data: UserType[]): void {
    localStorage.setItem(storeKey, JSON.stringify(data))
  }

  public getStorageData(): UserType[] {
    const storageData = localStorage.getItem(storeKey);
    if (storageData) {
      try {
        const parsedData = JSON.parse(storageData);
        if (Array.isArray(parsedData)) {
          return parsedData;
        }
      } catch (e) {
        console.error('Ошибка при чтении данных:', e);
      }
    }
    return []
  }
}
