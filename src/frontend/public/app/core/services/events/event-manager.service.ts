import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { IEmitData } from '../../interfaces/events/emit-data.interface';

@Injectable({
    providedIn: 'root'
})
export class EventManagerService {

    private _emitter: EventEmitter<IEmitData> = new EventEmitter<IEmitData>();

    public emit(name: string, payload: any = {}): void {

        this._emitter.emit({ name, payload });
    }

    public subscribe(name: string, callback: Function): Subscription {

        return this._emitter.subscribe((data: IEmitData) => {

            if (data.name === name) {

                callback(data.payload);
            }
        });
    }
}
