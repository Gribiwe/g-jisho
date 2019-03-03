import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKanjiRecord } from 'app/shared/model/kanji-record.model';

@Component({
    selector: 'jhi-kanji-record-detail',
    templateUrl: './kanji-record-detail.component.html'
})
export class KanjiRecordDetailComponent implements OnInit {
    kanjiRecord: IKanjiRecord;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kanjiRecord }) => {
            this.kanjiRecord = kanjiRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}
