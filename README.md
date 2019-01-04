# Migrating AngularJs to Angular 2+

This is a sample application to demonstrate how we can migrate our code base from AngularJs to Angular 2+. There are multiple steps involved to help us migrate AngularJs to Angular 2+ over a period of time (for example, 3 to 6 months) instead of doing the migration all at once - less pressure, no downtime, and we are free to add new features at the same time.

The fundamental idea is to migrate AngularJs to Angualar 2+ one component at a time, while having AngularJs and Angular 2+ co-exist and interoperate with each other - we choose when to migrate which component as we see fit, and the application still functions flawlessly throughout the entire migration process.

However, not every AngularJs application can be migrated this way - not when the code is non-modular or inconsistently structured, or the code is using patterns that don't work well with Angular 2+. For this reason, we want to make sure our AngularJs code is modular and well structured enough before we start migrating:

1. we start off with an AngularJs application that is non-modular, inconsistently structured and with other bad practices;
2. we refactor the application so it's modular, well structured and more compatible with Angular 2+ conventions;
3. we migrate the application one component at a time, while having a AngularJs-Angular hybrid;
4. we migrate all components and we transform the application to a complete Angular 2+ application;
5. we can optionally (strongly recommended) incorporate TypeScript in our application.

You can find the source code for every step of the migration process under corresponding branches, and every step will have accompanying guide documenting important details during the step.
