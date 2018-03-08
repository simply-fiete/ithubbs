import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { IthubbsSharedModule, UserRouteAccessService } from './shared';
import { IthubbsAppRoutingModule} from './app-routing.module';
import { IthubbsHomeModule } from './home/home.module';
import { IthubbsAdminModule } from './admin/admin.module';
import { IthubbsAccountModule } from './account/account.module';
import { IthubbsEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { LocalGroupsComponent } from './local-groups/local-groups.component';
import { RegionalConferencesComponent } from './regional-conferences/regional-conferences.component';
import { ParticipateComponent } from './participate/participate.component';
import { CurrentCampaignsComponent } from './current-campaigns/current-campaigns.component';

@NgModule({
    imports: [
        BrowserModule,
        IthubbsAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        IthubbsSharedModule,
        IthubbsHomeModule,
        IthubbsAdminModule,
        IthubbsAccountModule,
        IthubbsEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        UpcomingEventsComponent,
        LocalGroupsComponent,
        RegionalConferencesComponent,
        ParticipateComponent,
        CurrentCampaignsComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class IthubbsAppModule {}
