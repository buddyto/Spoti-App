import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {
  loadingArtist: boolean;
  artista: any = {};
  topTracks: [] = [];
  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) { 
                this.loadingArtist = true;
                this.router.params.subscribe( params => {
      this.getArtista(params['id'])
      this.getTopTracks(params['id'])
      
      
    })
   }

  ngOnInit(): void {
  }
  getArtista( id: string){
    this.loadingArtist = true;
    this.spotify.getArtista(id).subscribe(artista =>{
      this.artista = artista
      this.spotify.getTopTracks(id).subscribe((topTracks:any) => {
      
        this.topTracks = topTracks;
        this.loadingArtist = false;
        //console.log(this.topTracks)
      })
    })
  }
  getTopTracks(id : string){
    
  }

}
