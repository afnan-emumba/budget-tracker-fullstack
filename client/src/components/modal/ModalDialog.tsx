import { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Expense } from "../../utils/interfaces";
import styles from "./ModalDialog.module.css";
import dayjs from "dayjs";

interface ModalDialogProps {
  modalType: "add" | "edit" | "delete" | null;
  visible: boolean;
  onClose: () => void;
  expense: Expense | null;
  onAddExpense: (expense: Expense) => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (key: number) => void;
}

const ModalDialog = ({
  modalType,
  visible,
  onClose,
  expense,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}: ModalDialogProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (modalType === "add") {
      setTitle("");
      setPrice("");
      setDate(null);
    } else if (modalType === "edit" && expense) {
      setTitle(expense.expense);
      setPrice(expense.price);
      setDate(dayjs(expense.date));
    }
  }, [modalType, expense]);

  useEffect(() => {
    setIsFormValid(title.trim() !== "" && price.trim() !== "" && date !== null);
  }, [title, price, date]);

  const users = useSelector((state: RootState) => state.user.users);
  const loggedInUser = users.find((user) => user.isLoggedIn);

  const handleExpense = () => {
    if (modalType === "add") {
      const newExpense: Expense = {
        key: Date.now(),
        userId: loggedInUser?.userId || 0,
        expense: title,
        price,
        date: date?.format("YYYY-MM-DD") || "",
      };
      onAddExpense(newExpense);
    } else if (modalType === "edit" && expense) {
      const updatedExpense: Expense = {
        ...expense,
        expense: title,
        price,
        date: date?.format("YYYY-MM-DD") || "",
      };
      onEditExpense(updatedExpense);
    }
  };

  const handleDelete = () => {
    if (expense) {
      onDeleteExpense(expense.key);
    }
  };

  const renderContent = () => {
    switch (modalType) {
      case "add":
        return (
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0",
              }}
              className={styles.modalContent}
            >
              <div>
                <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Title</p>
                <Input
                  placeholder='Enter title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#2B2B2B", fontWeight: 500 }}>
                    Price (PKR)
                  </p>
                  <Input
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Date</p>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder='Select date'
                    value={date}
                    onChange={(date) => setDate(date || null)}
                  />
                </div>
              </div>
            </div>
          </form>
        );
      case "edit":
        return (
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0",
              }}
              className={styles.modalContent}
            >
              <div>
                <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Title</p>
                <Input
                  placeholder='Enter title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#2B2B2B", fontWeight: 500 }}>
                    Price (PKR)
                  </p>
                  <Input
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Date</p>
                  <DatePicker
                    style={{ width: "100%" }}
                    value={date}
                    onChange={(date) => setDate(date || null)}
                  />
                </div>
              </div>
            </div>
          </form>
        );
      case "delete":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              margin: "2rem 0",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Title</p>
              <p>{expense?.expense}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Price (PKR)</p>
                <p>{expense?.price}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  marginRight: "6rem",
                }}
              >
                <p style={{ color: "#2B2B2B", fontWeight: 500 }}>Date</p>
                <p>{expense?.date}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={visible}
      title={
        modalType === "delete"
          ? "Delete Expense"
          : modalType === "edit"
          ? "Edit Expense"
          : "Add Expense"
      }
      onOk={
        modalType === "add" || modalType === "edit"
          ? handleExpense
          : modalType === "delete"
          ? handleDelete
          : onClose
      }
      onCancel={onClose}
      footer={
        modalType === "delete" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Button
              block
              style={{ padding: "20px 0", borderRadius: "8px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              block
              danger
              type='primary'
              style={{ padding: "20px 0", borderRadius: "8px" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Button
              block
              style={{ padding: "20px 0", borderRadius: "8px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              block
              htmlType='submit'
              type='primary'
              style={{ padding: "20px 0", borderRadius: "8px" }}
              onClick={
                modalType === "add" || modalType === "edit"
                  ? handleExpense
                  : onClose
              }
              disabled={!isFormValid}
            >
              {modalType === "add" ? "Add" : "Save"}
            </Button>
          </div>
        )
      }
    >
      {renderContent()}
    </Modal>
  );
};

export default ModalDialog;
