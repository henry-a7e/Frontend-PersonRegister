import { PhoneService } from './../../Services/phone.service';
import { Phone } from './../../Interfaces/phone';
import { Person } from './../../Interfaces/person';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-phones',
  templateUrl: './add-phones.component.html',
  styleUrls: ['./add-phones.component.css'],
})
export class AddPhonesComponent implements OnInit {
  counterlistPhones: number = 0;
  phonesForm = new FormGroup({
    phones: new FormArray([]),
  });

  get phones(): FormArray {
    return this.phonesForm.get('phones') as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<AddPhonesComponent>,
    private phoneService: PhoneService,
    private snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public person: Person
  ) {}

  ngOnInit(): void {}

  addPhoneList(): void {
    this.phones.push(new FormControl('', Validators.required));
    this.counterlistPhones = this.counterlistPhones + 1;
  }

  deletePhoneList(index: number): void {
    this.phones.removeAt(index);
    this.counterlistPhones = this.counterlistPhones - 1;
  }

  agregarNumeros(): void {
    for (let i = 0; i < this.phones.length; i++) {
      const modelo: Phone = {
        id: 0,
        phoneNumber: this.phones.controls[i].value,
        personId: this.person.id,
      };

      this.phoneService.newPhone(modelo).subscribe({
        next: () => {
          this.showAlert('Números agregados', 'Listo');
          this.dialogRef.close('telefonosAgregados');
        },
        error: (e) => {
          this.showAlert('Números no agregados', 'Error');
          console.log(e);
        },
      });
    }
  }

  showAlert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
