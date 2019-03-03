import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryDetailComponent } from './dictionary-detail.component';
import { DictionaryUpdateComponent } from './dictionary-update.component';
import { DictionaryDeletePopupComponent } from './dictionary-delete-dialog.component';
import { IDictionary } from 'app/shared/model/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryResolve implements Resolve<IDictionary> {
    constructor(private service: DictionaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDictionary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Dictionary>) => response.ok),
                map((dictionary: HttpResponse<Dictionary>) => dictionary.body)
            );
        }
        return of(new Dictionary());
    }
}

export const dictionaryRoute: Routes = [
    {
        path: '',
        component: DictionaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DictionaryDetailComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DictionaryUpdateComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DictionaryUpdateComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictionaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DictionaryDeletePopupComponent,
        resolve: {
            dictionary: DictionaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dictionaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
