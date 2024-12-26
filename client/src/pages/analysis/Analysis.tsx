import { Helmet } from "react-helmet";
import { Divider, Table, Select } from "antd";
import LinePLot from "../../components/linePlot/LinePlot";
import styles from "./Analysis.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import dayjs from "dayjs";
import { useState } from "react";

const { Option } = Select;

const Analysis = () => {
  const [range, setRange] = useState("1");
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const loggedInUser = useSelector((state: RootState) =>
    state.user.users.find((user) => user.isLoggedIn)
  );

  const filteredExpenses = expenses.filter(
    (expense) => expense.userId === loggedInUser?.userId
  );

  const getData = () => {
    const now = dayjs();
    const data = [];

    if (range === "1") {
      const currentDate = now.date();
      for (let i = 1; i <= currentDate; i++) {
        const day = now.date(i).format("YYYY-MM-DD");
        const total = filteredExpenses
          .filter((expense) => dayjs(expense.date).isSame(day, "day"))
          .reduce((sum, expense) => sum + parseFloat(expense.price), 0);
        data.push({ day: i, value: total });
      }
    } else {
      const months = range === "6" ? 6 : 12;
      for (let i = months - 1; i >= 0; i--) {
        const month = now.subtract(i, "month").format("MMM YYYY");
        const total = filteredExpenses
          .filter((expense) =>
            dayjs(expense.date).isSame(now.subtract(i, "month"), "month")
          )
          .reduce((sum, expense) => sum + parseFloat(expense.price), 0);
        data.push({ month, value: total });
      }
    }

    return data;
  };

  return (
    <>
      <Helmet>
        <title>Analysis | Budget Tracker</title>
      </Helmet>

      <div className={styles.analysisContent}>
        <div className={styles.header}>
          <h2>Analysis</h2>
        </div>

        <Divider />

        <div className={styles.analysisGraph}>
          <Table
            showHeader={false}
            bordered={false}
            pagination={false}
            title={() => (
              <div className={styles.tableControls}>
                <h3>Expenses</h3>

                <div className={styles.tableSelect}>
                  <label>Range</label>
                  <Select
                    defaultValue='1'
                    style={{ width: 160 }}
                    onChange={(value) => setRange(value)}
                  >
                    <Option value='1'>This Month</Option>
                    <Option value='6'>Last 6 Months</Option>
                    <Option value='12'>Last 12 Months</Option>
                  </Select>
                </div>
              </div>
            )}
            dataSource={[
              { key: "1", plot: <LinePLot data={getData()} range={range} /> },
            ]}
            columns={[{ dataIndex: "plot", key: "plot" }]}
          />
          <div className={styles.graphFooter}></div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
