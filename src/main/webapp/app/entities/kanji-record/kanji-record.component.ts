import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { AccountService } from 'app/core';
import { KanjiRecordService } from './kanji-record.service';

@Component({
    selector: 'jhi-kanji-record',
    templateUrl: './kanji-record.component.html'
})
export class KanjiRecordComponent implements OnInit, OnDestroy {
    kanjiRecords: IKanjiRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected kanjiRecordService: KanjiRecordService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
