import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
import "./CSS/summary.css";

class Education extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/education", title: "Education" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Education History</h1>
            {this.props.context.userInfo.education.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { educationIndex: index } // Setting Index passed into educationCreate component
                  }}
                  key={index}
                >
                  <span>{element.school}</span>
                </Link>
              );
            })}
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/education/create", // component being Linked to
                  state: { educationIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <img
                  src={require("./CSS/plus-button.svg")}
                  alt=""
                  className="plus-circle"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
