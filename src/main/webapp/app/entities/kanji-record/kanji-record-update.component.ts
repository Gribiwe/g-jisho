import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { KanjiRecordService } from './kanji-record.service';
import { AccountService, IUser, UserService } from 'app/core';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary';

@Component({
    selector: 'jhi-kanji-record-update',
    templateUrl: './kanji-record-update.component.html'
})
export class KanjiRecordUpdateComponent implements OnInit {
    kanjiRecord: IKanjiRecord;
    isSaving: boolean;
    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected kanjiRecordService: KanjiRecordService,
        protected dictionaryService: DictionaryService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ kanjiRecord }) => {
            this.kanjiRecord = kanjiRecord;
        });
        this.accountService.identity().then(account => {
            this.kanjiRecord.creator = account;
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.dictionaryService.find(params['dictionary']).subscribe(res => (this.kanjiRecord.dictionaries = [res.body]));
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.kanjiRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.kanjiRecordService.update(this.kanjiRecord));
        } else {
            this.subscribeToSaveResponse(this.kanjiRecordService.create(this.kanjiRecord));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IKanjiRecord>>) {
        result.subscribe((res: HttpResponse<IKanjiRecord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackDictionaryById(index: number, item: IDictionary) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
