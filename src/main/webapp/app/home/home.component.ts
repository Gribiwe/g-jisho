import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service.ts';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IDictionary } from 'app/shared/model/dictionary.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    isStart: String;
    dictionaries: IDictionary[];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private dictionaryService: DictionaryService
    ) {}

    ngOnInit() {
        this.isStart = 'start';

        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    setHomeStart() {
        this.isStart = 'start';
    }

    setYourDictionaries() {
        this.isStart = 'yod';
    }

    setOtherDictionaries() {
        this.isStart = 'othd';
    }

    setFindKanji() {
        this.isStart = 'fkanji';
    }

    isHomeStart() {
        return this.isStart === 'start';
    }

    isYourDictionaries() {
        return this.isStart === 'yod';
    }

    isOtherDictionariest() {
        return this.isStart === 'othd';
    }

    isFindKanji() {
        return this.isStart === 'fkanji';
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getDictionaries() {
        this.dictionaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IDictionary[]>) => res.ok),
                map((res: HttpResponse<IDictionary[]>) => res.body)
            )
            .subscribe((res: IDictionary[]) => {
                this.dictionaries = res;
                console.log(this.dictionaries);
                console.log(res);
            });
    }
}
