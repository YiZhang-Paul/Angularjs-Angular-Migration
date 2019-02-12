import { Component, Input } from '@angular/core';
// TODO: need tests
@Component({
    selector: 'user-widget',
    styles: [`${require('./user-widget.scss')}`],
    template: require('./user-widget.html')
})
export class UserWidgetComponent {

    @Input() public user: any;
}
