import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../services/table.service';
import { Table } from '../../../interfaces/Table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private tables: Table;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getTables().subscribe(tables => {
      this.tables = tables;
    }, (err) => {
      console.error(err);
    });
  }

  deleteTable(table: Table) {
    this.tableService.deleteTable(table)
    .subscribe(() => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
    });
  }
}
