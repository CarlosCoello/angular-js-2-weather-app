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
search: string;
address: string;
lat: string;
lng: string;
results = [];
obj;
temperature: string;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
  }

  searchWeather(){
    this.weather.geocodeAddress(this.search).subscribe( (data) => {
      this.address = data[0].address;
      this.lat = data[0].lat;
      this.lng = data[0].lng;
      this.weather.darkSky(this.lat, this.lng).subscribe( (data) => {
        this.temperature = data.currently.temperature;
        this.obj = { address: this.address, temperature: this.temperature };
        this.results.push(this.obj);
      });
    });
    this.form.reset();
  }


}
