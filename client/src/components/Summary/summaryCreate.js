import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import axios from "axios";

const urls = require("../../config/config.json");

class SummaryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      success: false
    };
  }

  componentDidMount() {
    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.summaryIndex !== false
    )
      this.setState({
        summary: this.props.context.userInfo.summary[
          this.props.location.state.summaryIndex
        ].content
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.summaryIndex === false && !deleteFlag) {
      this.props.context.actions.addElement("summary", {
        content: this.state.summary
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.summaryIndex,
        "summary",
        {
          content: this.state.summary
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.summaryIndex,
        "summary"
      );
    }

    const tempObj = {
      "sections.summary": this.props.context.userInfo.summary
    };
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({ success: true });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    return [
      // <Prompt
      //   key="block-nav"
      //   when={
      //     this.props.context.userInfo.summary[
      //       this.props.location.state.summaryIndex
      //     ] !== this.state.summary
      //   }
      //   message="You have unsaved changes, are you sure you want to leave?"
      // />,
      <div>
        {this.state.success ? <Redirect to="/summary" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" },
            { link: "/summary/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <div className="form-group">
              <form>
                <label form="formGroupExampleInput2">
                  “Make the most of yourself....for that is all there is of
                  you.” ― Ralph Waldo Emerson
                </label>
                <textarea
                  rows={10}
                  value={this.state.summary}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="summary"
                  placeholder="List Summarys"
                />
              </form>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.summaryIndex !== false ? (
                <button onClick={e => this.handleSubmit(e, true)}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ];
  }
}
export default SummaryCreate;