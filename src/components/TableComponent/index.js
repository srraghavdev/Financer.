import React from "react";
import "./styles.css";
import { Modal, Radio, Select, Table } from "antd";
import { useState, useEffect } from "react";
import { Option } from "antd/es/mentions";
import searchicon from "../../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Editmodal from "../Editmodal";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { motion } from "framer-motion";
function TableComponent({
  transactions,
  addTransaction,
  fetchTransactions,
  SetisEditModalVisible,
  changeditdata,
  deletetrans,
}) {
  const [search, Setsearch] = useState("");
  const [typeFilter, SettypeFilter] = useState("");
  const [sortkey, Setsortkey] = useState("");
  const [mop, Setmop] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Mode of Payment",
      dataIndex: "mop",
      key: "mop",
      responsive : ['md']
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (x) => (
        <div
          className="action-div"
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "1rem",
          }}
        >
          <EditFilled
            style={{ marginRight: "1rem" }}
            onClick={(event) => {
              changeditdata(x);
              SetisEditModalVisible(true);
            }}
          />
          <DeleteFilled
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this transaction?",
                okText: "Delete",
                okType: "danger",
                onOk: async () => {
                  await deletetrans(x.uuid);
                },
              });
            }}
          />
        </div>
      ),
    },
  ];

  let filteredarray = transactions.filter(
    (element) =>
      element.name.toLowerCase().includes(search.toLowerCase()) &&
      element.type.includes(typeFilter) &&
      element.mop.includes(mop)
  );
  let sortedarray = filteredarray.sort((a, b) => {
    if (sortkey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortkey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportToCsv() {
    const csv = unparse({
      fields: ["name", "type", "date", "amount", "tag", "mop"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    // creating blob using csv and appropirate types
    const url = URL.createObjectURL(blob);
    // creaitng a url from the blob
    const link = document.createElement("a");
    link.href = url;
    // making an anchor tag , attaching href of the blob
    link.click();
    // clicking on the link resulting in a download
  }

  async function importFromCsv(event) {
    event.preventDefault();
    try {
      // event.target.files[0] is the desired uploaded file from the onchange event
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          console.log(results);
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
              uuid: uuidv4(),
            };
            // parsed data has amount as a string so parsefloating it to convert into a float
            // awaitTransaction in itself is an async function which will return a promise and we have used await keywords inside addtransaciton fn , so essentially the
            // promise returned by addTransaction will be awaited
            await addTransaction(newTransaction, true);
          }
          console.log("from improtcsv");
          await fetchTransactions();
          // re fetching updated transacitons after each addition of transaction, awating since fetchtransactions
        },
      });
      toast.success("All Transactions Added");
      event.target.files = null;
      console.log(transactions);
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <motion.div
      style={{
        width: "auto",
        padding: "0rem 2rem",
      }}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="table-cont"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchicon} width="16"></img>
          <input
            type="text"
            value={search}
            onChange={(event) => Setsearch(event.target.value)}
            placeholder="Search by name"
          ></input>
        </div>

        <Select
          className="select-input"
          onChange={(value) => SettypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
        >
          <Option value="">All Types</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
        <Select
          className="select-input"
          onChange={(value) => Setmop(value)}
          value={mop}
          placeholder="Mode of Payment"
        >
          <Option value="">All Payment Modes</Option>
          <Option value="upi">UPI</Option>
          <Option value="card">Debit/Credit card</Option>
          <Option value="cash">Cash</Option>
          <Option value="other">Other</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
          className="btn-wrap-heading"
        >
          <h2>My Transactions</h2>
          <Radio.Group
            onChange={(event) => Setsortkey(event.target.value)}
            value={sortkey}
            className="input-radio"
          >
            <Radio.Button value="">No sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
            className="csv-btn-cont"
          >
            <button className="btn customer" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue customer">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedarray} columns={columns} size={'small'} />;
      </div>
    </motion.div>
  );
}

export default TableComponent;
