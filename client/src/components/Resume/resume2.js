import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import PDF from "../PDF/PDF";

export class ResumeTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      success: false
    };
  }

    componentWillMount() {
      function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i][attr] === value) {
            return i;
          }
        }
        return -1;
      }
    
        let index = findWithAttr(
          this.props.context.userInfo.resumes,
          "_id",
          this.props.context.userInfo.currentresume
        );
        if (index === -1) index = 0;
        this.setState({ index: index });
      }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // componentWillUnmount() {
  //   this.props.context.actions.expandResumeIDs(
  //     this.props.context.userInfo.currentResume
  //   )
  // }

  render() {
    if (!this.props.context.userInfo.auth) {
      return <Redirect to="/resumes" />;
    }    
    if (
      !this.props.context.userInfo.resumes.length ||
      this.props.context.userInfo.resumes[0] === null
    ) {
      return <h1>Loading...</h1>;
    }
    if (
      !this.props.context.userInfo.resumes.length ||
      this.props.context.userInfo.resumes[0] === null
    ) {
      console.log(
        "You probably had an error, which redirected you instead of crashing."
      );
      return <Redirect to="/resumes" />;
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;
    const summaryLength = resumes[this.state.index].sections.summary.length;
    const skillsLength = resumes[this.state.index].sections.skills.length;
    const educationLength = resumes[this.state.index].sections.education.length;
    const experienceLength = resumes[this.state.index].sections.experience.length;

    return (
      <div>
        <Navbar context={this.props.context}/>
        <div className="component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div page-container-div">
            <div className="resume title-div">
              <h4 className="resume page-header">Modern</h4>
            <PDF />
            </div>
            <div className="template2">
              <div style={{ textAlign: "center" }} className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {userInfo.title.map((item, index) => {
                  if(resumes[this.state.index].title[index]){
                    return (
                      <p key={item._id}>
                        {item.content}
                      </p>
                    )
                  } else return null;
                })}
              </div>

              {summaryLength > 0 ? (
                <div>
                <Container
                  textalign="center"
                  id="summary"
                  className="summarySection"
                >
                  <Divider className="divider-div" />
                  <h3 className="subtitle">Summary</h3>
                  {userInfo.summary.map((item, index) => {
                    return resumes[this.state.index].sections.summary[index]
                      .value ? (
                      <p key={item._id}>{item.content}</p>
                    ) : null;
                  })}
                </Container>
                </div>
              ) : null}

              <Divider className="divider-div" />
              <div className="row">
                <div className="col-5">
                  <Container textalign="center" className="contactSection">
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p> {userInfo.email}</p>
                    </a>
                    <p>{userInfo.location}</p>
                    <p>{userInfo.phonenumber}</p>
                    {resumes[this.state.index].links.linkedin ? (
                      <p>{userInfo.links.linkedin}</p>
                    ) : null}
                    {resumes[this.state.index].links.github ? (
                      <p>{userInfo.links.github}</p>
                    ) : null}
                    {resumes[this.state.index].links.portfolio ? (
                      <p>{userInfo.links.portfolio}</p>
                    ) : null}
                  </Container>

                  {educationLength > 0 ? (
                    <Container textalign="center" className="educationSection">
                      <Divider className="divider-div" />
                      <h3 className="subtitle">Education</h3>
                      {education.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.education[
                          index
                        ].value ? (
                          <div key={content._id}>
                            <h5>
                              {content.degree} in {content.fieldofstudy}{" "}
                            </h5>
                            <p>{content.location}</p>
                            <p>
                              {content.school}
                              <br />
                              {from} - {to}
                            </p>
                          </div>
                        ) : null;
                      })}
                    </Container>
                  ) : null}
                  </div>
                  <Divider className="divider-div" />
                  <div className="col-7">
                    {skillsLength > 0 ? (
                      <Container textalign="center" className="skillsSection">
                        <h3 className="subtitle">Skills</h3>
                        {userInfo.skills.map((content, index) => {
                          return resumes[this.state.index].sections.skills[
                            index
                          ].value ? (
                            <div key={content._id}>
                              <b>{content.groupname}</b>
                              <p>{content.content}</p>
                            </div>
                          ) : null;
                        })}
                        <Divider className="divider-div" />
                      </Container>
                    ) : null}

                    {experienceLength > 0 ? (
                      <Container textalign="center" className="experienceSection">
                        <h3 className="subtitle">Experience</h3>
                        {experience.map((content, index) => {
                          let from = moment(content.from).format("MMM YYYY");
                          let to = moment(content.to).format("MMM YYYY");
                          return resumes[this.state.index].sections.experience[
                            index
                          ].value ? (
                            <div key={index}>
                              <h5>{content.company} </h5>
                              <p>
                                {content.title}
                                <br />
                                {content.location}
                                <br />
                                {from} - {to}
                              </p>
                              <p>{content.description} </p>
                            </div>
                          ) : null;
                        })}
                      </Container>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ResumeTwo;
