import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
@ViewChild('f') form:any;
encodedAddress: string;
search: string;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
  }

  searchWeather(){
    this.weather.geocodeAddress(this.search).then( (res) => res).catch( (error) => console.log(error));

    console.log(this.weather.weatherRes);

    this.form.reset();

  }

}
