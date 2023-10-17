import React from "react";
import "./styles.css";
import { Radio, Select, Table } from "antd";
import { useState, useEffect } from "react";
import { Option } from "antd/es/mentions";
import searchicon from "../../assets/search.svg";
import { toast } from "react-toastify";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
function Tableexpense({
  transactions,
  SetisEditModalVisible,
  changeditdata,
  deletetrans,
}) {
  const [search, Setsearch] = useState("");
  const [sortkey, Setsortkey] = useState("");
  const[mop,Setmop]=useState("")
  const[tag,Settag]=useState('')
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Mode of Payment",
      dataIndex: "mop",
      key: "mop",
    },
    {
      title: "Edit or Delete",
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

  let filteredarray = transactions.filter((element) =>
    element.name.toLowerCase().includes(search.toLowerCase()) && element.mop.includes(mop) && element.tag.includes(tag)
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
        <Select
          className="select-input"
          onChange={(value) => Settag(value)}
          value={tag}
          placeholder="Tags"
        >
          <Option value="">All Tags</Option>
          <Option value="food">Food</Option>
          <Option value="education">Education</Option>
          <Option value="office">Office</Option>
          <Option value="shopping">Shopping</Option>
          <Option value="transportation">Transportation</Option>
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
          <h2>My Expenses</h2>
          <Radio.Group
            onChange={(event) => Setsortkey(event.target.value)}
            value={sortkey}
            className="input-radio"
          >
            <Radio.Button value="">No sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>
        <Table dataSource={sortedarray} columns={columns} size={'small'}/>;
      </div>
    </motion.div>
  );
}

export default Tableexpense;
