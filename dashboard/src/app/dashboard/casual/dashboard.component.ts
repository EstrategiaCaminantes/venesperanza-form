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
  lineChartWeekFormData: ChartDataSets[] = [
    {data: [], label: 'Registros semanales'},
    {data: [], label: 'Formularios completados'}
  ];
  lineChartWeekFormLabels: Label[] = [];
  lineChartOptions: (ChartOptions) = {
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
      backgroundColor: 'rgba(8,88,226,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgb(73,133,70)',
      borderColor: 'rgb(58,105,56)',
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
      Object.entries(data.week).forEach((obj: any) => {
        this.lineChartWeekLabels.push(obj[0]);
        this.lineChartWeekFormLabels.push(obj[0]);
        this.lineChartWeekData[0].data.push(obj[1].length);
        this.lineChartWeekFormData[0].data.push(obj[1].length);
        let cand = 0;
        let form = 0;
        obj[1].forEach((obj2: any) => {
          cand += (obj2.puntaje >= 9) ? 1 : 0;
          if ((obj[0] == '2021-01-11 - 2021-01-17' || obj[0] == '2021-01-18 - 2021-01-24' || obj[0] == '2021-01-25 - 2021-01-31'
            || obj[0] == '2021-02-01 - 2021-02-07' || obj[0] == '2021-02-08 - 2021-02-14' || obj[0] == '2021-02-15 - 2021-02-21'
            || obj[0] == '2021-02-22 - 2021-02-28')) {
            form += (obj2.paso == 'paso3' || obj2.paso == 'paso8') ? 1 : 0;
          } else {
            form += (obj2.paso == 'paso8') ? 1 : 0;
          }
        });
        this.lineChartWeekData[1].data.push(cand);
        this.lineChartWeekFormData[1].data.push(form);
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
