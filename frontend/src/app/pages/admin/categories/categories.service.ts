import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Category } from './categories.model';

import { environment } from '../../../../environments/environment';

@Injectable()

export class CategoriesService {

    private readonly API = `${environment.API}`;

    constructor(private http: HttpClient){}

    categories(search?: string): any{
        return this.http.get<Category[]>(`${this.API}categories/${search}`);
    }

    categoryById(id: string): any{
        return this.http.get<Category>(`${this.API}categories/${id}`);
    }

    createCategory(category: any): any{
        return this.http.post(`${this.API}category`, category);
    }

    editCategory(category: any): any{
        return this.http.put(`${this.API}category/${category.id}`, category);
    }

    deleteCategory(id: string): any{
      return this.http.delete(`${this.API}category/${id}`);
    }

}
