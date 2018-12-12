import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TableService } from '../../../../services/table.service';
import { Table } from '../../../../interfaces/Table.interface';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  private currentTable: Table;
  private originalTable: Table;
  private editTableForm: FormGroup;

  constructor(private fB: FormBuilder, private aRoute: ActivatedRoute, private router: Router, private tableService: TableService) {
    this.editTableForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', !Validators.required ],
      'imagePath': ['', !Validators.required ],
    });
  }

  get table(): Table {
    return this.currentTable;
  }

  set table(value: Table) {
    this.currentTable = value;
    this.originalTable = Object.assign({}, value);
  }

  ngOnInit() {
    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.tableService.getTable(id)
    .subscribe(table => {
      this.onTableRetrieved(table);
    }, (err) => {
      console.error(err + 'help');
    });
  }

  onTableRetrieved(table: Table): void {
    this.table = table;
    this.updateValues();
  }

  updateValues() {
    this.editTableForm.controls['number'].setValue(this.table.number);
    this.editTableForm.controls['user'].setValue(this.table.user);
  }

  saveProduct(): void {
    const table: Table = {
      _id: this.table._id,
      number: this.editTableForm.value.number,
      user: this.editTableForm.value.user,
    };

    this.tableService.putTable(table)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/tables']);
  }

}
