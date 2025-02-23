# [YAPEXT - yet another personal expenses tracker][repo]

Like [redline][redline] but simplified.

## Requirements

- [node 20][node]
- capacitor 7
- [vue 3.5][vue]
- [dexie 4][dexie]
- [date-fns 4][date-fns]
- [@mdi/font 7][mdi]
- vue-data-ui 2.6

## Running this example

To run the provided example, you can use `npm start` command.

```bash
npm run dev
```

## Mobile support

Add android (or ios) support into capacitor project:

```bash
npm install @capacitor/android
npx cap add android
```

Then every time you want a mobile app build, open the _android_ folder with
android studio ad build it.

Whenever you make an application change, build and sync:

```bash
npm run build
npm run sync
```

See [these instructions][workflow] for more details.

## Created with Capacitor Create App

This app was created using [`@capacitor/create-app`][capacitor],
and comes with a very minimal shell for building an app.

[repo]: https://github.com/sombriks/yapext
[capacitor]: https://github.com/ionic-team/create-capacitor-app
[redline]: https://github.com/sombriks/redline
[mdi]: https://pictogrammers.com/library/mdi
[dexie]: https://dexie.org
[vue]: https://vuejs.org/guide/components/v-model.html
[date-fns]: https://date-fns.org/docs/Getting-Started
[node]: https://nodejs.org
[workflow]: https://capacitorjs.com/docs/basics/workflow
