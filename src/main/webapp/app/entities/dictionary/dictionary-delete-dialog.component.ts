import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary-delete-dialog',
    templateUrl: './dictionary-delete-dialog.component.html'
})
export class DictionaryDeleteDialogComponent {
    dictionary: IDictionary;

    constructor(
        protected dictionaryService: DictionaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictionaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dictionaryListModification',
                content: 'Deleted an dictionary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dictionary-delete-popup',
    template: ''
})
export class DictionaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dictionary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DictionaryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dictionary = dictionary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/dictionary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/dictionary', { outlets: { popup: null } }]);
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
