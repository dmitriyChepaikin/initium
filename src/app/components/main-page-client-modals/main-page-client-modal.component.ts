import {Component, Inject, OnInit} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {UserType} from "../../types/users.model";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MyErrorStateMatcher} from "../../utils/matcher";

function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null // поле не заполнено, нет ошибок
    }

    // Проверка на соответствие российскому формату
    const phoneRegex = /^\+7\d{10}$/
    const isValid = phoneRegex.test(value)

    return isValid ? null : {phone: true}
  }
}

@Component({
  selector: 'main-page-client-modals',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatHint,
    MatLabel,
    MatFormField
  ],
  templateUrl: './main-page-client-modal.component.html',
})
export class MainPageClientModalComponent implements OnInit {
  currentUserIndex: number | null = null

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<MainPageClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: UserType, index: number }
  ) {
  }

  name = new FormControl<string>('', [Validators.required, Validators.minLength(2)])
  surname = new FormControl<string>('', [Validators.required, Validators.minLength(2)])
  email = new FormControl<string>('', [Validators.required, Validators.email])
  phone = new FormControl<string>('', phoneNumberValidator())


  isControlsValid() {
    return this.name.valid && this.surname.valid && this.email.valid && this.phone.valid
  }

  onSubmit() {
    if (this.isControlsValid()) {
      const user: UserType = {
        name: this.name.value ?? '',
        surname: this.surname.value ?? '',
        email: this.email.value ?? '',
        phone: this.phone.value ?? '',
      }
      this.dialogRef.close({item: user, index: this.currentUserIndex})
    }
  }

  ngOnInit() {
    const {item, index} = this.data

    this.currentUserIndex = index

    if (item) {
      this.name.patchValue(item.name ?? '')
      this.surname.patchValue(item.surname ?? '')
      this.email.patchValue(item.email ?? '')
      this.phone.patchValue(item.phone ?? '')
    }
  }
}
