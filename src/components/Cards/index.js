import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";
import { motion } from "framer-motion"
function Cards({showExpenseModal,showIncomeModal,income,expense,balance,isincome,isexpense,deletealltrans,deleteallincome,deleteallexpense}) {
  return (
    <motion.div initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.3}}>
      <Row className="my-row">
       {balance!=undefined&& !isincome && !isexpense && <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>${balance}</p>
          <Button text="Reset Balance" blue={true} onClick={deletealltrans}/>
        </Card> } 
        {income!=undefined &&<Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>${income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card> }
       {expense!=undefined &&<Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>${expense}</p>
          <Button text={'Add Expense'}  blue={true} onClick={showExpenseModal}/>
        </Card> }
        {isincome && <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>${balance}</p>
          <Button text="Reset Income" blue={true} onClick={deleteallincome}/>
        </Card>}
        {isexpense && <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>${balance}</p>
          <Button text="Reset Expenses" blue={true} onClick={deleteallexpense}/>
        </Card>}
      </Row>
    </motion.div>
  );
}

export default Cards;
