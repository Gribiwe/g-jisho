import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKanjiRecord } from 'app/shared/model/kanji-record.model';
import { KanjiRecordService } from 'app/entities/kanji-record';

@Component({
    selector: 'jhi-kanji-record-delete-dialog',
    templateUrl: './kanji-record-delete-dialog.component.html'
})
export class KanjiRecordDeleteDialogComponent {
    kanjiRecord: IKanjiRecord;

    constructor(
        protected kanjiRecordService: KanjiRecordService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kanjiRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'kanjiRecordListModification',
                content: 'Deleted an kanjiRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kanji-record-delete-popup',
    template: ''
})
export class KanjiRecordDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kanjiRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KanjiRecordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.kanjiRecord = kanjiRecord;
                let link = window.location.href;
                let dictLink = link.substring(link.indexOf('(') + 1, link.lastIndexOf('//'));
                this.ngbModalRef.result.then(
                    result => {
                        window.location.href = link.substring(0, link.indexOf('(')) + dictLink;
                        this.ngbModalRef = null;
                    },
                    reason => {
                        window.location.href = link.substring(0, link.indexOf('(')) + dictLink;
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
