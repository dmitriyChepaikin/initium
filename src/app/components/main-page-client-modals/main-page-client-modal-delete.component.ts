import {Component, Inject} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'main-page-client-modals-delete',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './main-page-client-modal-delete.component.html',
})
export class MainPageClientModalDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<MainPageClientModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedItemsCount: number
  ) {}

  getModalContentString(){
    return `Удалить выбранные строки (${this.deletedItemsCount ?? 0})?`
  }

  onDelete() {
    this.dialogRef.close(true)
  }
}
