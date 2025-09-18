import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./‎ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder && userOrder.length > 0) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Your order has been confirmed!</h1>
        <h3 className="text-center">It will be delivered soon</h3>
      </div>

      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Order Items
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Order ID: {latestOrder?.orderId}</li>
                  <li>Payment ID: {latestOrder?.paymentId}</li>
                  <li>Payment Status: {latestOrder?.payStatus}</li>
                  <li>Name: {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country: {latestOrder?.userShipping?.country}</li>
                  <li>State: {latestOrder?.userShipping?.state}</li>
                  <li>Pin Code: {latestOrder?.userShipping?.pincode}</li>
                  <li>Address: {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderConfirmation;
