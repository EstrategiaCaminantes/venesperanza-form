import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {EncuestaService} from '../../services/encuesta.service';
import {MessageService} from '../../@pages/components/message/message.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CasualDashboardComponent implements OnInit {
  data;
  lineChartDayData: ChartDataSets[] = [
    {data: [], label: 'Registros diarios'},
    {data: [], label: 'Posibles candidatos'}
  ];
  lineChartDayLabels: Label[] = [];
  lineChartWeekData: ChartDataSets[] = [
    {data: [], label: 'Registros semanales'},
    {data: [], label: 'Posibles candidatos'}
  ];
  lineChartWeekLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
  };
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  chartReady = false;
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [pluginAnnotations];

  constructor(private encuesta: EncuestaService, private messageservice: MessageService, private authService: AuthService) {
  }

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  ngOnInit(): void {
    this.encuesta.getDash().subscribe((data: any) => {
      console.log('data', data);
      Object.entries(data.week).forEach((obj: any) => {
        this.lineChartWeekLabels.push(obj[0]);
        this.lineChartWeekData[0].data.push(obj[1].length);
        let cand = 0;
        obj[1].forEach((obj2: any) => {
          cand += (obj2.puntaje >= 9) ? 1 : 0;
        });
        this.lineChartWeekData[1].data.push(cand);
      });
      Object.entries(data.day).forEach((obj: any) => {
        this.lineChartDayLabels.push(obj[0]);
        this.lineChartDayData[0].data.push(obj[1].length);
        let cand = 0;
        obj[1].forEach((obj2: any) => {
          cand += (obj2.puntaje >= 9) ? 1 : 0;
        });
        this.lineChartDayData[1].data.push(cand);
      });
      this.chartReady = true;
    }, error => {
      if (error['error']['message'] === 'Unauthenticated') {
        this.messageservice.create(
          'danger',
          'No autorizado!',
          {
            Position: 'top-right',
            Style: 'bar',
            Duration: 3000
          }
        );
        this.authService.logout();
      } else {
        this.messageservice.create(
          'danger',
          'Error en servidor, intenta de nuevo.',
          {
            Position: 'top-right',
            Style: 'bar',
            Duration: 3000
          }
        );
      }

    });
  }
}
