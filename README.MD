# Craku = CRA on Heroku

Easily create a CRA (create-react-app) project on Heroku

## Prerequisites

1. [NodeJS](https://nodejs.org/)
2. [Git](https://git-scm.com/)
3. Register on [Heroku](heroku.com)
4. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)


## Installation

Note: All of the commands described below should be executed on the project's root directory.

1. 	Clone or download this repo.

2. 	Run `npm install`.

3. 	Install CRA project: `npx create-react-app fe`.  
	The name must be `fe`, otherwise the Heroku build will fail.

4. 	(If needed - Login to Heroku CLI: `heroku login`.)

5. 	Create your Heroku app: `heroku create {heroku_app_name}`.  
	This will determine your app's URL: `{heroku_app_name}.herokuapp.com`.

6. 	(If needed - Delete the `fe/.git` directory, or alternatively, add it as a submodule.)

7. 	Commit all changes: `git add .` and then `git commit -m "create cra project"`.

8. 	Deploy your code to Heroku: `git push heroku master`.

9. 	That's it! Open your new Heroku app: `heroku open`.

## CI/CD

To update your project on Heroku, simply commit changes and run `git push heroku master`.