import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>Nền tảng Đặt khám BookingCare ĐT: 02473.012.468</p>
            <p>Email: support@bookingcare.vn</p>
            <p>Trực thuộc: Công ty CP Công nghệ BookingCare </p>
            <p>ĐKKD số: 0106790291, Sở KH-ĐT Hà Nội cấp ngày: 16/03/2015 </p>
            <p>
              Địa chỉ: Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu,
              Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
