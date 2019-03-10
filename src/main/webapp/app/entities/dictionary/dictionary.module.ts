import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GjishoSharedModule } from 'app/shared';
import {
    DictionaryComponent,
    DictionaryDetailComponent,
    DictionaryUpdateComponent,
    DictionaryDeletePopupComponent,
    DictionaryDeleteDialogComponent,
    KanjiRecordDeleteDialogComponent,
    KanjiRecordDeletePopupComponent,
    dictionaryRoute,
    kanjiRecordPopupRoute,
    dictionaryPopupRoute
} from './';

const ENTITY_STATES = [...dictionaryRoute, ...dictionaryPopupRoute, ...kanjiRecordPopupRoute];

@NgModule({
    imports: [GjishoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DictionaryComponent,
        DictionaryDetailComponent,
        DictionaryUpdateComponent,
        DictionaryDeleteDialogComponent,
        DictionaryDeletePopupComponent,
        KanjiRecordDeleteDialogComponent,
        KanjiRecordDeletePopupComponent
    ],
    entryComponents: [
        DictionaryComponent,
        DictionaryUpdateComponent,
        DictionaryDeleteDialogComponent,
        DictionaryDeletePopupComponent,
        KanjiRecordDeleteDialogComponent,
        KanjiRecordDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GjishoDictionaryModule {}
