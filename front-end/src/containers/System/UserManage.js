import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../System/UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(pors) {
    super(pors);
    this.state = {
      arrUsers: [],
    };
  }
  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  /**
   * life cycle
   * 1. run contructor -> init state
   * 2. did mount (call api get data, write set state)
   * 3. render
   *
   */

  render() {
    console.log("check", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-center">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>Frist name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                console.log("map", item, index);
                return (
                  <tr>
                    <td>{item.email} </td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName} </td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
