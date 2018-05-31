import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        NgbCollapseModule
    ],
    declarations: [PagesComponent, SidebarComponent, HeaderComponent]
})
export class PagesModule {}

