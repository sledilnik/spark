# spark

## About 

TODO: add description

## Development

Site is build tusing static page generator [HUGO](https://gohugo.io). Because site is not typical blog, there are some tricks. It uses a lot of `url` params in front matter, so pretty much all URLs are custom. Besides HUGO, yarn is needed to install dependencies.

### Running development server

Provided makefile will run HUGO server in Docker, so nothing needs to be installed on system (except for Docker). It is also possible to install HUGO on system, see [instructions](https://gohugo.io/getting-started/installing)

```
yarn
make run
```


### Organization

```
.
├── assets
|   ├── scripts // javascripts
|   └── styles // css/scss styles
├── content
|   └── pages // containing pages with mostly text content
|   |   ├── landing  // translatable blocks for home/landing page
|   |   |   ├── cols
|   |   |   |   ├── col-1.en.md // first column on bottom of landing page (en)
|   |   |   |   ├── col-1.sl.md // first column on bottom of landing page (sl)
|   |   |   |   └── ...
|   |   |   └── sparks // sparks (collapsables) on home page (number prefixed for order)
|   |   |       ├── 1-S-en.md
|   |   |       ├── 1-S-sl.md
|   |   |       └── ...
|   |   ├── faq.en.md // english version of FAQ page
|   |   ├── faq.sl.md // slovenian version of FAQ page
|   |   └── ...
|   ├── sms // pages with SMS generators
|   |   ├── A.en.md // Page for sending SPARK A SMS (en)
|   |   ├── A.sl.md // Page for sending SPARK A SMS (sl)
|   |   └── ...
|   └── _index.md // dummy file, required by HUGO but unused
├── i18n // localization strings
├── layouts // layouts for rendering content
└── static // static resources for page
```

## Translations

Content pages (files under `/content` folder) are translated by extension.

## Deployment

See [deployments](https://github.com/sledilnik/spark/deployments)

Stagging environment is deployed on every push to master (unless commit message contains word NODEPLOY)
Production is deployed when release is created (create new release [here](https://github.com/sledilnik/spark/releases))