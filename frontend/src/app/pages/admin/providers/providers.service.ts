import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Provider } from './provider.model';

import { environment } from '../../../../environments/environment';

@Injectable()

export class ProvidersService {

    private readonly API = `${environment.API}`;

    constructor(private http: HttpClient){}

    provider(search?: string): any{
      return this.http.get<Provider[]>(`${this.API}providers/${search}`);
    }

    providerById(id: string): any{
      return this.http.get<Provider>(`${this.API}provider/${id}`);
    }

    createProvider(provider: any): any{
      return this.http.post(`${this.API}provider`, provider);
    }

    editProvider(provider: any): any{
      return this.http.put(`${this.API}provider/${provider.id}`, provider);
    }

    deleteProvider(id: string): any{
      return this.http.delete(`${this.API}provider/${id}`);
    }
}
