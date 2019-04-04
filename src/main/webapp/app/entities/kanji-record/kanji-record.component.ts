import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { AccountService } from 'app/core';
import { KanjiRecordService } from './kanji-record.service';
import { DictionaryService } from 'app/entities/dictionary';
import { Dictionary, IDictionary } from 'app/shared/model/dictionary.model';

@Component({
    selector: 'jhi-kanji-record',
    templateUrl: './kanji-record.component.html'
})
export class KanjiRecordComponent implements OnInit, OnDestroy {
    kanjiRecords: IKanjiRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;
    myDictionaries: IDictionary[];
    seelctedDictionary: IDictionary;

    constructor(
        protected kanjiRecordService: KanjiRecordService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected dictionaryService: DictionaryService
    ) {}

    loadAll() {
        this.kanjiRecordService
            .query()
            .pipe(
                filter((res: HttpResponse<IKanjiRecord[]>) => res.ok),
                map((res: HttpResponse<IKanjiRecord[]>) => res.body)
            )
            .subscribe(
                (res: IKanjiRecord[]) => {
                    this.kanjiRecords = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKanjiRecords();
        this.dictionaryService
            .getMy()
            .pipe(
                filter((res: HttpResponse<IDictionary[]>) => res.ok),
                map((res: HttpResponse<IDictionary[]>) => res.body)
            )
            .subscribe(
                (res: IDictionary[]) => {
                    this.myDictionaries = res;
                    this.seelctedDictionary = this.myDictionaries[0];
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKanjiRecord) {
        return item.id;
    }

    registerChangeInKanjiRecords() {
        this.eventSubscriber = this.eventManager.subscribe('kanjiRecordListModification', response => this.loadAll());
    }

    selectedDictionaryContainsKanji(kanji: number) {
        let result = false;
        this.seelctedDictionary.kanjiRecords.forEach(kanjiIn => {
            if (kanjiIn.id === kanji) {
                result = true;
                return;
            }
        });
        return result;
    }

    copy(kanjiRecord: IKanjiRecord) {
        this.kanjiRecordService.copy(kanjiRecord.id, this.seelctedDictionary.id).subscribe(
            responce => {
                this.seelctedDictionary.kanjiRecords = responce.body.kanjiRecords;
                this.jhiAlertService.info('Copied kanji ' + kanjiRecord.value + ' to the dictionary ' + this.seelctedDictionary.name);
            },
            (res: HttpErrorResponse) => {
                if (res.status === 400) {
                    this.onError('This kanji record is already in dictionary ' + this.seelctedDictionary.name);
                } else {
                    this.onError(res.message);
                }
            }
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
