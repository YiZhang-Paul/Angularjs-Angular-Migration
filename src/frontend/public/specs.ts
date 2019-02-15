// polyfills
import 'reflect-metadata';
// core.js
import 'core-js/es6';
import 'core-js/es7/reflect';
// zone.js
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/mocha-patch';
// rxjs
import 'rxjs';
// angularjs
import 'angular';
import 'angular-mocks';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-toastr';
// angular
import '@angular/animations';
import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/material';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';
import '@angular/upgrade';
// ui-router
import '@uirouter/angular-hybrid';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { stub } from 'sinon';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

let logStub;

before('global test setup', () => {
    // mute console log in source code
    logStub = stub(console, 'log');
});

after('global test teardown', () => {

    logStub.restore();
});

const context = require.context('.', true, /\.(t|j)s/);

context.keys().forEach(context);
