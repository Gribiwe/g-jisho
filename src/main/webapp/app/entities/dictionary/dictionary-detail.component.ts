import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { KanjiRecordDeleteDialogComponent } from 'app/entities/dictionary/kanji-record-delete-dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-dictionary-detail',
    templateUrl: './dictionary-detail.component.html'
})
export class DictionaryDetailComponent implements OnInit {
    dictionary: IDictionary;
    currentAccount: any;
    protected ngbModalRef: NgbModalRef;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        protected modalService: NgbModal,
        protected dictionaryService: DictionaryService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dictionary }) => {
            this.dictionary = dictionary;
        });
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }

    deleteKanji() {
        this.ngbModalRef = this.modalService.open(KanjiRecordDeleteDialogComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
    }

    toKanji(kanjiId: number) {
        window.location.href = '/#/kanji-record/' + kanjiId + '/edit';
    }

    previousState() {
        window.history.back();
    }
}
