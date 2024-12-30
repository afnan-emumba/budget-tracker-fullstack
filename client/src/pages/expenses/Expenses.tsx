import { useEffect, useState } from "react";
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
  Spin,
} from "antd";
import {
  SearchIcon1,
  CalendarIcon,
  AlertIcon,
  CloseIcon,
} from "../../assets/icons";
import styles from "./Expenses.module.css";
import ModalDialog from "../../components/modal/ModalDialog";
import { Expense, User } from "../../utils/interfaces";
import tableColumns from "./TableColumns";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const { Option } = Select;

const baseUrl = import.meta.env.VITE_BASE_URL;

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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { userID } = useUser();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    if (userID) {
      const expensesResponse = await axios.get(`${baseUrl}/expenses/u/${userID}`);
      setExpenses(expensesResponse.data);
    }
  };

  useEffect(() => {
    const fetchUserDataAndExpenses = async () => {
      try {
        if (userID) {
          setLoading(true);
          const userResponse = await axios.get(`${baseUrl}/users/${userID}`);
          setUser(userResponse.data);

          await fetchExpenses();
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserDataAndExpenses();
  }, [userID]);

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

  const filteredExpenses = expenses
    .filter(
      (expense) =>
        expense &&
        (!filterDate || dayjs(expense.date).isSame(filterDate, "day"))
    )
    .filter(
      (expense) =>
        expense &&
        expense.title &&
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reverse();

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;
    let aValue: number | string = a[sortField] ?? "";
    let bValue: number | string = b[sortField] ?? "";

    if (sortField === "price") {
      aValue = parseFloat(String(a[sortField] ?? "0"));
      bValue = parseFloat(String(b[sortField] ?? "0"));
    }

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

  const onDelete = (id: string) => {
    const expense = expenses.find((item) => item._id === id);
    setSelectedExpense(expense || null);
    setModalType("delete");
  };

  const onEdit = (id: string) => {
    const expense = expenses.find((item) => item._id === id);
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

  const handleDeleteExpense = (id: string) => {
    fetch(`${baseUrl}/expenses/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
        showToast("delete", "Expense Deleted Successfully!");

        const totalRecordsAfterDeletion = expenses.length - 1;
        const totalPagesAfterDeletion = Math.ceil(
          totalRecordsAfterDeletion / pageSize
        );
        if (currentPage > totalPagesAfterDeletion) {
          setCurrentPage(totalPagesAfterDeletion);
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
    setModalType(null);
  };

  const handleExpenseAdded = () => {
    fetchExpenses();
  };

  const tableColumnsConfig = user ? tableColumns(onDelete, onEdit, user) : [];

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
        {loading ? (
          <Spin size='large' />
        ) : (
          <>
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
                dataSource={paginatedData.map((item) => ({
                  ...item,
                  key: item._id,
                }))}
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
                          <Option value='date-n2o'>
                            Date: Newest to oldest
                          </Option>
                          <Option value='date-o2n'>
                            Date: Oldest to newest
                          </Option>
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
                  Showing {paginatedData.length} / {expenses.length} items
                </p>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={expenses.length}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </>
        )}
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
            setExpenses={setExpenses}
            showToast={showToast}
            onDeleteExpense={handleDeleteExpense}
            onExpenseAdded={handleExpenseAdded}
          />
        </div>
      </div>
    </>
  );
};

export default Expenses;
