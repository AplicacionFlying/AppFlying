import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { listPaquetes } from "../actions/productActions";
import { listOrders } from "../actions/orderActions";

function Dashboard(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const paqueteList = useSelector((state) => state.paqueteList);
  const { paquetes } = paqueteList;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(listOrders());
    dispatch(listPaquetes());

    return () => {
      //
    };
  }, []);
  const soldCount = paquetes.map((paquete) => paquete.soldCount);
  const countInStock = paquetes.map((paquete) => paquete.countInStock);
  console.log(countInStock);
  const nombres = paquetes.map((paquete) => paquete.name);

  const ordersPrice = orders.map((order) => order.totalPrice);
  console.log(ordersPrice);

  const priceTotal = ordersPrice.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log(priceTotal);
  const state = {
    labels: nombres,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#E66BE6",
          "#F58012",
          "#2E82FC",
          "#7F560A",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
          "#B45FB4",
          "#C66912",
          "#0E56BE",
          "#533806",
        ],
        data: soldCount,
      },
    ],
  };
  const stateBar = {
    labels: nombres,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: countInStock,
      },
    ],
  };

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-content">
          <ul className="summary-items">
            {/* <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users"></i> Users
                </span>
              </div>

               <div class="summary-body">fxghfgrjhnnfjysj</div> 
            </li> */}
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-users"></i> Usuarios logiados
                </span>
              </div>
              <div class="summary-body">100</div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-users"></i> Total ganado
                </span>
              </div>
              <div className="summary-body">${priceTotal}</div>
            </li>
          </ul>
          <ul className="summary-items">
            <li classNmae="summary-body">
              <div className="tamañoGrafico">
                <Bar
                  data={stateBar}
                  options={{
                    title: {
                      display: true,
                      text: "Cantidad de paquetes disponibles",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </li>

            <li>
              <div className_="summary-body">
                <div className="tamañoGrafico">
                  <Doughnut
                    data={state}
                    options={{
                      title: {
                        display: true,
                        text: "Cantidad de paquetes vendidos",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>

          {/* <div class="summary-body">$${summary.orders[0].totalSales}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
