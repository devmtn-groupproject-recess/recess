import React from "react";
import { Switch, Route } from "react-router-dom";
import Event from './Components/Event/Event'
import Events from './Components/Events/Events'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import OwnProfile from './Components/OwnProfile/OwnProfile'
import OtherProfile from './Components/OtherProfile/OtherProfile'
import Login from './Components/Login/Login'





export default (
    <Switch>
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:event_id" component={Event} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={OwnProfile} />
        <Route exact path="/" component={Login} />
        <Route exact path="/otherprofile" component={OtherProfile} />
    </Switch>
)