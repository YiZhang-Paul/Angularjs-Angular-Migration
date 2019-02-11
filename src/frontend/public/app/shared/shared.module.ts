import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { $rootScopeProvider } from './upgraded-providers/$rootScope.provider';
import { $stateProvider } from './upgraded-providers/$state.provider';
import { authenticatorProvider } from './upgraded-providers/authenticator.provider';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        $rootScopeProvider,
        $stateProvider,
        authenticatorProvider
    ]
})
export class SharedModule { }