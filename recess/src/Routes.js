import React from "react";
import { Switch, Route } from "react-router-dom";
import Event from './Components/Event/Event'
import EditEvent from './Components/EditEvent/EditEvent'
import Events from './Components/Events/Events'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import OwnProfile from './Components/OwnProfile/OwnProfile'
import OtherProfile from './Components/OtherProfile/OtherProfile'
import Login from './Components/Login/Login'
import CreateEvent from './Components/CreateEvent/CreateEvent'
import EditProfile from './Components/EditProfile/EditProfile'





export default (
    <Switch>
        <Route path="/events/createEvent" component={CreateEvent} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:event_id" component={Event} />
        <Route exact path="/events/edit/:event_id" component={EditEvent} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile/:user_id" component={OwnProfile} />
        <Route exact path="/profile/edit/:user_id" component={EditProfile} />
        <Route exact path="/" component={Login} />
        <Route exact path="/otherprofile" component={OtherProfile} />
    </Switch>
)