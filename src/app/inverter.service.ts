import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Inverter } from "./inverter.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class InverterService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getInverters(): Observable<Inverter[]>{
        return this.http.get<Inverter[]>(`${this.apiServerUrl}/inverters/all`);
    }
}