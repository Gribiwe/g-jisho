/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GjishoTestModule } from '../../../test.module';
import { KanjiRecordComponent } from 'app/entities/kanji-record/kanji-record.component';
import { KanjiRecordService } from 'app/entities/kanji-record/kanji-record.service';
import { KanjiRecord } from 'app/shared/model/kanji-record.model';

describe('Component Tests', () => {
    describe('KanjiRecord Management Component', () => {
        let comp: KanjiRecordComponent;
        let fixture: ComponentFixture<KanjiRecordComponent>;
        let service: KanjiRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GjishoTestModule],
                declarations: [KanjiRecordComponent],
                providers: []
            })
                .overrideTemplate(KanjiRecordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KanjiRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KanjiRecordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new KanjiRecord(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.kanjiRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
