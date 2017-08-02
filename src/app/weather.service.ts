import { Injectable } from '@angular/core';
import { Jsonp, JsonpModule } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

class GoogleFetch{
    constructor(
      public address:string,
      public lat: string,
      public lng: string
    ){}
}

@Injectable()
export class WeatherService {
encodedAddress: string;
apiUrl: string;
apiDarkSky: string;

  constructor(private jsonp: Jsonp) {}

   geocodeAddress(address: string): Observable<GoogleFetch[]>{
     this.encodedAddress = encodeURIComponent(address);
     this.apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.encodedAddress}&callback=JSONP_CALLBACK`;
     return this.jsonp.request(this.apiUrl).map( res => {
       return res.json().results.map( x => {
         return new GoogleFetch(
           x.formatted_address,
           x.geometry.location.lat,
           x.geometry.location.lng
         );
       });
     });
   }

   darkSky(lat, lng){
     this.apiDarkSky = `https://api.darksky.net/forecast/8faa7b95e3a14d8e2f746aba2c2cbecf/${lat},${lng}&callback=JSONP_CALLBACK`;
     return this.jsonp.get(this.apiDarkSky).map( res => res.json());
   }

}
