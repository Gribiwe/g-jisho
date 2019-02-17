import { NgModule } from '@angular/core';

import { GjishoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GjishoSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GjishoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GjishoSharedCommonModule {}
