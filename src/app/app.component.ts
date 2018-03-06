import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PriceService } from './price.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})

export class AppComponent implements OnInit {
  public tax = 0;
  public tax_gas = 0;
  public partner_name = "Partnership Name";
  public temp_partner_name = "";

  public address = "Location";
  public temp_address = "";

  public measured = "Measured Depth Details";
  public temp_measured = "";

  public description1 = "Description";
  public temp_description1 = "";

  public description2 = "Description";
  public temp_description2 = "";


  public showPartnerName: boolean = false;
  public showAddress: boolean = false;
  public showMeasured: boolean = false;
  public showDescription1: boolean = false;
  public showDescription2: boolean = false;

  public nri_percentage: number = 11.25;
  public total_raise: number = 0;

  public url: string = "assets/no-preview.png";
  public hidden: boolean = true;
  public mobileView: boolean = false;

  public options = [
    { stateName: "-- Select State --", taxValue: [0, 0] },
    { stateName: "Alabama", taxValue: [4, 4] },
    { stateName: "Arkansas", taxValue: [5, 5] },
    { stateName: "Alaska", taxValue: [15, 10] },
    { stateName: "Arizona", taxValue: [6.60, 6.60] },
    { stateName: "California", taxValue: [0, 0] },
    { stateName: "Colorado", taxValue: [5, 5] },
    { stateName: "Florida", taxValue: [9, 9] },
    { stateName: "Idaho", taxValue: [2, 2] },
    { stateName: "Illinois", taxValue: [0, 0] },
    { stateName: "Indiana", taxValue: [1, 0.24] },
    { stateName: "Kansas", taxValue: [8, 8] },
    { stateName: "Kentucky", taxValue: [4.5, 4.5] },
    { stateName: "Louisiana", taxValue: [12.5, 0.164] },
    { stateName: "Maryland", taxValue: [7, 7] },
    { stateName: "Michigan", taxValue: [6.6, 5] },
    { stateName: "Minnesota", taxValue: [2, 2] },
    { stateName: "Mississippi", taxValue: [6, 6] },
    { stateName: "Montana", taxValue: [1, 1] },
    { stateName: "Nebraska", taxValue: [3, 3] },
    { stateName: "New Mexico", taxValue: [3.75, 3.75] },
    { stateName: "Nevada", taxValue: [5, 5] },
    { stateName: "North Dakota", taxValue: [5, 0.04] },
    { stateName: "Ohio", taxValue: [0.10, 0.025] },
    { stateName: "Oklahoma", taxValue: [7, 7] },
    { stateName: "Oregon", taxValue: [6, 6] },
    { stateName: "South Dakota", taxValue: [4.5, 4.5] },
    { stateName: "Texas", taxValue: [4.6, 7.5] },
    { stateName: "Tennessee", taxValue: [3, 3] },
    { stateName: "Utah", taxValue: [5, 5] },
    { stateName: "Virginia", taxValue: [5, 5] },
    { stateName: "West Virginia", taxValue: [10, 10] },
    { stateName: "Wisconsin", taxValue: [7, 7] },
    { stateName: "Wyoming", taxValue: [6, 6] },
  ];

  public lineData: Array<any> = [{ label: '', data: [] }];
  public lineData1: Array<any> = [{ label: '', data: [] }];
  public lineChartLabels: Array<any> = [];
  public lineChartLabels1: Array<any> = [];

  public barChartOptions: any = {};

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(146,206,80,1.0)',
      borderColor: 'rgba(146,206,80,1.0)',
      pointBackgroundColor: 'rgba(146,206,80,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(146,206,80,1.0)'
    },
    {
      backgroundColor: 'rgba(51,129,199,1.0)',
      borderColor: 'rgba(51,129,199,1.0)',
      pointBackgroundColor: 'rgba(51,129,199,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,129,199,1.0)'
    }
  ];

  onChange(item: any) {
    this.allTax = [];
    this.allTax = item.split(",");
    this.tempOil = parseFloat(this.allTax[0]);
    this.tempGas = parseFloat(this.allTax[1]);
    this.calculateTax(this.tempOil, this.tempGas);
    this.hypothetical();
  }

  calculateTax(oil, gas) {
    if (oil > 0 && oil < 0.5) {
      this.tax = ((oil / 100) * this.Estimated_Oil_ultimate_recovery_model) / 100;
    }

    if (gas > 0 && gas < 0.5) {
      this.tax_gas = ((oil / 100) * this.Estimated_Oil_ultimate_recovery_model) / 100;
    }

    if (oil >= 0 && gas >= 0) {
      this.tax = oil / 100;
      this.tax_gas = gas / 100;
    }
  }

  // Dependency Injection
  constructor(private price: PriceService, private datePipe: DatePipe) {

  }

  // Initializing the Data to Map and Panels
  ngOnInit() {
    this.price.getOilPrice().subscribe(res => {
      this.Estimated_oil_price_model = res.data[0][6]
    })

    this.price.getGasPrice().subscribe(res => {
      this.Estimated_gas_price_model = res.data[0][6];
      this.Estimated_gas_price_model = parseFloat(this.Estimated_gas_price_model.toFixed(2));
    })

    this.hypothetical();
    if (window.screen.width <= 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }


  /*-------------------------------------------------------------------------------------------------------------------*/

  // Hypothetical Price, Production, and Cash Flow Scenarios section calculation
  public unit_price: number = 1700000;
  public c: number = 0.1125;
  public Hypothetical_investment_model: number = 0;
  public Estimated_oil_model: number = 0;
  public Estimated_gas_model: number = 0;
  public Estimated_oil_price_model: number = 0;
  public Estimated_gas_price_model: number = 0;
  public Estimated_Oil_ultimate_recovery_model = 0;
  public Estimated_Gas_ultimate_recovery_model = 0;
  public Projected_Lifespan: number = 0;
  public Net_Income_Difference: number = 0;
  public Actual_Dollars_At_Risk: number = 0;
  public unit_equivalent_model: number = 0;
  public Net_Revenue_model: number = 0;
  public five_percent_of_temp: number = 0;
  public Potential_Monthly_model: number = 0;
  public Months_to_model: number = 0;
  public Total_Potential_model: number = 0;

  public Operating_Expenses_Ratio = 0;
  public Months_to_cash_flow: number;
  public roi_percent: string = "0%";

  public unit: string;

  public allTax = [];
  public tempOil = 0;
  public tempGas = 0;


  // Calculate Hypothetical Price, Production, and Cash Flow Scenarios
  hypothetical() {

    if (this.tempOil >= 0 && this.tempGas >= 0)
      this.calculateTax(this.tempOil, this.tempGas);

    this.lineData = [];
    this.lineData1 = [];
    //this.lineChartLabels = [];
    this.lineChartLabels.length = 0;
    this.lineChartLabels1.length = 0;
    let temp1 = 0, temp2 = 0;

    // Unit Equivalent Model Calculation
    this.unit_equivalent_model = (this.Hypothetical_investment_model / this.unit_price) * 10;
    this.findFraction(this.unit_equivalent_model);

    // NRI Percentage Calculation
    //this.Net_Revenue_model = this.c * this.unit_equivalent_model;
    //this.Net_Revenue_model = parseFloat(this.Net_Revenue_model.toPrecision(4));

    // Estimated Monthly Income Calculation
    temp1 = this.Estimated_oil_model * 30 * this.Estimated_oil_price_model;
    temp1 = temp1 - (this.tax * temp1);
    temp2 = this.Estimated_gas_model * 30 * this.Estimated_gas_price_model;
    temp2 = (temp2 - (this.tax_gas * temp2)) * (this.nri_percentage / 100);
    temp1 = temp1 + temp2;
    temp1 = temp1 - ((this.Operating_Expenses_Ratio / 100) * temp1);
    this.Potential_Monthly_model = temp1 * (this.nri_percentage / 100);
    this.Potential_Monthly_model = parseFloat(this.Potential_Monthly_model.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

    temp1 = this.Estimated_Oil_ultimate_recovery_model * this.Estimated_oil_price_model;
    temp1 = temp1 - (this.tax * temp1);
    temp2 = this.Estimated_Gas_ultimate_recovery_model * this.Estimated_gas_price_model
    temp2 = temp2 - (this.tax_gas * temp2);
    temp1 = (temp1 + temp2) * (this.nri_percentage / 100);
    this.Total_Potential_model = temp1 - ((this.Operating_Expenses_Ratio / 100) * temp1);

    // Months to Payout Calculation
    if (isFinite(this.Hypothetical_investment_model / this.Potential_Monthly_model) && !isNaN(this.Hypothetical_investment_model / this.Potential_Monthly_model))
      this.Months_to_model = this.Hypothetical_investment_model / this.Potential_Monthly_model;

    else
      this.Months_to_model = 0;

    // Estimated Months of Cash Flow

    if (isFinite(this.Total_Potential_model / this.Potential_Monthly_model) && !isNaN(this.Total_Potential_model / this.Potential_Monthly_model))
      this.Months_to_cash_flow = this.Total_Potential_model / this.Potential_Monthly_model;

    else
      this.Months_to_cash_flow = 0;

    if (isFinite(Math.floor((this.Total_Potential_model * 100) / this.Hypothetical_investment_model)) && !isNaN(Math.floor((this.Total_Potential_model * 100) / this.Hypothetical_investment_model)))
      this.roi_percent = (Math.floor((this.Total_Potential_model * 100) / this.Hypothetical_investment_model)).toString() + "%";
    else
      this.roi_percent = "0%";


    var data1 = [];
    var data2 = [];


    if ((isFinite(this.Hypothetical_investment_model) && !isNaN(this.Hypothetical_investment_model)) && (isFinite(this.Total_Potential_model) && !isNaN(this.Total_Potential_model))) {
      if (this.Hypothetical_investment_model > this.Total_Potential_model && this.Total_Potential_model !== 0) {
        data1.push(null, null, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null);
        this.lineData.push({ label: 'Investment Amount ($)', data: data1 });

        data2.push(null, null, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null);
        //data2.push(0, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null);
        this.lineData.push({ label: 'Estimated Total Cash Flow ($)', data: data2 });
      } else {
        data1.push(0, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null, null);
        this.lineData.push({ label: 'Investment Amount ($)', data: data1 });

        data2.push(0, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null);
        this.lineData.push({ label: 'Estimated Total Cash Flow ($)', data: data2 });
      }
    } else {
      this.lineData.push({ label: 'Investment Amount ($)', data: null });
      this.lineData.push({ label: 'Estimated Total Cash Flow ($)', data: null });
    }


    var data3 = [];
    var data4 = [];

    if ((isFinite(this.Hypothetical_investment_model) && !isNaN(this.Hypothetical_investment_model)) && (isFinite(this.Total_Potential_model) && !isNaN(this.Total_Potential_model))) {
      if (this.Hypothetical_investment_model > this.Total_Potential_model && this.Total_Potential_model !== 0) {
        data3.push(0, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null, null);
        this.lineData1.push({ label: 'Investment Amount ($)', data: data3 });

        data4.push(0, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null, null);
        this.lineData1.push({ label: 'Estimated Total Cash Flow ($)', data: data4 });

      } else {
        data3.push(0, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null);
        this.lineData1.push({ label: 'Investment Amount ($)', data: data3 });

        data4.push(0, parseFloat(this.Hypothetical_investment_model.toFixed(2)) ? parseFloat(this.Hypothetical_investment_model.toFixed(2)) : null, parseFloat(this.Total_Potential_model.toFixed(2)) ? parseFloat(this.Total_Potential_model.toFixed(2)) : null);
        this.lineData1.push({ label: 'Estimated Total Cash Flow ($)', data: data4 });
      }
    } else {
      this.lineData1.push({ label: 'Investment Amount ($)', data: null });
      this.lineData1.push({ label: 'Estimated Total Cash Flow ($)', data: null });
    }


    this.lineChartLabels.push('0');
    if ((isFinite(this.Months_to_model) && !isNaN(this.Months_to_model)) && (isFinite(this.Months_to_cash_flow) && !isNaN(this.Months_to_cash_flow))) {
      if (this.Months_to_model > this.Months_to_cash_flow && this.Months_to_cash_flow !== 0) {
        this.lineChartLabels.push(this.Months_to_cash_flow !== 0 ? this.Months_to_cash_flow.toFixed(1) + '' : '0');
        this.lineChartLabels.push(this.Months_to_model !== 0 ? this.Months_to_model.toFixed(1) + '' : '0')
      } else {
        this.lineChartLabels.push(this.Months_to_model !== 0 ? this.Months_to_model.toFixed(1) + '' : '0');
        this.lineChartLabels.push(this.Months_to_cash_flow !== 0 ? this.Months_to_cash_flow.toFixed(1) + '' : '0')
      }
    }

    this.lineChartLabels1.push('0');
    if ((isFinite(this.Months_to_model) && !isNaN(this.Months_to_model)) && (isFinite(this.Months_to_cash_flow) && !isNaN(this.Months_to_cash_flow))) {
      if (this.Months_to_model > this.Months_to_cash_flow && this.Months_to_cash_flow !== 0) {
        //this.lineChartLabels1.push(this.Months_to_cash_flow !== 0 ? this.Months_to_cash_flow.toFixed(1) + '' : '0');
        this.lineChartLabels1.push(this.Months_to_model.toFixed(1) + '')
      } else {
        if (this.Months_to_model !== 0) {
          this.lineChartLabels1.push(this.Months_to_model !== 0 ? this.Months_to_model.toFixed(1) + '' : '0');
        }
        this.lineChartLabels1.push(this.Months_to_cash_flow !== 0 ? this.Months_to_cash_flow.toFixed(1) + '' : '0')
      }
    }




    /* 
        if (isFinite(this.Months_to_model) && !isNaN(this.Months_to_model))
          this.lineChartLabels.push(this.Months_to_model.toFixed(1) + '');
        else
          this.lineChartLabels.push('0');
    
    
        if (isFinite(this.Months_to_cash_flow) && !isNaN(this.Months_to_cash_flow))
          this.lineChartLabels.push(this.Months_to_cash_flow.toFixed(1) + '');
        else
          this.lineChartLabels.push('0');
     */


    //this.lineChartLabels = label;

    //this.lineChartLabels.push()


    /*     var ctx = document.getElementById("myChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data
          //options: options
        }); */

    var option = {
      legend: { position: 'bottom' },
      tooltips: {
        callbacks: {
          title: function (tooltipItems, data) {
            return '';
          },
          label: function (tooltipItem, data) {
            var datasetLabel = '';
            var label = data.labels[tooltipItem.index];
            var txt;
            txt = " $ ";
            txt += (+data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            return txt;
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '($)',
            fontSize: 16,
            fontStyle: "bold"
          },
          ticks: {
            beginAtZero: true
          }
        }],

        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Total Months of Cash Flow',
            fontSize: 14,
            fontStyle: "bold"
          }
        }]
      },
    }

    this.barChartOptions = option;
  }

  // Converting the Decimal to Fraction Part
  findFraction(value: number) {
    let numerator: string = value.toFixed(2).toString();
    let extra = numerator.split('.');

    if (100 % extra["1"] == 0) {
      extra["0"] = 100 / extra["1"];
      extra["1"] = extra["1"] / extra["1"];
    }

    else {
      let temp = extra["1"];

      if (temp % (Math.floor(temp / 2)) == 0 && 100 % (Math.floor(temp / 2)) == 0) {
        extra["1"] = temp / Math.floor(temp / 2);
        extra["0"] = 100 / Math.floor(temp / 2);
      }

      else if (temp % 20 == 0 && 100 % 20 == 0) {
        extra["1"] = temp / 20;
        extra["0"] = 100 / 20;
      }

      else if (temp % 10 == 0 && 100 % 10 == 0) {
        extra["1"] = temp / 10;
        extra["0"] = 100 / 10;
      }

      else if (temp % 5 == 0 && 100 % 5 == 0) {
        extra["1"] = temp / 5;
        extra["0"] = 100 / 5;
      }

      else if (temp % 4 == 0 && 100 % 4 == 0) {
        extra["1"] = temp / 4;
        extra["0"] = 100 / 4;
      }

      else if (temp % 2 == 0 && 100 % 2 == 0) {
        extra["1"] = temp / 2;
        extra["0"] = 100 / 2;
      }

      else {
        extra["1"] = extra["1"];
        extra["0"] = 100;
      }
    }

    if (extra["1"] != 0 && (!isNaN(extra["1"]) || isFinite(extra["0"]))) {
      if (Math.floor(value) != 0) {
        if ((extra["1"] && extra["0"]) == 1) {
          this.unit = Math.floor(value) + extra["1"];
        }
        else {
          this.unit = Math.floor(value) + " " + extra["1"] + "/" + extra["0"];
        }
      }
      else {
        this.unit = extra["1"] + "/" + extra["0"];
      }
    }
    else {
      this.unit = Math.floor(this.unit_equivalent_model).toString();
    }
  }

  // Changing the Panel Icon
  onclicktoggle(idname: string) {
    let icon = "";
    if (idname === "accordion1") {
      icon = "icon1";
    }

    let cN = document.getElementById(icon).className;

    if (icon === "icon1") {
      if (cN === "glyphicon glyphicon-plus") {
        document.getElementById(icon).className = "glyphicon glyphicon-minus";
      }
      else {
        document.getElementById(icon).className = "glyphicon glyphicon-plus";
      }
    }
  }
}