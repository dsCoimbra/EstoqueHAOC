import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Sector } from './sectors.model';

import { environment } from '../../../../environments/environment';

@Injectable()

export class SectorsService {

    private readonly API = `${environment.API}`;

    constructor(private http: HttpClient){}

    sectors(search?: string): any{
      return this.http.get<Sector[]>(`${this.API}sectors/${search}`);
    }

    createSector(sector: any): any{
      return this.http.post(`${this.API}sector`, sector);
    }

    sectorById(id: string): any{
      return this.http.get<Sector>(`${this.API}sector/${id}`);
    }

    editSector(sector: any): any{
      return this.http.put(`${this.API}sector/${sector.id}`, sector);
    }

    deleteSector(id: string): any{
      return this.http.delete(`${this.API}sector/${id}`);
    }
}
