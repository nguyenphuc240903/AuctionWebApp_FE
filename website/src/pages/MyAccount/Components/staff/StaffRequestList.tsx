import React, { useCallback, useEffect, useState } from "react";
import { getRequestByUserId } from "../../../../api/RequestApprovalAPI";
import { RequestApproval } from "../../../../models/RequestApproval";
import { formatNumber } from "../../../../utils/formatNumber";
import { formatDateStringAcceptNull } from "../../../../utils/formatDateString";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Spinner } from "react-bootstrap";
import { ViewStaffRequestModal } from "../../Modal/ModalStaff";
import { useTranslation } from "react-i18next";
interface StaffRequestListProps {
  userId: number | undefined;
  listNumber: number;
}
const StaffRequestList: React.FC<StaffRequestListProps> = ({
  userId,
  listNumber,
}) => {
  const [myJewelryRequestList, setMyJewelryRequestList] = useState<
    RequestApproval[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (userId) {
      getRequestByUserId(userId, page)
        .then((response) => {
          setMyJewelryRequestList(response.requestsData);
          setTotalElements(response.totalElements);
        })
        .catch(() => {});
    }
    setLoading(false);
  }, [userId, listNumber]);
  const handleChangeList = useCallback(async () => {
    if (userId) {
      try {
        const response = await getRequestByUserId(userId, page);
        setMyJewelryRequestList(response.requestsData);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId, page]);

  useEffect(() => {
    handleChangeList();
  }, [userId, page, handleChangeList, listNumber]);

  const { t } = useTranslation(["Staff"]);

  return (
    <div
      className="tab-pane fade"
      id="staff-request"
      role="tabpanel"
      aria-labelledby="account-address-tab"
    >
      <div className="myaccount-orders">
        <h4 className="small-title">
          {t("StaffRequestList.Danh sách các yêu cầu gửi lên quản lý")}
        </h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <th>{t("StaffRequestList.Mã yêu cầu")}</th>
                <th>{t("StaffRequestList.Mã trang sức")}</th>
                <th>{t("StaffRequestList.Định giá (VNĐ)")}</th>
                <th>{t("StaffRequestList.Thời gian gửi")}</th>
                <th>{t("StaffRequestList.Trạng thái")}</th>
                <th>{t("StaffRequestList.Thao tác")}</th>
              </tr>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <Spinner animation="border" />
                  </td>
                </tr>
              ) : myJewelryRequestList.length > 0 ? (
                React.Children.toArray(
                  myJewelryRequestList.map((request) => (
                    <tr>
                      <td>{request.jewelry?.id}</td>
                      <td>{request.jewelry?.name}</td>
                      <td>{formatNumber(request.valuation)}</td>
                      <td>
                        {formatDateStringAcceptNull(request?.requestTime)}
                      </td>

                      {request.state === "HIDDEN" ? (
                        <td className="fw-semibold text-danger">
                          {t("StaffRequestList.Đã bị hủy")}
                        </td>
                      ) : (
                        <td
                          className={`fw-semibold ${
                            request.isConfirm ? "text-success" : "text-dark"
                          }`}
                        >
                          {request.isConfirm
                            ? t("StaffRequestList.Đã phê duyệt")
                            : t("StaffRequestList.Chưa phê duyệt")}
                        </td>
                      )}
                      <td>
                        <ViewStaffRequestModal request={request} />
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <td colSpan={6} className="text-center">
                  <h5 className="fw-semibold lh-base mt-2">
                    {t("StaffRequestList.Chưa có yêu cầu nào được gửi đi")}
                  </h5>
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <PaginationControl
          page={page}
          between={3}
          total={totalElements}
          limit={5}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
};

export default StaffRequestList;
