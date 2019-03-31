import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { IUser, UserService } from 'app/core';
import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { KanjiRecordService } from 'app/entities/kanji-record';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-dictionary-update',
    templateUrl: './dictionary-update.component.html'
})
export class DictionaryUpdateComponent implements OnInit {
    dictionary: IDictionary;
    isSaving: boolean;
    isNameError: boolean;

    users: IUser[];
    kanjirecords: IKanjiRecord[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected dictionaryService: DictionaryService,
        protected userService: UserService,
        protected kanjiRecordService: KanjiRecordService,
        protected activatedRoute: ActivatedRoute
    ) {
        this.isNameError = false;
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dictionary }) => {
            this.dictionary = dictionary;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.kanjiRecordService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IKanjiRecord[]>) => mayBeOk.ok),
                map((response: HttpResponse<IKanjiRecord[]>) => response.body)
            )
            .subscribe((res: IKanjiRecord[]) => (this.kanjirecords = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        if (this.dictionary.name === '' || this.dictionary.name === undefined) {
            this.isNameError = true;
        } else {
            this.isSaving = true;
            if (this.dictionary.id !== undefined) {
                this.subscribeToSaveResponse(this.dictionaryService.update(this.dictionary));
            } else {
                this.subscribeToSaveResponse(this.dictionaryService.create(this.dictionary));
            }
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDictionary>>) {
        result.subscribe((res: HttpResponse<IDictionary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackKanjiRecordById(index: number, item: IKanjiRecord) {
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
