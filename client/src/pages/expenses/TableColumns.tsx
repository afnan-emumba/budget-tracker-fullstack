import { ColumnType } from "antd/es/table";
import { Expense } from "../../utils/interfaces";
import { Button, Progress } from "antd";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import { User } from "../../utils/interfaces";
import dayjs from "dayjs";

const tableColumns = (
  onDelete: (key: string) => void,
  onEdit: (key: string) => void,
  user: User
): ColumnType<Expense>[] => {
  return [
    {
      title: "Expense",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Total Expenditure",
      dataIndex: "price",
      key: "totalExpenditure",
      width: 150,
      render: (text: string) => (
        <Progress
          percent={Math.round(
            (parseFloat(text) / (user?.budgetLimit || 1)) * 100
          )}
        />
      ),
    },
    {
      title: "Price (PKR)",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (text: string) => dayjs(text).format("DD MMM YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 150,
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Button
            type='text'
            icon={<DeleteIcon />}
            onClick={() => onDelete(record._id)}
          />
          <Button
            type='text'
            icon={<EditIcon />}
            onClick={() => onEdit(record._id)}
          />
        </div>
      ),
    },
  ];
};

export default tableColumns;
