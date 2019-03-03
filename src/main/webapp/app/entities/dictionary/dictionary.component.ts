import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { AccountService } from 'app/core';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary',
    templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {
    dictionaries: IDictionary[];
    alldictionaries: IDictionary[];
    currentAccount: any;
    eventSubscriber: Subscription;
    showingOther: boolean;

    constructor(
        protected dictionaryService: DictionaryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.showingOther = true;
        this.dictionaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IDictionary[]>) => res.ok),
                map((res: HttpResponse<IDictionary[]>) => res.body)
            )
            .subscribe(
                (res: IDictionary[]) => {
                    this.alldictionaries = res.filter(value => !this.isOnMyDictionaries(value));
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    isOnMyDictionaries(value: IDictionary) {
        let b = false;
        this.dictionaries.forEach(item => {
            if (item.id === value.id) b = true;
        });
        return b;
    }

    loadMy() {
        this.showingOther = false;
        this.dictionaryService
            .getMy()
            .pipe(
                filter((res: HttpResponse<IDictionary[]>) => res.ok),
                map((res: HttpResponse<IDictionary[]>) => res.body)
            )
            .subscribe(
                (res: IDictionary[]) => {
                    this.dictionaries = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadMy();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDictionaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDictionary) {
        return item.id;
    }

    registerChangeInDictionaries() {
        this.eventSubscriber = this.eventManager.subscribe('dictionaryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
