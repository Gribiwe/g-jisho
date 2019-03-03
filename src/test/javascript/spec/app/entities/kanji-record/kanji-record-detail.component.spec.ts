/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GjishoTestModule } from '../../../test.module';
import { KanjiRecordDetailComponent } from 'app/entities/kanji-record/kanji-record-detail.component';
import { KanjiRecord } from 'app/shared/model/kanji-record.model';

describe('Component Tests', () => {
    describe('KanjiRecord Management Detail Component', () => {
        let comp: KanjiRecordDetailComponent;
        let fixture: ComponentFixture<KanjiRecordDetailComponent>;
        const route = ({ data: of({ kanjiRecord: new KanjiRecord(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GjishoTestModule],
                declarations: [KanjiRecordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KanjiRecordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KanjiRecordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.kanjiRecord).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
