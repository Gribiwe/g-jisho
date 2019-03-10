import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KanjiRecord } from 'app/shared/model/kanji-record.model';
import { KanjiRecordService } from './kanji-record.service';
import { KanjiRecordComponent } from './kanji-record.component';
import { KanjiRecordDetailComponent } from './kanji-record-detail.component';
import { KanjiRecordUpdateComponent } from './kanji-record-update.component';
import { KanjiRecordDeletePopupComponent } from '../dictionary/kanji-record-delete-dialog.component';
import { IKanjiRecord } from 'app/shared/model/kanji-record.model';

@Injectable({ providedIn: 'root' })
export class KanjiRecordResolve implements Resolve<IKanjiRecord> {
    constructor(private service: KanjiRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKanjiRecord> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<KanjiRecord>) => response.ok),
                map((kanjiRecord: HttpResponse<KanjiRecord>) => kanjiRecord.body)
            );
        }
        return of(new KanjiRecord());
    }
}

export const kanjiRecordRoute: Routes = [
    {
        path: '',
        component: KanjiRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KanjiRecords'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: KanjiRecordDetailComponent,
        resolve: {
            kanjiRecord: KanjiRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KanjiRecords'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: KanjiRecordUpdateComponent,
        resolve: {
            kanjiRecord: KanjiRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KanjiRecords'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: KanjiRecordUpdateComponent,
        resolve: {
            kanjiRecord: KanjiRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KanjiRecords'
        },
        canActivate: [UserRouteAccessService]
    }
];
