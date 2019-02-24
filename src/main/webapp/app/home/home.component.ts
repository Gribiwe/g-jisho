import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    isStart: String;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
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
}
