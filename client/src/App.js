import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";

import "./App.css";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";
import Sidebar from "./components/SubComponents/Sidebar/sidebar";
import LandingPage from "./components/LandingPage/landingPage";
import Summaries from "./components/Summary/summary";
import SummaryCreate from "./components/Summary/summaryCreate";
import Education from "./components/Education/education";
import EducationCreate from "./components/Education/educationCreate";
import Skills from "./components/Skills/skills";
import SkillsCreate from "./components/Skills/skillsCreate";
import JobTitle from "./components/JobTitle/jobTitle";
import JobTitleCreate from "./components/JobTitle/jobTitleCreate";
import Experience from "./components/Experience/experience";
import ExperienceCreate from "./components/Experience/experienceCreate";
import Billing from "./components/Billing/billing";
import Resumes from "./components/Resume/resumes";
import RIP from "./components/Resume/resumeInProgress";
import ResumeOne from "./components/Resume/resume1";
import ResumeTwo from "./components/Resume/resume2";
import ResumeThree from "./components/Resume/resume3";
import Settings from "./components/Settings/settings";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Templates from "./components/Templates/templates";
import TemplateOne from "./components/Templates/template1";
import TemplateTwo from "./components/Templates/template2";
import TemplateThree from "./components/Templates/template3";
const publish_key = require("./config/keys.json").publish;

class App extends Component {
  render() {
    return (
      <div className="App container">
        <AuthProvider>
          <AuthContext.Consumer>
            {context => (
              <React.Fragment>
                <Route
                  exact
                  path="/"
                  render={props => <LandingPage {...props} context={context} />}
                />
                <Route
                  exact
                  path="/summary"
                  render={props => <Summaries {...props} context={context} />}
                />
                <Route
                  exact
                  path="/summary/create"
                  render={props => (
                    <SummaryCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/experience"
                  render={props => <Experience {...props} context={context} />}
                />
                <Route
                  exact
                  path="/experience/create"
                  render={props => (
                    <ExperienceCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/education"
                  render={props => <Education {...props} context={context} />}
                />
                <Route
                  exact
                  path="/education/create"
                  render={props => (
                    <EducationCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/skills"
                  render={props => <Skills {...props} context={context} />}
                />
                <Route
                  exact
                  path="/skills/create"
                  render={props => (
                    <SkillsCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/jobtitle"
                  render={props => <JobTitle {...props} context={context} />}
                />
                <Route
                  exact
                  path="/jobtitle/create"
                  render={props => (
                    <JobTitleCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/rip"
                  render={props => <RIP {...props} context={context} />}
                />
                <Route
                  exact
                  path="/resumes"
                  render={props => <Resumes {...props} context={context} />}
                />
                <Route
                  exact
                  path="/resume1"
                  render={props => <ResumeOne {...props} context={context} />}
                />
                <Route
                  exact
                  path="/resume2"
                  render={props => <ResumeTwo {...props} context={context} />}
                />
                <Route
                  exact
                  path="/resume3"
                  render={props => <ResumeThree {...props} context={context} />}
                />
                <StripeProvider apiKey={publish_key}>
                  <Elements>
                    <Route
                      exact
                      path="/billing"
                      render={props => <Billing {...props} context={context} />}
                    />
                  </Elements>
                </StripeProvider>
                <Route
                  exact
                  path="/settings"
                  render={props => <Settings {...props} context={context} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <Login {...props} context={context} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates"
                  render={props => <Templates {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-1"
                  render={props => <TemplateOne {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-2"
                  render={props => <TemplateTwo {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-3"
                  render={props => (
                    <TemplateThree {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/sidebar"
                  render={props => <Sidebar {...props} context={context} />}
                />
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
