import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { toast } from "react-toastify";
import { createNewSpecialty } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  // image
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  //  luu o bang markdown
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty succeeds");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.success("Something wrongs...");
      console.log("handleSaveNewSpecialty", res);
    }
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-12 ">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    isLoggedIn: state.user.isLoggedIn, // kt nd dang nhap chua
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
