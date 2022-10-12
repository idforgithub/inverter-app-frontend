import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Inverter, InverterData } from './inverter.model';
import { InverterService } from './inverter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public inverters?: Inverter[];

  constructor(private inverterService: InverterService){}

  ngOnInit(): void {
    this.getInverters();
  }

  private renderChart(data: Inverter[]): void{
    var options = {
      chart: {
        height: 280,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
      },
      series: data,
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        type: 'datetime'
      }
    };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
  }

  public getInverters(): void{
    this.inverterService.getInverters().subscribe(
      (response: Inverter[]) => {
        this.inverters = response;
        this.renderDataForChart(this.inverters);
        console.log(this.inverters);
        this.renderChart(this.inverters);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  private renderDataForChart(inverters: Inverter[]): void{
    const tempDatas: Inverter[] = [];
    for (let data1 in inverters) {
        const tempData: Inverter = inverters[data1];
        delete tempData.id;
        tempData.name = tempData.device;
        const newListData: InverterData[] = []
        for (let data2 in tempData.data) {
          delete tempData.data[data2].inverterDeviceId;
          delete tempData.data[data2].id;
          tempData.data[data2].x = tempData.data[data2].timestamp;
          tempData.data[data2].y = tempData.data[data2].acp;
          newListData.push(tempData.data[data2]);
        }
        tempDatas.push(tempData);
    }
    this.inverters = tempDatas;
  }
}
