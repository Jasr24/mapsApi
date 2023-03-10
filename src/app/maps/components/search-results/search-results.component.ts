import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selecteId: string = '';

  constructor (private placesService: PlacesService,
              private mapService: MapService) {

  }

  get isLoadinPlaces (): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places (): Feature[] {
    return this.placesService.places;
  }

  flyTo (place: Feature) {
    this.selecteId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat])
  }

  gerDirections(place: Feature){

    if(!this.placesService.userLocation) throw Error ('No hay userLocation')
    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [number, number]; //as para que lo trate como ...

    this.mapService.getRouteBetweenPoints(start, end)
  }
}
