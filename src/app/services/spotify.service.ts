import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';


let client_id = environment.client_id
let client_secret = environment.client_secret

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
   

    
   }
  body = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
 
  bearer: string;
  
  

  getNewReleases(){
    
    
    return new Observable( (observer) => {
      this.http.post('https://accounts.spotify.com/api/token', this.body, this.options).subscribe((resp:any)=> {
        this.bearer = resp.access_token;
        const url = `https://api.spotify.com/v1/browse/new-releases?limit=20`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.bearer}`
        });
        this.http.get(url, { headers }).subscribe((data:any) => {
          observer.next(data.albums.items);
        })
    });
    })
                        
    
  }
  getArtistas(termino:string){
    
    return new Observable( (observer) => {
      this.http.post('https://accounts.spotify.com/api/token', this.body, this.options).subscribe((resp:any)=> {
        this.bearer = resp.access_token;
        const url = `https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.bearer}`
        });
        this.http.get(url, { headers }).subscribe((data:any) => {
          observer.next(data.artists.items);
        })
    });
    })

  
  }
  getArtista(id:string){
   
    return new Observable( (observer) => {
      this.http.post('https://accounts.spotify.com/api/token', this.body, this.options).subscribe((resp:any)=> {
        this.bearer = resp.access_token;
        const url = `https://api.spotify.com/v1/artists/${id}`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.bearer}`
        });
        this.http.get(url, { headers }).subscribe((data:any) => {
          
          observer.next(data);
        })
    });
    })
  }
  getTopTracks(id:string){
    
    return new Observable( (observer) => {
      this.http.post('https://accounts.spotify.com/api/token', this.body, this.options).subscribe((resp:any)=> {
        this.bearer = resp.access_token;
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=us`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.bearer}`
        });
        this.http.get(url, { headers }).subscribe((data:any) => {
          observer.next(data.tracks);
        })
    });
    })    
  }

}