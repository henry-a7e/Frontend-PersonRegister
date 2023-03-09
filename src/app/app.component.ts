import { ShowPhonesComponent } from './Components/show-phones/show-phones.component';
import { Phone } from './Interfaces/phone';
import { Person } from './Interfaces/person';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from './Services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonFormComponent } from './Components/person-form/person-form.component';
import { AddPhonesComponent } from './Components/add-phones/add-phones.component';
import { PhoneService } from './Services/phone.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Nombre', 'FechaNacimiento', 'Cpf', 'Acciones'];
  dataSource = new MatTableDataSource<Person>();

  constructor(
    private personService: PersonService,
    private phoneService: PhoneService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getListPerson();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogFormPerson() {
    this.dialog.open(PersonFormComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="creado"){
        this.getListPerson();
      }
    })
  }

  openDialogAddPhone(person:Person){
    this.dialog.open(AddPhonesComponent,{
      disableClose:true,
      width:"350px",
      data:person
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="telefonosAgregados"){
        this.getListPerson();
      }
    })
  }

  openDialogShowPhone(person:Person){
    this.dialog.open(ShowPhonesComponent,{
      disableClose:true,
      width:"350px",
      data:person
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListPerson() {
    this.personService.getListPerson().subscribe({
      next: (dataResponse) => {
        this.dataSource.data = dataResponse;
      },
      error: (e) => {
        console.log(e)
      },
    });
  }
}
