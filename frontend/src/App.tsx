import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap'
import ApplyForMembershipPage from './pages/ApplyForMembershipPage';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewApplications from './pages/ViewApplications';
import ViewRideRequests from './pages/ViewRideRequests';
import { Application } from './models/application';
import ApplicationReceivedPage from './pages/ApplicationReceivedPage';
import RequestRidePage from './pages/RequestRidePage';
import { RideRequest } from './models/ride_request';
import { Member } from './models/member';
import RideRequestReceivedPage from './pages/RideRequestReceivedPage';
import ViewRostersPage from './pages/ViewRostersPage';


function App() {


  return (
    <div>
    <BrowserRouter>
      <Container>
        <Routes>
          <Route
            path='/'
            element={<Home/>}
          />
          <Route
            path='/applyformembership'
            element={<ApplyForMembershipPage onApplicationSaved={function (application: Application): void{} }/>}
          />
          <Route
            path='/viewapplications'
            element={<ViewApplications/>}  
          />
          <Route
            path='/viewriderequests'
            element={<ViewRideRequests/>}  
          />
          <Route
            path='/requestaride'
            element={<RequestRidePage onRequestSaved={function (rideRequest: RideRequest): void { } }/>}
          />
          <Route
              path='/applicationreceived'
              element={<ApplicationReceivedPage/>}
          />
          <Route
              path='/riderequestreceived'
              element={<RideRequestReceivedPage/>}
          />
          <Route
          path='/viewrosters'
          element={<ViewRostersPage/>}
          />
        </Routes>
      </Container>
    </BrowserRouter>
    </div>
  );
}

export default App;
