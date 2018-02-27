import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public tax = 0.046;
  public tax_gas = 0.075;
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

  public nri_percentage: number = 0;
  public total_raise: number = 0;

  public url: string = "assets/no-preview.png";
  public hidden: boolean = true;
  public mobileView: boolean = false;

  public options = [
    { stateName: "-- Select State --", taxValue: null },
    { stateName: "Alaska", taxValue: 11.25 },
    { stateName: "California", taxValue: 11.25 },
    { stateName: "Colorado", taxValue: 11.25 },
    { stateName: "Florida", taxValue: 11.25 },
    { stateName: "Georgia", taxValue: 11.25 },
    { stateName: "Hawaii", taxValue: 11.25 },
    { stateName: "Indiana", taxValue: 11.25 },
    { stateName: "Mississippi", taxValue: 11.25 },
    { stateName: "New York", taxValue: 11.25 },
    { stateName: "North Carolina", taxValue: 11.25 },
    { stateName: "Ohio", taxValue: 11.25 },
    { stateName: "South Carolina", taxValue: 11.25 },
    { stateName: "Texas", taxValue: 11.25 },
    { stateName: "Utah", taxValue: 11.25 },
    { stateName: "Vermont", taxValue: 11.25 },
    { stateName: "Virginia", taxValue: 11.25 },
    { stateName: "Washington", taxValue: 11.25 },
  ];

  onChange(item: any) {
    console.log(item)
  }

  // Dependency Injection
  constructor() {

  }

  // Initializing the Data to Map and Panels
  ngOnInit() {
    this.hypothetical();
    if (window.screen.width <= 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.hidden = false;
      }

      reader.readAsDataURL(event.target.files[0]);
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

  // Calculate Hypothetical Price, Production, and Cash Flow Scenarios
  hypothetical() {
    let temp1 = 0, temp2 = 0;

    // Unit Equivalent Model Calculation
    this.unit_equivalent_model = (this.Hypothetical_investment_model / this.unit_price) * 10;
    this.findFraction(this.unit_equivalent_model);

    // NRI Percentage Calculation
    this.Net_Revenue_model = this.c * this.unit_equivalent_model;
    this.Net_Revenue_model = parseFloat(this.Net_Revenue_model.toPrecision(4));

    // Estimated Monthly Income Calculation
    temp1 = this.Estimated_oil_model * 30 * this.Estimated_oil_price_model;
    temp1 = temp1 - (this.tax * temp1);
    temp2 = this.Estimated_gas_model * 30 * this.Estimated_gas_price_model;
    temp2 = (temp2 - (this.tax_gas * temp2)) * this.Net_Revenue_model;
    temp1 = temp1 + temp2;
    temp1 = temp1 - ((this.Operating_Expenses_Ratio / 100) * temp1);
    this.Potential_Monthly_model = temp1 * this.Net_Revenue_model;
    this.Potential_Monthly_model = parseFloat(this.Potential_Monthly_model.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

    temp1 = this.Estimated_Oil_ultimate_recovery_model * this.Estimated_oil_price_model;
    temp1 = temp1 - (this.tax * temp1);
    temp2 = this.Estimated_Gas_ultimate_recovery_model * this.Estimated_gas_price_model
    temp2 = temp2 - (this.tax_gas * temp2);
    temp1 = (temp1 + temp2) * this.Net_Revenue_model;
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


    var data = [];
    data.push(this.Hypothetical_investment_model ? this.Hypothetical_investment_model : 0);
    data.push(this.Total_Potential_model ? this.Total_Potential_model : 0);

/*     var ctx = document.getElementById("myChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: data
      //options: options
    }); */
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