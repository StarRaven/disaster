import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { Food } from '../../food';
import { GlobalService } from '../../global.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @ViewChild('donut') donut: ElementRef;
  displayedColumns = ['type', 'calories', 'quantity', 'total'];
  dataSource = new MatTableDataSource<Food>();
  foods: Food[] = [];
  calories: number[] = [];
  labels: string[] = [];
  finishhttp: boolean = false;
  total: number;
  background: string[] = [];

  chart: any;

  constructor(
    private http: Http,
    private global: GlobalService,
  ) { }

  update(id, qty) {

    id = id - 1;
    this.foods[id].quantity = qty;
    this.calories[id] = qty * this.foods[id].calories;
    //console.log(this.foods);
    //console.log(this.calories);
    //console.log(this.labels);
    this.total = 0;
    for (let t of this.calories) {
      this.total = this.total + t;
    }
    let donutCtx = this.donut.nativeElement.getContext('2d');

    var data = {
      labels: this.labels,
      datasets: [
        {
          "data": this.calories,   // Example data
          "backgroundColor": this.background
        }]
    };
/*
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
          "scaleShowLabels": false,
          "responsive": false,
          "maintainAspectRatio": false,
          "cutoutPercentage": 0,
          "animation": {
            "animateScale": true,
            "animateRotate": false
          }
        }
      }
    );*/
    this.chart.data = data;
    this.chart.update();
  }

  ngOnInit() {
    this.total = 0;
    this.background = [];
    this.background.push("#aaaaaa");
    this.background.push("#a9a9a9");
    this.background.push("#a8a9a9");
    this.background.push("#a7a9a9");
    this.background.push("#a6a9a9");
    this.background.push("#a5a9a9");
    this.background.push("#a4a9a9");
    this.background.push("#a3a9a9");
    this.background.push("#a2a9a9");
    this.background.push("#a1a9a9");
    this.background.push("#a6a6a6");
    this.background.push("#a3a3a3");
    this.background.push("#9294de");
    this.background.push("#92d5dd");
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/food', { headers: headers }).subscribe(
      (jsonData) => {
        this.foods = [];
        this.labels = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Food = {
            id: entry[0],
            type: entry[1],
            servings: entry[2],
            calories: entry[3],
            quantity: 0
          };
          this.foods.push(r);
          this.labels.push(r.type);
          this.calories.push(0);
          //this.labels.push(r.type);
          //this.calories.push(10); //update
        };
        //console.log(this.foods);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.get('/api/get/food/' + this.global.id, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            for (let entry of jsonDataBody) {
              for (let food of this.foods) {
                if (entry[1] == food.id) {
                  food.quantity = entry[2];
                  this.calories[food.id - 1] = food.quantity * food.calories;
                  this.total = this.total + food.quantity * food.calories;
                }
              }
            };
            console.log(this.foods);
            this.dataSource = new MatTableDataSource<Food>(this.foods);

            let donutCtx = this.donut.nativeElement.getContext('2d');

            var data = {
              labels: this.labels,
              datasets: [
                {
                  "data": this.calories,   // Example data
                  "backgroundColor": this.background
                }]
            };

            this.chart = new Chart(
              donutCtx,
              {
                "type": 'doughnut',
                "data": data,
                "options": {
                  "legend": {
                    "display": false,
                    "position": 'bottom'
                  },
                  "scaleShowLabels": false,
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
            this.finishhttp = true;
          },
          // The 2nd callback handles errors.
          (err) => console.error(err),
          // The 3rd callback handles the "complete" event.
          () => console.log("observable complete")
        );



      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

}
