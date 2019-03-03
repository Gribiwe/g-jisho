/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GjishoTestModule } from '../../../test.module';
import { KanjiRecordUpdateComponent } from 'app/entities/kanji-record/kanji-record-update.component';
import { KanjiRecordService } from 'app/entities/kanji-record/kanji-record.service';
import { KanjiRecord } from 'app/shared/model/kanji-record.model';

describe('Component Tests', () => {
    describe('KanjiRecord Management Update Component', () => {
        let comp: KanjiRecordUpdateComponent;
        let fixture: ComponentFixture<KanjiRecordUpdateComponent>;
        let service: KanjiRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GjishoTestModule],
                declarations: [KanjiRecordUpdateComponent]
            })
                .overrideTemplate(KanjiRecordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KanjiRecordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KanjiRecordService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new KanjiRecord(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.kanjiRecord = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new KanjiRecord();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.kanjiRecord = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
