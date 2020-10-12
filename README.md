# Npod

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

Npod is a simple Angular project using an open API of the NASA providing images of space in a daily basis. The goal of the project is to show an exemple of good implementation (in my opinion, based on my experience) of an Angular project that is easy to build, maintain and evolve.

Each folder includes a `_README` file that explains briefly the purpose of the folder in the architecture.

Each component is commented to explain the code.

> (Note.1) As I'm a bit lazy and that is not the purpose of the project, there is no unit testing in there. Maybe someday, I'll write the unit tests, who knows.

> (Note.2) There is no optimisation in requests made to the NASA API to ease the number of resquests made. Optimisations that can easily be made by storing in memory the days already asked before. But, again, it was not the purpose of the project which is just an exemple of architecture.

> (Note.3) After running the project, you probably see some 404 pictures. It's because the API not only provides pictures but sometimes videos. For simplicity, I managed only pictures content and place a default 404 image when the content is something else.

## Prepare your environment

If you try to start the project you will get an error involving a `secret.ts` file that is not in the repository. As I said I use an open API made by the NASA. I didn't write any backend server to manage the calls to this API, I made it directly in the Angular project for the sake of simplicity. So I need the API key in the Angular project, and, for sure I don't want to push this key on the repository.

So if you want to run it you have to get an API key here : https://api.nasa.gov/ and then create a file `secret.ts` in the `src` folder looking like the following:

```typescript
export const APOD_API_KEY = "<YOUR_API_KEY>";
```

With your key you should be able to run the project now.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

