import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dictionary',
                loadChildren: './dictionary/dictionary.module#GjishoDictionaryModule'
            },
            {
                path: 'kanji-record',
                loadChildren: './kanji-record/kanji-record.module#GjishoKanjiRecordModule'
            },
            {
                path: 'dictionary',
                loadChildren: './dictionary/dictionary.module#GjishoDictionaryModule'
            },
            {
                path: 'kanji-record',
                loadChildren: './kanji-record/kanji-record.module#GjishoKanjiRecordModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GjishoEntityModule {}
