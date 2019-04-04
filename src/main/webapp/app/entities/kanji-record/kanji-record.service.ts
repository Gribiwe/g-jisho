import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { IDictionary } from 'app/shared/model/dictionary.model';

type EntityResponseType = HttpResponse<IKanjiRecord>;
type EntityArrayResponseType = HttpResponse<IKanjiRecord[]>;

@Injectable({ providedIn: 'root' })
export class KanjiRecordService {
    public resourceUrl = SERVER_API_URL + 'api/kanji-records';

    constructor(protected http: HttpClient) {}

    create(kanjiRecord: IKanjiRecord): Observable<EntityResponseType> {
        return this.http.post<IKanjiRecord>(this.resourceUrl, kanjiRecord, { observe: 'response' });
    }

    update(kanjiRecord: IKanjiRecord): Observable<EntityResponseType> {
        return this.http.put<IKanjiRecord>(this.resourceUrl, kanjiRecord, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IKanjiRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IKanjiRecord[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    copy(kanhiRecord: number, dictionary: number): Observable<HttpResponse<IDictionary>> {
        return this.http.get<IDictionary>(`${this.resourceUrl}/copy/${kanhiRecord}/${dictionary}`, { observe: 'response' });
    }
}
