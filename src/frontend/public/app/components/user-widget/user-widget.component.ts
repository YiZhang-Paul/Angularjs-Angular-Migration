import { Component, Input } from '@angular/core';
// TODO: need tests
@Component({
    selector: 'user-widget',
    styles: [`${require('./user-widget.css')}`],
    template: require('./user-widget.html')
})
export class UserWidgetComponent {

    @Input() public name = 'John Doe';
}
