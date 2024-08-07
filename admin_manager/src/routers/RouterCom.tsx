import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Index from "../pages/Index/Index";
import ManageManager from "../pages/admin/manage-account/ManageManager";
import ManageStaff from "../pages/admin/manage-account/ManageStaff";
import ManageUser from "../pages/admin/manage-account/ManageMember";
import RequestWaitlist from "../pages/manager/ManageRequest/components/RequestWaitlist";
import AuctionsList from "../pages/manager/Auctions/AuctionsList";
import PassedJewelriesList from "../pages/manager/PassedJewelry/PassedJewelriesList";
import CreateAuction from "../pages/manager/Auctions/CreateAuction";
import ViewProducts from "../pages/manager/View/ViewProducts";
import ViewAccount from "../pages/admin/View/ViewAccount";
import VerifyUser from "../pages/admin/manage-account/VerifyUser";
import ViewUserOfManager from "../pages/manager/User/ViewUser";
import TransactionList from "../pages/manager/Transaction/TransactionList";
import AuctionRegistrationList from "../pages/manager/AuctionRegistration/AuctionRegistrationList";
import TransactionsOverdue from "../pages/manager/Transaction/TransactionsOverdue";
import NotFound from "../pages/404/NotFound ";
import AuctionFailedList from "../pages/manager/Auctions/AuctionFailedList";
import JewelryList from "../pages/manager/Jewelry/JewelryList";

const RouterCom = () => {
  return (
    <Routes>
      {/* /ADMIN/ */}
      <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
        <Route element={<GuestRoute />}>
          <Route path="/admin" element={<Index />} />
          <Route
            path="/admin/danh-sach-quan-ly"
            element={<ManageManager />}
          />
          <Route
            path="/admin/danh-sach-nhan-vien"
            element={<ManageStaff />}
          />
          <Route
            path="/admin/danh-sach-nguoi-dung"
            element={<ManageUser />}
          />
          <Route path="/admin/chua-xac-thuc" element={<VerifyUser />} />
          <Route
            path="/admin/chi-tiet-nguoi-dung/:id"
            element={<ViewAccount />}
          />
        </Route>
      </Route>
      {/* /MANAGER/ */}
      <Route element={<ProtectedRoute roles={["MANAGER"]} />}>
        <Route path="/manager" element={<Index />} />
        <Route
          path="/manager/yeu-cau-dau-gia"
          element={<RequestWaitlist />}
        />
        <Route path="/manager/cac-phien-dau-gia" element={<AuctionsList />} />
        <Route
          path="/manager/dang-ky-dau-gia"
          element={<AuctionRegistrationList />}
        />
        <Route
          path="/manager/quan-li-tai-san"
          element={<JewelryList />}
        />
        <Route
          path="/manager/tai-san-dang-cho"
          element={<PassedJewelriesList />}
        />
        <Route
          path="/manager/giao-dich/nguoi-mua"
          element={<TransactionList />}
        />
        <Route
          path="/manager/giao-dich/nguoi-ban"
          element={<TransactionList />}
        />
        <Route
          path="/manager/giao-dich/hoan-tien"
          element={<TransactionList />}
        />
        <Route
          path="/manager/giao-dich/dang-ky-tham-gia"
          element={<TransactionList />}
        />
        <Route path="/manager/create-auction" element={<CreateAuction />} />
        <Route path="/manager/view/viewproducts" element={<ViewProducts />} />
        <Route
          path="/manager/hoa-don-qua-han"
          element={<TransactionsOverdue />}
        />
        <Route
          path="/manager/chi-tiet-nguoi-dung/:id"
          element={<ViewUserOfManager />}
        />
        <Route
          path="/manager/phien-that-bai"
          element={<AuctionFailedList />}
        />
      </Route>


      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default RouterCom;
