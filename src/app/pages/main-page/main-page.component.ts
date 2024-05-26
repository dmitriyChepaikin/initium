import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../services/store/storage.service";
import {UsersService} from "../../services/api/users.service";
import {UserType} from "../../types/users.model";
import {SelectionModel} from "@angular/cdk/collections";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {MainPageClientModalComponent} from "../../components/main-page-client-modals/main-page-client-modal.component";
import {
  MainPageClientModalDeleteComponent
} from "../../components/main-page-client-modals/main-page-client-modal-delete.component";


type ReturnedModalValues = { item: UserType | null, index: number | null }

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [
    MatToolbar,
    MatCheckbox,
    MatIcon,
    MatTable,
    MatIconButton,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  usersData: UserType[] = []

  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone'];
  selection = new SelectionModel<UserType>(true, []);

  constructor(
    private storageService: StorageService,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {
  }

  toggleCreateEditDialog(item?: UserType, index?: number) {
    const dialogRef = this.dialog.open(MainPageClientModalComponent, {
      // Класс стилей
      panelClass: 'client-add-modal',
      // Входные данные модального окна
      data: {item: item || null, index: index || null}
    });

    // Подписка на событие закрытия модального окна
    dialogRef.afterClosed().subscribe((result: ReturnedModalValues) => {
      if (result) {
        const {item, index} = result

        item && index && this.editUserData(item, index)
        item && !index && this.addUserData(item)
      }
    });
  }
  toggleDeleteDialog() {
    const dialogRef = this.dialog.open(MainPageClientModalDeleteComponent, {
      panelClass: 'client-add-modal',
      // Входные данные модального окна
      data: this.selection.selected.length
    });

    // Подписка на событие закрытия модального окна
    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      isDelete && this.deleteSelected()
    });
  }

  isAllSelected() {
    return this.selection.selected.length === this.usersData.length;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.usersData.forEach(row => this.selection.select(row));
  }

  setLocalStorageData(data?: UserType[]) {
    // Установка значения в локал стор
    this.storageService.setData(data || this.usersData || [])
  }

  editUserData(user: UserType, index: number) {
    if (index >= 0 && index < this.usersData.length) {
      // Создаем новый массив, с изменением пользователем
      this.usersData = this.usersData.map((item, idx) => idx === index ? user : item)
      // Обновляем данные в localStorage
      this.setLocalStorageData()
    }
  }

  addUserData(user: UserType) {
    // Создаем новый массив, с добавленным пользователем
    this.usersData = [...this.usersData, user]
    // Обновляем данные в localStorage
    this.setLocalStorageData()
  }

  deleteSelected() {
    // Создаем новый массив, который не содержит выбранных пользователей
    const filteredUsersData = this.usersData.filter(user => !this.selection.isSelected(user));
    // Обновляем данные в localStorage
    this.setLocalStorageData(filteredUsersData)
    // Обновляем данные в компоненте
    this.usersData = filteredUsersData;
    // Очищаем выделение строки в таблице
    this.selection.clear();
  }


  fetchUsersData() {
    this.usersService.getManyUsers().subscribe({
      next: ({users}) => {
        // Установка начальных значений
        this.usersData = users || []
        this.setLocalStorageData()
      },
    })
  }

  ngOnInit() {
    const storageData = this.storageService.getStorageData()

    // Если есть данные в локал сторе при инициализации компонента запрос на бэк не делаем
    if (storageData.length) {
      this.usersData = storageData
    } else {
      this.fetchUsersData()
    }
  }
}
