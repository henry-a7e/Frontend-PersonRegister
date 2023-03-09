import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/Interfaces/person';
import { Phone } from 'src/app/Interfaces/phone';
import { PhoneService } from 'src/app/Services/phone.service';

@Component({
  selector: 'app-show-phones',
  templateUrl: './show-phones.component.html',
  styleUrls: ['./show-phones.component.css'],
})
export class ShowPhonesComponent implements OnInit {
  listPhones: Phone[] = [];

  constructor(
    private dialogRef: MatDialogRef<ShowPhonesComponent>,
    private phoneService: PhoneService,
    private snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public person: Person
  ) {}

  ngOnInit(): void {
    this.getListPhonesByPerson(this.person.id);
  }

  getListPhonesByPerson(idPerson: number): void {
    this.phoneService.getListPhonesByPersonId(idPerson).subscribe({
      next: (data) => {
        this.listPhones = data;
      },
    });
  }
}
