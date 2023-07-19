import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {
    let user = this.props.currentUser; // kt user {} cos rong khong ( sd lodash)
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id, // dung khi goi api
        email: user.email,
        password: "harcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }

    console.log("mounting modal", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChageInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check", this.state);
      }
    );
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];

    // if (!this.state.email) {
    //   alert("Missing email");
    //   return false;
    // }
    // -> dung for
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:", arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  // luu user
  handleSaveUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      // call api
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          EDIT A USER
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChageInput(event, "email");
                }}
                value={this.state.email}
              ></input>
            </div>

            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChageInput(event, "password");
                }}
                value={this.state.password}
                disabled
              ></input>
            </div>

            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChageInput(event, "firstName");
                }}
                value={this.state.firstName}
              ></input>
            </div>

            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChageInput(event, "lastName");
                }}
                value={this.state.lastName}
              ></input>
            </div>

            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChageInput(event, "address");
                }}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            clor="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changse
          </button>
          <button
            clor="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
