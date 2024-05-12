import { Component, HostListener, ViewChild } from '@angular/core';
import {
  GuiGridModule,
  GuiPaging,
  GuiPagingDisplay,
  GuiSorting,
} from '@generic-ui/ngx-grid';
import { DataService } from '../../../services/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../../local-storage.service';
import { Router } from '@angular/router';

export interface TableHeader {
  header: string;
  field: string;
}
export interface Color {
  name: string;
  selectable: boolean;
  group: string;
}
export interface BarChartData {
  name: Date;
  series: Series[];
}
export interface Series {
  name: string;
  value: number;
}
@Component({
  selector: 'app-datadisplay',
  standalone: true,
  imports: [BaseChartDirective, NgxChartsModule, GuiGridModule, CommonModule],
  templateUrl: './datadisplay.component.html',
  styleUrl: './datadisplay.component.scss',
})
export class DatadisplayComponent {
  public innerWidth: number = 700;
  multi: BarChartData[] = [];

  view: [number, number] = [this.innerWidth, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time Stamp';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Flow Pressure Values';
  isloading: boolean = false;
  isCollapsed: boolean = true;

  onResize(event: any) {
    this.view = [event.target.innerWidth - 100, 600];
    console.log(this.innerWidth, 'akhila');
  }

  colorScheme: Color[] = [
    { name: '#5AA454', selectable: true, group: 'Group1' },
    { name: '#C7B42C', selectable: true, group: 'Group2' },
    { name: '#AAAAAA', selectable: true, group: 'Group3' },
  ];
  lastScreenWidth: any;
  animations: boolean = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  loading = false;
  columns: any = [
    {
      header: 'Id',
      field: 'id',
    },
    {
      header: 'TimeStamp',
      field: 'timeStamp',
    },
    {
      header: 'Flow',
      field: 'flow',
    },
    {
      header: 'Pressure',
      field: 'pressure',
    },
  ];
  source: any = [];

  paging: GuiPaging = {
    enabled: true,
    page: 1,
    pageSize: 5,
    pageSizes: [5],
    pagerTop: true,
    pagerBottom: true,
    display: GuiPagingDisplay.BASIC,
  };
  sorting: GuiSorting = {
    enabled: true,
  };
  collapseTable() {
    this.isCollapsed = !this.isCollapsed;
  }
  onLoad(myfunc: any) {
    setTimeout(() => {
      this.isloading = false;
      if (myfunc) {
        myfunc();
      }
    }, 2000);
  }
  auth() {
    if (!this.localStorage.getItem('userEmail')) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    if (!localStorage.getItem('testSession')) {
      localStorage.setItem('testSession', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('testSession');
    }
    this.auth();
    this.innerWidth = window.innerWidth;
    console.log(window.innerWidth, 'akki ');
    this.dataService.fetchData().subscribe({
      next: (data) => {
        const mydata: BarChartData[] = [];
        console.log(data);
        this.source = data;
        data.map((record) => {
          mydata.push({
            name: record.timeStamp,
            series: [
              {
                name: 'Flow',
                value: record.flow,
              },
              {
                name: 'Pressure',
                value: record.pressure,
              },
            ],
          });
        });
        this.multi = mydata;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.info('complete');
      },
    });
  }
}
