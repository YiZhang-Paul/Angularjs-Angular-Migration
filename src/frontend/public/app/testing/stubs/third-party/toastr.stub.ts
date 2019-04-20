import { ToastrService } from 'ngx-toastr';
import { stub } from 'sinon';

export function stubToastrService() {

    const stubbed = {} as ToastrService;

    stubbed.success = stub();
    stubbed.error = stub();

    return stubbed;
}
