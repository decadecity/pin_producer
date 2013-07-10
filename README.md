#Pin Producer
Small web app to produce four digit pin numbers.

##Usage
View `/dist/index.html` in a web browser.

##Directory structure

  * `dist/` - Public facing distribution files.
  * `src/` - Application source.
    * `js/` - JavaScript source files.
      * `app/` - Application logic.
        * `controller.js` - Handles all user interaction.
        * `model.js` - Stores pin number data.
        * `view.js` - Handles all DOM manipulation.
      * `lib/` - External libraries.
    * `less/` - Less source files.
    * `templates/` - Handlebars templates.
    * `test/` - Unit tests.
