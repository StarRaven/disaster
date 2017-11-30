import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Chart from 'chart.js';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {
  @ViewChild('donut') donut: ElementRef;
  constructor() { }

  ngOnInit() {
    let donutCtx = this.donut.nativeElement.getContext('2d');

    var data = {
      labels: [
        "For Drinking",
        "For Food Preparation, Sanitation and Other Activities",
        "For Pets"
      ],
      datasets: [
        {
          "data": [100, 100, 100],   // Example data
          "backgroundColor": [
            "#1fc8f8",
            "#76a346",
            "#000000"
          ]
        }]
    };

    var chart = new Chart(
      donutCtx,
      {
        "type": 'doughnut',
        "data": data,
        "options": {
          "legend": {
            "display": false,
            "position": 'bottom'
          },
          "scaleShowLabels" : false,
          "responsive": false,
          "maintainAspectRatio": false,
          "cutoutPercentage": 50,
          "animation": {
            "animateScale": true,
            "animateRotate": false
          }
        }
      }
    );
  }

}
