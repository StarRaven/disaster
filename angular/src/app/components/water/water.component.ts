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
            "#a9a9a9",
            "#9294de",
            "#92d5dd"
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
            "display": false  ,
            "position": 'bottom'
          },
          "scaleShowLabels" : false,
          "responsive": false,
          "maintainAspectRatio": false,
          "cutoutPercentage": 0,
          "animation": {
            "animateScale": true,
            "animateRotate": false
          }
        }
      }
    );
  }

}
