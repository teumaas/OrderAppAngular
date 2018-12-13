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

  private addTableForm: FormGroup;

  constructor(private fB: FormBuilder, private router: Router, private tableService: TableService) {
    this.addTableForm = this.fB.group({
      'number': ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  saveTable(): void {
    const table: Table = {
      number: this.addTableForm.value.number
    };

    this.tableService.postTable(table)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/tables']);
  }

}
