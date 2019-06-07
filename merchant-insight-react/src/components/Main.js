import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "../authentication/Login";
import { Register } from "../authentication/Register";
import { Welcome } from "./Welcome";
import { Dashboard } from "./Dashboard";
import { WhatsNew } from "./WhatsNew";

import "../styles/Main.css";
import { DeviceType } from "../generalGraphs/DeviceType";
import { Education } from "../generalGraphs/Education";
import { Ethnicity } from "../generalGraphs/Ethnicity"
import { Gender } from "../generalGraphs/Gender"
import { HouseholdIncome } from "../generalGraphs/HouseholdIncome"
import { LikelyBuy } from "../generalGraphs/LikelyBuy"
import { LikeRecommend } from "../generalGraphs/LikeRecommend"
import { OverallSatis } from "../generalGraphs/OverallSatis"
import { PurchaseAmount } from "../generalGraphs/PurchaseAmount"






export class Main extends React.Component {
  constructor() {
    super();
  }

  getHome = () => {
      return this.props.isLoggedIn ? <WhatsNew /> : <Welcome/>;
  }

  getLogin = () => {
    return this.props.isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLogin={this.props.handleLogin} />
    );
  };

  getRoot = () => {
        return <Redirect to="/login"/>;
  };

  getGeneral = () => {
    return this.props.isLoggedIn ? <Home history={this.props.history} /> : <Welcome />;
  };

  getWhatsNew = () => {
    return this.props.isLoggedIn ? <WhatsNew /> : <Welcome/>;
  }
  getDashboard = () => {
    return this.props.isLoggedIn ? <Dashboard /> : <Welcome/>;
  }

  getDeviceType = () => {
    return this.props.isLoggedIn ? <DeviceType /> : <Welcome/>;
  }
  getEducation = () => {
    return this.props.isLoggedIn ? <Education /> : <Welcome/>;
  }
  getEthnicity = () => {
    return this.props.isLoggedIn ? <Ethnicity /> : <Welcome/>;
  }
  getGender = () => {
    return this.props.isLoggedIn ? <Gender /> : <Welcome/>;
  }
  getHouseholdIncome = () => {
    return this.props.isLoggedIn ? <HouseholdIncome /> : <Welcome/>;
  }
  getLikelyBuy = () => {
    return this.props.isLoggedIn ? <LikelyBuy /> : <Welcome/>;
  }
  getLikelyRecommend = () => {
    return this.props.isLoggedIn ? <LikeRecommend /> : <Welcome/>;
  }
  getOverallSatis = () => {
    return this.props.isLoggedIn ? <OverallSatis /> : <Welcome/>;
  }
  getPurchaseAmount = () => {
    return this.props.isLoggedIn ? <PurchaseAmount /> : <Welcome/>;
  }



  render() {
    return (
      <div className="mainPage">
        <Switch>
          <Route exact path="/" render={this.getHome} />
          <Route path="/register" component={Register} />
          <Route path="/login" render={this.getLogin} />
          <Route path="/home" render={this.getHome} />
          <Route path="/general" render={this.getGeneral} />
          <Route path="/whatsnew" render={this.getWhatsNew} /> 
          <Route path="/devicetype" render={this.getDeviceType} />
          <Route path="/education" render={this.getEducation} />
          <Route path="/ethnicity" render={this.getEthnicity} />
          <Route path="/gender" render={this.getGender} />
          <Route path="/householdincome" render={this.getHouseholdIncome} />
          <Route path="/likelybuy" render={this.getLikelyBuy} />
          <Route path="/likelyrecommend" render={this.getLikelyRecommend} />
          <Route path="/overallsatis" render={this.getOverallSatis} />
          <Route path="/purchaseamount" render={this.getPurchaseAmount} />
          <Route path="/dashboard" render={this.getDashboard} />

          <Route render={this.getRoot} />
        </Switch>
      </div>
    );
  }

}
