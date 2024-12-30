import { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import { Expense } from "../../utils/interfaces";
import styles from "./ModalDialog.module.css";
import dayjs from "dayjs";
import axios from "axios";
import { useUser } from "../../context/UserContext";

interface ModalDialogProps {
  modalType: "add" | "edit" | "delete" | null;
  visible: boolean;
  onClose: () => void;
  expense: Expense | null;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  showToast: (type: "add" | "edit" | "delete", message: string) => void;
  onDeleteExpense: (id: string) => void;
  onExpenseAdded: () => void;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const ModalDialog = ({
  modalType,
  visible,
  onClose,
  expense,
  setExpenses,
  showToast,
  onDeleteExpense,
  onExpenseAdded,
}: ModalDialogProps) => {
  const { userID } = useUser();
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
      setTitle(expense.title);
      setPrice(expense.price.toString());
      setDate(dayjs(expense.date));
    }
  }, [modalType, expense]);

  useEffect(() => {
    setIsFormValid(title.trim() !== "" && price.trim() !== "" && date !== null);
  }, [title, price, date]);

  const handleExpense = async () => {
    if (modalType === "add" && userID) {
      const newExpense: Expense = {
        title,
        userID: userID,
        price: parseFloat(price),
        date: date?.format("YYYY-MM-DD") || "",
      };
      try {
        const response = await axios.post(`${baseUrl}/expenses`, newExpense);
        setExpenses((prevExpenses) => [...prevExpenses, response.data]);
        showToast("add", "Expense Added Successfully!");
        onExpenseAdded();
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    } else if (modalType === "edit" && expense) {
      const updatedExpense: Expense = {
        ...expense,
        title,
        price: parseFloat(price),
        date: date?.format("YYYY-MM-DD") || "",
      };
      try {
        const response = await axios.put(
          `${baseUrl}/expenses/${expense._id}`,
          updatedExpense
        );
        setExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp._id === response.data._id ? response.data : exp
          )
        );
        showToast("edit", "Expense Updated Successfully!");
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    }
    onClose();
  };

  const handleDelete = async () => {
    if (expense) {
      try {
        await axios.delete(`${baseUrl}/expenses/${expense._id}`);
        onDeleteExpense(expense._id || "");
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
    onClose();
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
              <p>{expense?.title}</p>
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
