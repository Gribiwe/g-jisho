import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GjishoSharedModule } from 'app/shared';
import {
    DictionaryComponent,
    DictionaryDetailComponent,
    DictionaryUpdateComponent,
    DictionaryDeletePopupComponent,
    DictionaryDeleteDialogComponent,
    dictionaryRoute,
    dictionaryPopupRoute
} from './';

const ENTITY_STATES = [...dictionaryRoute, ...dictionaryPopupRoute];

@NgModule({
    imports: [GjishoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DictionaryComponent,
        DictionaryDetailComponent,
        DictionaryUpdateComponent,
        DictionaryDeleteDialogComponent,
        DictionaryDeletePopupComponent
    ],
    entryComponents: [DictionaryComponent, DictionaryUpdateComponent, DictionaryDeleteDialogComponent, DictionaryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GjishoDictionaryModule {}
