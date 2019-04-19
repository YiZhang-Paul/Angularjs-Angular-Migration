import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

type EmitData = { name: string; payload: any };

@Injectable({
    providedIn: 'root'
})
export class EventManagerService {

    private _emitter: EventEmitter<EmitData> = new EventEmitter<EmitData>();

    public emit(name, payload = {}): void {

        this._emitter.emit({ name, payload });
    }

    public subscribe(name, callback: Function): Subscription {

        return this._emitter.subscribe((data: EmitData) => {

            if (data.name === name) {

                callback(data.payload);
            }
        });
    }
}
