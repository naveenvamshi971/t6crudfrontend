import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '@app/_services';
import  Chart  from 'chart.js/auto';

@Component({
  selector: 'app-usergraphicalview',
  templateUrl: './usergraphicalview.component.html',
  styleUrls: ['./usergraphicalview.component.less']
})


export class UsergraphicalviewComponent  implements OnInit{
  @ViewChild("geographicalviewchart") canvasRef:ElementRef;
  public geographicalviewchart: Chart;
   constructor(public api : AccountService) { }
 
   ngOnInit(){
     this.api.getchartData().subscribe((data: any) => {
       const ctx = this.canvasRef.nativeElement.getContext("2d");
       const label = [];
       const chartdata = [];
       data.data.forEach(element => {
         label.push(element.country);
         chartdata.push(element.count);
       });
       const datasets = [
         {
           label: "Country",
           data: chartdata,
          backgroundColor: ["","red", "blue", "green", "pink", "red", "blue"]
         }
       ]
       const chartdatset = {
         labels: label,
         datasets
       }
       this.geographicalviewchart = new Chart(ctx,
        {
          type:"bar",
          data:chartdatset
      })
     });
  }
 }