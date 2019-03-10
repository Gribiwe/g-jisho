import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GjishoSharedModule } from 'app/shared';
import { KanjiRecordComponent, KanjiRecordDetailComponent, KanjiRecordUpdateComponent, kanjiRecordRoute } from './';

const ENTITY_STATES = [...kanjiRecordRoute];

@NgModule({
    imports: [GjishoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [KanjiRecordComponent, KanjiRecordDetailComponent, KanjiRecordUpdateComponent],
    entryComponents: [KanjiRecordComponent, KanjiRecordUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GjishoKanjiRecordModule {}
