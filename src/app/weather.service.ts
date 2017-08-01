import { Injectable } from '@angular/core';
import { Jsonp, JsonpModule } from '@angular/http';
import 'rxjs/add/operator/topromise';

@Injectable()
export class WeatherService {
weatherRes: Object[];
encodedAddress: string;
apiUrl: string;
address: string;
lat: number;
lng: number;
apiDarkSky: string;
temperature: number;

  constructor(private jsonp: Jsonp) {
    this.weatherRes = [];
   }

  geocodeAddress = (address: string) => {

    let promise = new Promise( (resolve, reject ) => {

      this.encodedAddress = encodeURIComponent(address);
      this.apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.encodedAddress}&callback=JSONP_CALLBACK`;
      this.jsonp.request(this.apiUrl)
            .toPromise()
            .then( (res) => {
              this.address = res.json().results[0].formatted_address;
              this.lat = res.json().results[0].geometry.location.lat;
              this.lng = res.json().results[0].geometry.location.lng;
              resolve( this.darkSky() );
            }, (msg) => {
              reject();
            });
    });

    return promise;

  };

  darkSky = () => {
    let  promise = new Promise( (resolve, reject) => {

      this.apiDarkSky = `https://api.darksky.net/forecast/8faa7b95e3a14d8e2f746aba2c2cbecf/${this.lat},${this.lng}&callback=JSONP_CALLBACK`;
      this.jsonp.request(this.apiDarkSky)
          .toPromise()
          .then( (res) => {
            this.temperature = res.json().currently.temperature;
            resolve(this.weatherRes.push({ address: this.address, temperature: this.temperature }));
          }, (msg) => {
            reject('Error happened, verify http request url is correct or that the address you typed is a true address');
          })
    })

    return promise;
  };



}
