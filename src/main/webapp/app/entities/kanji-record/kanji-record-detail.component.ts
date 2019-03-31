import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-kanji-record-detail',
    templateUrl: './kanji-record-detail.component.html'
})
export class KanjiRecordDetailComponent implements OnInit {
    kanjiRecord: IKanjiRecord;
    currentAccount: any;

    constructor(protected activatedRoute: ActivatedRoute, protected accountService: AccountService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kanjiRecord }) => {
            this.kanjiRecord = kanjiRecord;
        });
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }

    previousState() {
        window.history.back();
    }
}
