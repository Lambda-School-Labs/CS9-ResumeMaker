import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "../Templates/template2.css";

export class ResumeTwo extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;

    console.log(userInfo);
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/resumes", title: "Resumes" },
            { link: "/resumes/resume2", title: "Modern Resume" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Modern</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <div textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {userInfo.title.map((item, index) => {
                  return resumes[resumes.length - 1].title[index].value ? (
                    <p key={item._id}>{item.content}</p>
                  ) : null;
                })}
              </div>
              <Divider className="divider-div" />
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3 className="subtitle">Summary</h3>
                {userInfo.summary.map((item, index) => {
                  return resumes[resumes.length - 1].sections.summary[index]
                    .value ? (
                    <p key={item._id}>{item.content}</p>
                  ) : null;
                })}
              </Container>
              <Divider className="divider-div" />
              <div className="row">
                <div className="col">
                  <FormGroup textAlign="center" className="contactSection">
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p> {userInfo.email}</p>
                    </a>
                    <p>{userInfo.location}</p>
                    <p>{userInfo.phonenumber}</p>
                    {resumes[resumes.length - 1].links.linkedin ? (
                      <p>{userInfo.links.linkedin}</p>
                    ) : null}
                    {resumes[resumes.length - 1].links.github ? (
                      <p>{userInfo.links.github}</p>
                    ) : null}
                    {resumes[resumes.length - 1].links.portfolio ? (
                      <p>{userInfo.links.portfolio}</p>
                    ) : null}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
                    <h3 className="subtitle">Education</h3>
                    {education.map((content, index) => {
                      return resumes[resumes.length - 1].sections.education[
                        index
                      ].value ? (
                        <div key={index}>
                          <h5>
                            {content.degree} in {content.fieldofstudy}{" "}
                          </h5>
                          <p>{content.location}</p>
                          <p>
                            {content.school}
                            <br />
                            {content.from} - {content.to}
                          </p>
                        </div>
                      ) : null;
                    })}
                  </FormGroup>
                </div>
                <Divider className="divider-div" />
                <div className="col">
                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 className="subtitle">Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return resumes[resumes.length - 1].sections.skills[index]
                        .value ? (
                        <div key={index}>
                          <p>{content.content}</p>
                        </div>
                      ) : null;
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
                    <h3 className="subtitle">Experience</h3>
                    {experience.map((content, index) => {
                      return resumes[resumes.length - 1].sections.experience[
                        index
                      ].value ? (
                        <div key={index}>
                          <h5>{content.company} </h5>
                          <p>
                            {content.title}
                            <br />
                            {content.location}
                            <br />
                            {content.from} - {content.to}
                          </p>
                          <p>{content.description} </p>
                        </div>
                      ) : null;
                    })}
                  </FormGroup>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeTwo;
