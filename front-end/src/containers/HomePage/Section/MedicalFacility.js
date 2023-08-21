import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nỗi bậc</span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div>Hệ thống y tế</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
