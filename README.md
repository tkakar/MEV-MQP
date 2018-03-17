# MEV-MQP

## Setup
### Dependencies
* NodeJS & NPM (download the most recent version for your OS at https://nodejs.org/en/download/)
* Postgres (download the most recent version for your OS at https://www.postgresql.org/download/)
* (OPTIONAL mac/linux only) Redis (download the most recent version for your OS at https://redis.io/download)
** Follow the instructions at (http://rejson.io/#building-and-loading-the-module) to set up the json module for redis 

### Database
#### Set-up PostgreSQL DB
1. Run the command '```createdb faers```' in your command line interface
2. Download our DB dump file from the Google Drive called latest.sql
3. Run the command '```psql faers < latest.sql```' to import data into the database (this may take some time)

#### Dump PostgreSQL DB
1. run the command '```pg_dump -h localhost -U mevuser -W -d faers > latest.sql```' in the postgres command line interface

### Local Startup
1. Navigate to outermost folder in the repository on your computer
2. Run ```npm install```
3. Navigate to front-end folder
4. Run ```npm install```
5. Navigate to back-end folder
6. Run ```npm install```
7. Naviate to outermost `mev-mqp` folder
8. Run ```npm start``` to start the application

### Remote Startup
1. SSH into the `mev.wpi.edu` machine and navigate to `/MEV/back-end`
2. It is reccomended to run the server in a linux **screen** session
    - If needed, create a new screen by typing `screen`
    - Use `screen -list` to find the name of the screen
    - Re-attach to a screen with `screen -r` *`name`*
    - Detach from a screen by pressing `ctrl + a` followed by `d`
3. If the node server is running you can stop it with `ctrl-c`
4. Start the server by running `npm run startBoth`. This starts the node server and the redis cache
5. Detach from the screen by pressing `ctrl + a` followed by `d`

### Remote Deploy
1. SSH into the `mev.wpi.edu` machine and stop the node server with `ctrl-c`
2. Inside of the `mev-mqp` folder run the `deploy.sh` file as '`sh deploy.sh` *`username`*' where username is your user account name on the `mev.wpi.edu` machine. 
    - This will build the React app into a single build folder *-this should not be pushed to github-*
    - Copy this folder and the app.js to your user on the remote server
    - Delete the previous build folder and app.js on the remote server
    - Move the files from your user to the `/MEV/back-end` directory 
3. This will require you to enter your `mev.wpi.edu` system account a few times.
4. SSH into the `mev.wpi.edu` machine to start the node server again.

## Project Layout  
|-back-end  
|-front-end  
|____public  
|____src  
| |____resources  
| |____components  
| | |____visualization  
| | | |____components  
| | | | |____demographics  
| | | | | |____components  
| | | | | | |____components  
| | | | |____timeline  
| | | | | |____components  
| | | | | | |____components  
| | | | |____treeMap  
| | | | | |____components  
| | |____portal  
| | | |____images  
| | | |____userComponents  
| | |____cases  
| | |____components  
| | |____editor  
| | | |____images  
| | |____reports  
| | | |____components  
| |____actions  
| |____reducers  

## Working on the Front End
To make changes to the UI and other aspects of the front end, you must edit assets found in the front-end folder.

## Working with React + Redux

## Working on the Visualization page
Assets for the visualization page exist within the visualization folder src/components/visualization.  
visualization/App.js uses the components for the treemaps, demographics, and timeline which assets are each in their respective folder inside visualization/components.

## Working on the Reports Listing page
Assets for the reports listing page exist within the reports folder src/components/reports.  
reports/ReportsList.jsx uses the components for the report listing grid which assets are all contained in teh folder reports/components.

## Working on the Narrative Editor page
All assets for the narrative editor page exist within the editor folder src/components/editor   

## Working on the Login page, About page, or Dashboard page
All assets for these pages exist within the portal folder src/components/portal   
Assets for the dashboard page exist inside the portal/userComponents folder.

## Working on the Back End
Our backend is a one file server that recieves requests sent from the front end located at back-end/App.js

### Adding and modifying endpoints
We use the express library (https://expressjs.com/) for our backend and documentation for use can be found at https://expressjs.com/en/4x/api.html#app.
