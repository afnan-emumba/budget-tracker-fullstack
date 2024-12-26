import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Divider,
  Table,
  Pagination,
  Select,
  Input,
  DatePicker,
} from "antd";
import {
  SearchIcon1,
  CalendarIcon,
  AlertIcon,
  CloseIcon,
} from "../../assets/icons";
import styles from "./Expenses.module.css";
import ModalDialog from "../../components/modal/ModalDialog";
import { RootState } from "../../redux/store";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../redux/slices/expensesSlice";
import { Expense } from "../../utils/interfaces";
import { addNotification } from "../../redux/slices/notificationsSlice";
import tableColumns from "./TableColumns";

const { Option } = Select;

const Expenses = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [sortField, setSortField] = useState<keyof Expense | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const users = useSelector((state: RootState) => state.user.users);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const loggedInUser = users.find((user) => user.isLoggedIn);
  const dispatch = useDispatch();

  const userExpenses = expenses.filter(
    (expense) => expense.userId === loggedInUser?.userId
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case "price-h2l":
        setSortField("price");
        setSortOrder("descend");
        break;
      case "price-l2h":
        setSortField("price");
        setSortOrder("ascend");
        break;
      case "date-n2o":
        setSortField("date");
        setSortOrder("descend");
        break;
      case "date-o2n":
        setSortField("date");
        setSortOrder("ascend");
        break;
      default:
        setSortField(null);
        setSortOrder(null);
    }
  };

  const handleDateChange = (dateString: string) => {
    setFilterDate(dateString);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredExpenses = userExpenses
    .filter(
      (expense) => !filterDate || dayjs(expense.date).isSame(filterDate, "day")
    )
    .filter((expense) =>
      expense.expense.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;
    const aValue =
      sortField === "price" ? parseFloat(a[sortField]) : a[sortField];
    const bValue =
      sortField === "price" ? parseFloat(b[sortField]) : b[sortField];
    if (aValue < bValue) return sortOrder === "ascend" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "ascend" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedExpenses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const calculatePageSize = () => {
    const tableHeight = window.innerHeight - 500;
    const rowHeight = 54;
    const newPageSize = Math.floor(tableHeight / rowHeight);
    setPageSize(newPageSize + 1);
  };

  const onAdd = () => {
    setSelectedExpense(null);
    setModalType("add");
  };

  const onDelete = (key: number) => {
    const expense = userExpenses.find((item) => item.key === key);
    setSelectedExpense(expense || null);
    setModalType("delete");
  };

  const onEdit = (key: number) => {
    const expense = userExpenses.find((item) => item.key === key);
    setSelectedExpense(expense || null);
    setModalType("edit");
  };

  const showToast = (type: "add" | "edit" | "delete", message: string) => {
    const colors = {
      add: {
        background: "#E1F3EC",
        border: "#3EC484",
        heading: "#08B461",
        icon: "#08B461",
      },
      edit: {
        background: "#E1F3EC",
        border: "#3EC484",
        heading: "#08B461",
        icon: "#08B461",
      },
      delete: {
        background: "#F3E1EA",
        border: "#C43E5E",
        heading: "#EA3B3B",
        icon: "#EA3B3B",
      },
    };

    toast(
      <div style={{ position: "relative" }}>
        <h3 style={{ color: colors[type].heading, marginBottom: 8 }}>
          {type === "add"
            ? "Expense Added"
            : type === "edit"
            ? "Expense Updated"
            : "Expense Deleted"}
        </h3>
        <p style={{ color: "#1A274F" }}>{message}</p>
        <Button
          type='text'
          icon={<CloseIcon />}
          style={{ position: "absolute", top: -15, right: -20 }}
          onClick={() => toast.dismiss()}
        />
      </div>,
      {
        duration: 3000,
        position: "top-right",
        style: {
          background: colors[type].background,
          border: `1px solid ${colors[type].border}`,
          padding: "16px",
          color: colors[type].heading,
        },
        icon: <AlertIcon fillColour={colors[type].icon} />,
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }
    );
  };

  const handleExpense = (expense: Expense, type: "add" | "edit") => {
    if (type === "add" && loggedInUser) {
      const newExpense = { ...expense, userId: loggedInUser.userId };
      dispatch(addExpense(newExpense));
      dispatch(
        addNotification({
          id: Date.now(),
          userId: loggedInUser.userId,
          type: "add",
          message: "added successfully",
          timestamp: Date.now(),
          icon: "add_icon",
          expenseTitle: expense.expense,
        })
      );
      showToast("add", "Expense Added Successfully!");
    } else if (type === "edit") {
      dispatch(updateExpense(expense));
      dispatch(
        addNotification({
          id: Date.now(),
          userId: expense.userId,
          type: "update",
          message: "updated successfully",
          timestamp: Date.now(),
          icon: "update_icon",
          expenseTitle: expense.expense,
        })
      );
      showToast("edit", "Expense Updated Successfully!");
    }
    setModalType(null);
  };

  const handleAddExpense = (expense: Expense) => handleExpense(expense, "add");
  const handleEditExpense = (expense: Expense) =>
    handleExpense(expense, "edit");

  const handleDeleteExpense = (key: number) => {
    const expense = userExpenses.find((item) => item.key === key);
    if (expense) {
      dispatch(deleteExpense(key));
      dispatch(
        addNotification({
          id: Date.now(),
          userId: expense.userId,
          type: "delete",
          message: "removed",
          timestamp: Date.now(),
          icon: "delete_icon",
          expenseTitle: expense.expense,
        })
      );
      setModalType(null);
      showToast("delete", "Expense Deleted Successfully!");

      const totalRecordsAfterDeletion = userExpenses.length - 1;
      const totalPagesAfterDeletion = Math.ceil(
        totalRecordsAfterDeletion / pageSize
      );
      if (currentPage > totalPagesAfterDeletion) {
        setCurrentPage(totalPagesAfterDeletion);
      }
    }
  };

  const tableColumnsConfig = tableColumns(onDelete, onEdit, loggedInUser);

  useEffect(() => {
    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);

    return () => {
      window.removeEventListener("resize", calculatePageSize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>My Expenses | Budget Tracker</title>
      </Helmet>

      <div className={styles.homeContent}>
        <div className={styles.header}>
          <h2>Expenses</h2>
          <Button type='primary' onClick={onAdd}>
            Add Expenses
          </Button>
        </div>
        <Divider />
        <div className={styles.expenseTable}>
          <Table
            columns={tableColumnsConfig}
            dataSource={paginatedData}
            pagination={false}
            title={() => (
              <div className={styles.tableControls}>
                <h3>Expenses</h3>
                <div className={styles.tableFilters}>
                  <div className={styles.tableSelect}>
                    <label>Sort by</label>
                    <Select
                      defaultValue='All'
                      style={{ width: 210 }}
                      onChange={handleSortChange}
                    >
                      <Option value='price-h2l'>
                        Price: Highest to lowest
                      </Option>
                      <Option value='price-l2h'>
                        Price: Lowest to highest
                      </Option>
                      <Option value='date-n2o'>Date: Newest to oldest</Option>
                      <Option value='date-o2n'>Date: Oldest to newest</Option>
                    </Select>
                  </div>
                  <div className={styles.tableSelect}>
                    <label>By Date</label>
                    <DatePicker
                      style={{ width: 210 }}
                      suffixIcon={<CalendarIcon />}
                      onChange={handleDateChange}
                    />
                  </div>
                  <Input
                    prefix={<SearchIcon1 />}
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                      width: 350,
                      borderColor: "#E1E8F2",
                      borderRadius: "4px",
                    }}
                    className={styles.tableInput}
                  />
                </div>
              </div>
            )}
          />
          <div className={styles.tableFooter}>
            <p>
              Showing {paginatedData.length} / {userExpenses.length} items
            </p>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={userExpenses.length}
              onChange={handlePageChange}
            />
          </div>
        </div>

        <Toaster
          containerStyle={{
            top: 90,
            right: 20,
          }}
        />

        <div className='modals'>
          <ModalDialog
            modalType={modalType}
            visible={!!modalType}
            onClose={() => setModalType(null)}
            expense={selectedExpense}
            onAddExpense={handleAddExpense}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
    </>
  );
};

export default Expenses;
