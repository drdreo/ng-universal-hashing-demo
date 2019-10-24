import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();


const DIST_FOLDER = join(process.cwd(), 'dist');


const servers = [
    {
        name: 'site1',
        server: express(),
        port: 4002,
        supportedLocales: ['it', 'en', 'fr'],
        folder: join(DIST_FOLDER, 'site1')
    },
    {
        name: 'site2',
        server: express(),
        port: 4001,
        supportedLocales: ['it', 'en', 'es'],
        folder: join(DIST_FOLDER, 'site2')
    }
];



const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./server/main');

servers.map(app => {

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    app.server.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [
            provideModuleMap(LAZY_MODULE_MAP),
        ]
    }));

    app.server.set('view engine', 'html');
    app.server.set('views', app.folder);

    // Server static files from
    app.server.get('*.*', express.static(app.folder, {maxAge: '1y'}));

    app.server.get('*', (req, res) => {
        // this is for i18n
        const defaultLocale = 'en';
        const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);

        // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
        const locale = (matches && app.supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;


        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip.substr(0, 7) === '::ffff:') {
            ip = ip.substr(7);
        }

        res.render(`${locale}/index`, {
            req,
            providers: [
                {provide: 'language', useFactory: () => locale, deps: []},
                {provide: 'ip', useFactory: () => ip, deps: []}
            ]
        });
    });



    // Start up the Node server
    app.server.listen(app.port, () => {
        console.log(`Node Express server for ${app.name} listening on http://localhost:${app.port}`);
    });
});
