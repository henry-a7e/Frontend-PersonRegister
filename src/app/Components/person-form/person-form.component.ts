import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { PersonService } from 'src/app/Services/person.service';
import { Person } from 'src/app/Interfaces/person';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class PersonFormComponent implements OnInit {
  formPerson: FormGroup;
  personaEncontrada: boolean | undefined;

  constructor(
    private dialogRef: MatDialogRef<PersonFormComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private personService: PersonService
  ) {
    this.formPerson = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.max(999999999),
          Validators.min(10000000),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  showAlert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  savePerson() {
    this.personService
      .searchByCpfReturnBoolean(this.formPerson.value.cpf)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.personaEncontrada = data;
          if (data === true) {
            this.showAlert('Existe una persona con el mismo cpf ', 'Listo');
          } else {
            this.savePersonConfirm();
          }
        },
        error: (e) => console.log(e),
      });
  }

  private savePersonConfirm() {
    const modelo: Person = {
      id: 0,
      name: this.formPerson.value.name,
      birthdate: moment(this.formPerson.value.birthdate).format('DD/MM/YYYY'),
      cpf: this.formPerson.value.cpf,
    };

    this.personService.newPerson(modelo).subscribe({
      next: () => {
        this.showAlert('Nueva persona registrada', 'Listo');
        this.dialogRef.close('creado');
      },
      error: (e) => {
        this.showAlert('No se puede crear', 'Error');
        console.log(e);
      },
    });
  }
}
