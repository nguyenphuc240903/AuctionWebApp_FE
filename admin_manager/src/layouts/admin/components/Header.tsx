
import { Link } from 'react-router-dom';
import useAccount from '../../../hooks/useAccount';
import { LogoutModal } from './Modal';
import useIsAdmin from '../../../hooks/useIsAdmin';
const Header = () => {
  const token = localStorage.getItem("access_token");
  const user = useAccount(token);
  const isAdmin = useIsAdmin();
  return (
    <div className="d-flex justify-content-between align-items-center py-2 border border-b-1` " style={{ position: "fixed", width: "100%", zIndex: "10", background: "#fff" }}>
      <div className="sidebar_icon d-lg-none">
        <i className="ti-menu"></i>
      </div>
      <div className="serach_field-area">
      </div>
      <div className="header_right d-flex justify-content-between align-items-center">
        <div className="text-center me-3">
          <h5 className='mb-0'>Chào mừng trở lại!</h5>
          <h6>{user?.fullName}</h6>
        </div>
        <div className="profile_info">
          <div
            style={{
              width: "60px",
              height: "60px",
              overflow: "hidden",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <img src={user?.avatar} alt="avatar" style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }} />
          </div>
          <div className="profile_info_iner">
            <div>
              {
                isAdmin && <Link to={`/admin/chi-tiet-nguoi-dung/${user?.id}`} className='text-white my-2'>Thông tin tài khoản<i className="ti-user"></i></Link>
              }
              <div className='text-white text-center mb-2 '><LogoutModal /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
