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
7. Navigate to outermost `mev-mqp` folder
8. Run ```npm start``` to start the application

### Remote Startup
1. SSH into the `mev.wpi.edu` machine and navigate to `/MEV/back-end`
2. It is recommended to run the server in a linux **screen** session
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
    - This will build the React app into a single build folder *-this should not be pushed to GitHub-*
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
When editing the global state that Redux manages, you need to make changes in several different locations.  

#### Useful Readings/Videos for Learning React and Redux

  - [Thinking In React](https://facebook.github.io/react/docs/thinking-in-react.html)
  - [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)
  - [React Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)
  - [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)

  - [Helpful Youtube Channel](https://www.youtube.com/user/learncodeacademy/videos)
  - [React and Redux Rapid Course Video Series](https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)

#### Outgoing Web Fetch Calls
All asynchronous http requests are done from the `/actions` folder. This is where we talk to the back-end server to get data from our database. These async calls are created using the `fetch()` function which returns a `Promise`. Please read more about javascript promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

#### Adding to the Redux (Global) State 

When adding to the global state you must create a function inside of a file in the `/actions` folder, add a case inside of a file in the `/reducers` folder and add an import to the file you are adding to the Redux state from.

In the `timelineActions.js` file we have:
``` JavaScript
export const setTimelineMinimizedToggle = toggle =>
  dispatch => dispatch({ type: 'TOGGLE_TIMELINE_MINIMIZED', timelineMinimized: toggle });
```
In this example we are adding a value `toggle`, labeled as `timelineMinimized` with a type `TOGGLE_TIMELINE_MINIMIZED` this is just a string to know what to listen for in the Reducer. This `dispatch()` function is what we need to call in order to have this information be sent to the reducers and be added to the global state.

In the `timelineReducer.js` file we have:
``` JavaScript
export default (state = initialTimelineState, action = {}) => {
  switch (action.type) {
    case 'SET_ENTIRE_TIMELINE':
      return Object.assign({}, state, { entireTimelineData: action.entireTimelineData });
    case 'TOGGLE_TIMELINE_MINIMIZED':
      return Object.assign({}, state, { timelineMinimized: action.timelineMinimized });
    default: return state;
  }
};
```

We are listening for the same `TOGGLE_TIMELINE_MINIMIZED` type, when we find that type we are setting the state to have the `timelineMinimized` value passed from the actions.


In the `Timeline.jsx` file we use this action like such:

We import the functions from the actions.
```JavaScript
import { setTimelineMinimizedToggle, getEntireTimeline, setSelectedDate } from '../../../../actions/timelineActions';
```

We then connect these actions to the current component as `props`.
```JavaScript
export default connect(
  mapStateToProps, // Used for reading the Global state
  { setTimelineMinimizedToggle, getEntireTimeline, setSelectedDate },
)(withStyles(styles)(Timeline));
```

We add these functions to the proptypes of our component.
```JavaScript
static propTypes = {
  getEntireTimeline: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  setTimelineMinimizedToggle: PropTypes.func.isRequired,
}
```

We can call these functions from our props like this.
```JavaScript
this.props.setTimelineMinimizedToggle(true);
```

#### Getting from the Redux (Global) State 

To get from the global state, we need to check to make sure the information is in the state properly and then import and connect it into our component.

First make sure we have the proper `case` clause for the information we are looking for. From the example above, we are looking for `TOGGLE_TIMELINE_MINIMIZED` inside of the `timelineReducer.js`.
``` JavaScript
export default (state = initialTimelineState, action = {}) => {
  switch (action.type) {
    case 'SET_ENTIRE_TIMELINE':
      return Object.assign({}, state, { entireTimelineData: action.entireTimelineData });
    case 'TOGGLE_TIMELINE_MINIMIZED': // Here it is
      return Object.assign({}, state, { timelineMinimized: action.timelineMinimized });
    default: return state;
  }
};
```

We also need to make sure we have imported the `timelineReducer` into the index reducer inside of the `/reducers/index.js` file.
``` JavaScript
import demographic from './demographicReducer';
import filters from './filterReducer';
import multiSelectFilters from './multiSelectFilterReducer';
import user from './userReducer';
import mainVisualization from './visualizationReducer';
import timeline from './timelineReducer';

/**
 * Redux Reducer that combines all of the other reducers to build the Redux State
 */
export default {
  demographic,
  filters,
  multiSelectFilters,
  mainVisualization,
  timeline, // Exported as 'timeline'
  user,
};
```

We can see we import the `timelineReducer` and export it with the name `timeline`. **This name is important.**

Now we can go to our component `Timeline.jsx` and import the global state.
``` JavaScript
const mapStateToProps = state => ({
  entireTimelineData: state.timeline.entireTimelineData,
  demographicSexData: state.demographic.sex,
});

export default connect(
  mapStateToProps,
  { setTimelineMinimizedToggle, getEntireTimeline, setSelectedDate },
)(withStyles(styles)(Timeline));
```

Here in the `mapStateToProps` function we are getting from the global state with: 
``` JavaScript
entireTimelineData: state.timeline.entireTimelineData,
```
It is `state.timeline` since that is what we exported as inside of the `reducers/index.js` file. And in this case we are getting the `entireTimelineData` from above:
``` JavaScript
case 'SET_ENTIRE_TIMELINE':
  return Object.assign({}, state, { entireTimelineData: action.entireTimelineData });
```

Inside of our component we need to add this to the proptypes. 
```JavaScript
static propTypes = {
  entireTimelineData: PropTypes.arrayOf(
    PropTypes.shape({
      init_fda_dt: PropTypes.string.isRequired,
      serious: PropTypes.number.isRequired,
      not_serious: PropTypes.number.isRequired,
    }),
  ).isRequired,
}
```

This data can now be accessed from the props as such:
```JavaScript
this.props.entireTimelineData
```



## Working on the Visualization page
Assets for the visualization page exist within the visualization folder src/components/visualization.  
visualization/App.js uses the components for the treemaps, demographics, and timeline which assets are each in their respective folder inside visualization/components.

## Working on the Reports Listing page
Assets for the reports listing page exist within the reports folder src/components/reports.  
reports/ReportsList.jsx uses the components for the report listing grid which assets are all contained in the folder reports/components.

## Working on the Narrative Editor page
All assets for the narrative editor page exist within the editor folder src/components/editor   

## Working on the Login page, About page, or Dashboard page
All assets for these pages exist within the portal folder src/components/portal   
Assets for the dashboard page exist inside the portal/userComponents folder.

## Working on the Back End
Our backend is a one file server that receives requests sent from the front end located at back-end/App.js

### Adding and modifying endpoints
We use the express library (https://expressjs.com/) for our backend and documentation for use can be found at https://expressjs.com/en/4x/api.html#app.
