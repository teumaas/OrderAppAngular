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

  public currentTable: Table;
  public originalTable: Table;
  public editTableForm: FormGroup;
  public submitted;

  constructor(public fB: FormBuilder, public aRoute: ActivatedRoute, public router: Router, public tableService: TableService) {
    this.editTableForm = this.fB.group({
      'number': ['', Validators.required ],
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
    this.editTableForm = this.fB.group({
      'number': ['', Validators.required ]
    });

    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.tableService.getTable(id)
    .subscribe(table => {
      this.onTableRetrieved(table);
    }, (err) => {
      console.error(err);
    });
  }

  onTableRetrieved(table: Table): void {
    this.table = table;
    this.updateValues();
  }

  updateValues() {
    this.editTableForm.controls['number'].setValue(this.table.number);
  }

  saveTable(): void {
    const table: Table = {
      _id: this.table._id,
      number: this.editTableForm.value.number
    };

    this.submitted = true;

    if (this.editTableForm.valid) {
    this.tableService.putTable(table)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/tables']);
  }

  get f() { return this.editTableForm.controls; }
}
