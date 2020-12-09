import {Component, OnInit, ViewChild} from '@angular/core';
import {EncuestaService} from '../../services/encuesta.service';
import {MessageService} from '../../@pages/components/message/message.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  encuestas = [];

  sortName = null;
  sortValue = null;
  meta = 0;
  selected = [];
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
  columnModeSettingSmall = window.innerWidth < 560 ? 'standard' : 'force';

  constructor(private encuesta: EncuestaService, private messageservice: MessageService, private authService: AuthService) {
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
      this.columnModeSettingSmall = window.innerWidth < 560 ? 'standard' : 'force';
    };
  }

  ngOnInit() {
    this.encuesta.getData().subscribe((data: any[]) => {
      this.encuestas = data;
      this.meta = 0;
      data.forEach((obj: any) => {
        if (obj.puntaje >= 9) {
          this.meta++;
        }
      });
    }, error => {
      //console.log('ERROR: ', error);
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

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/table.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  //Expandable Table Code;
  @ViewChild('expTable', {static: true}) expTable: any;
  expanded: any = {};

  toggleExpandRow(row) {
    this.expTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }
}
