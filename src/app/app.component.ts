import {Component, OnInit} from '@angular/core';
import {GridApi, RowNode} from "ag-grid-community";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  colDefs: any[] = [];
  data: any[] = [];
  gridApi: GridApi;

  ngOnInit() {
    const that = this;
    this.colDefs = [
      {
        headerName: 'Item #',
        field: 'itemId'
      },
      {
        headerName: 'Item Name',
        field: 'item'
      },
      {
        field: '',
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: params => {
          const checkBox = document.createElement('input');
          checkBox.setAttribute('type', 'checkbox');
          checkBox.checked = true;
          console.log('isBooked', params)
          const label = document.createElement('label');
          const title = document.createTextNode(params.colDef.headerName);
          label.appendChild(checkBox);
          label.appendChild(title);
          checkBox.addEventListener('change', e => {
            if ((<HTMLInputElement>e.target).value) {
              that.gridApi.selectAll();
            } else {
              that.gridApi.deselectAll();
            }
          });
          return label;
        }
      }
    ];

    this.data = [
      {
        itemId: 1,
        item: 'Accomodation',
        isBooked: true
      }, {
        itemId: 2,
        item: 'Onward flight',
        isBooked: false
      }, {
        itemId: 3,
        item: 'Return flight',
        isBooked: false
      }, {
        itemId: 4,
        item: 'Travel Insurance',
        isBooked: true
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.forEachNode((node: RowNode) => {
      if (node.data.isBooked) {
        node.setSelected(true);
      }
    });
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.data[event.rowIndex].isBooked = true;
    } else {
      this.data[event.rowIndex].isBooked = false;
    }
    console.log('data', this.data);
  }

}
