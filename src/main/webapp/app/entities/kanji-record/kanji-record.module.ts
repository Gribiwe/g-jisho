import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GjishoSharedModule } from 'app/shared';
import {
    KanjiRecordComponent,
    KanjiRecordDetailComponent,
    KanjiRecordUpdateComponent,
    KanjiRecordDeletePopupComponent,
    KanjiRecordDeleteDialogComponent,
    kanjiRecordRoute,
    kanjiRecordPopupRoute
} from './';

const ENTITY_STATES = [...kanjiRecordRoute, ...kanjiRecordPopupRoute];

@NgModule({
    imports: [GjishoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        KanjiRecordComponent,
        KanjiRecordDetailComponent,
        KanjiRecordUpdateComponent,
        KanjiRecordDeleteDialogComponent,
        KanjiRecordDeletePopupComponent
    ],
    entryComponents: [KanjiRecordComponent, KanjiRecordUpdateComponent, KanjiRecordDeleteDialogComponent, KanjiRecordDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GjishoKanjiRecordModule {}
