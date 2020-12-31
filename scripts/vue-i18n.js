'use strict';

const fs = require('fs')


function transform(...langs) {
    const out = {}
    langs.forEach(lang => {
        out[lang] = {}
        JSON.parse(fs.readFileSync(`i18n/${lang}.json`, { encoding: 'utf-8' })).forEach(item => {
            out[lang][item.id] = item.translation
        })
    })

    fs.writeFileSync(`layouts/partials/i18n/messages.json`, JSON.stringify(out))
}

transform('sl', 'en')
