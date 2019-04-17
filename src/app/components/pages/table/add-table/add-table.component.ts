import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TableService } from '../../../../services/table.service';
import { Table } from '../../../../interfaces/Table.interface';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {

  public addTableForm: FormGroup;
  submitted = false;

  constructor(public fB: FormBuilder, public router: Router, public tableService: TableService) {
  }

  ngOnInit() {
    this.addTableForm = this.fB.group({
      'number': ['', Validators.required ]
    });
  }

  saveTable(): void {
    const table: Table = {
      number: this.addTableForm.value.number
    };

    this.submitted = true;

    if (this.addTableForm.valid) {
      this.tableService.postTable(table)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/tables']);
  }

  get f() { return this.addTableForm.controls; }
}
