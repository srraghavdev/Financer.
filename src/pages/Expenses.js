import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncome from "../components/Modals/addIncome";
import AddExpense from "../components/Modals/addExpense";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment/moment";
// dont remove import , it breaks things for some reason
import TableComponent from "../components/TableComponent";
import Charts from "../components/Charts";
import NoTransactions from "../components/NoTransactions";
import Tableincome from "../components/Tableincome";
import Chartsincome from "../components/Chartsincome";
import Tableexpense from "../components/Tableexpense";
import Chartsexpense from "../components/Chartsexpense";
import { v4 as uuidv4 } from "uuid";
import Editmodal from "../components/Editmodal";
import { setDoc } from "firebase/firestore";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
function Expenses() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [expense, Setexpense] = useState(0);
  const [balance, Setbalance] = useState(0);
  const [isEditModalVisible, SetisEditModalVisible] = useState(false);
  const [datatobedited, Setdatatobeedited] = useState({});
  const handleEditCancel = () => {
    SetisEditModalVisible(false);
  };
  useEffect(() => {
    // Get all docs from a collection
    fetchTransactions();
    // fetching all the transactions on page load and if the user still exists
  }, [user]);

  async function fetchTransactions(many) {
    setisLoading(true);
    if (user) {
      const collectionRef = collection(db, `users/${user.uid}/transactions`);
      // getting collection reference of transactions collection for the logged in user
      const querySnapshot = await getDocs(collectionRef);
      // getting all docs in the trasnactions collection
      let transactionsArray = [];
      // temp array to store each individual transaction object
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      if (!many) {
        toast.success("Expenses Fetched!");
      }
      console.log("finished fetching");
    }
    setisLoading(false);
  }

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      // ant design uses moment by default
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      mop: values.mop,
      uuid: uuidv4(),
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    setisLoading(true)
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log(2);
      // add document by getting the collection reference first(by using object data model of firestore aka users/userid/transaction will give refrence to unique transaction colleciton of the logged in user)
      console.log("Document written with ID: ", docRef.id);
      let temparr = [];
      temparr = JSON.parse(JSON.stringify(transactions));
      temparr.push(transaction);
      setTransactions(temparr);
      if (!many) {
        toast.success("Expense Added!");
      }
      console.log("finished adding");
      setisLoading(false)
    } catch (e) {
      console.log("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add income");
      }
    }
  }
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let income = 0;
    let expense = 0;
    transactions.forEach((element) => {
      if (element.type == "expense") {
        expense += element.amount;
      } else {
        income += element.amount;
      }
    });
    Setexpense(expense);
    Setbalance(income - expense);
  }

  let sortedarray = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  let finalarray = sortedarray.filter((element) => element.type == "expense");
  console.log(finalarray);
  function changeditdata(x) {
    Setdatatobeedited({ ...x });
  }

  async function addeditedtransaction(values, type, uid) {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      // ant design uses moment by default
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      mop: values.mop,
      uuid: uid,
    };
    await editdoc(newTransaction, uid);
  }
  async function editdoc(transaction, uid) {
    setisLoading(true)
    try {
      if (user) {
        const collectionRef = collection(db, `users/${user.uid}/transactions`);
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (document) => {
          let x = document.data();
          if (x.uuid == uid) {
            const docRef = doc(
              db,
              `users/${user.uid}/transactions`,
              document.id
            );
            await setDoc(docRef, transaction);
          }
        });
        toast.success("Edited transaction successfully!");
        await fetchTransactions(true);
        console.log("finished editing");
        setisLoading(false)
      }
    } catch (e) {
      console.log("Error editing document: ", e);
      toast.error("Couldn't edit transaction");
    }
  }

  async function deletetrans(uid) {
    setisLoading(true)
    try {
      if (user) {
        const collectionRef = collection(db, `users/${user.uid}/transactions`);
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (document) => {
          let x = document.data();
          if (x.uuid == uid) {
            const docRef = doc(
              db,
              `users/${user.uid}/transactions`,
              document.id
            );
            await deleteDoc(docRef);
          }
        });
        toast.success("Transaction deleted successfully!");
        await fetchTransactions(true);
        console.log("finished deleting");
        setisLoading(false)
      }
    } catch (e) {
      console.log("Error editing document: ", e);
      toast.error("Couldn't delete transaction");
    }
  }
  async function deleteallexpense(){
    setisLoading(true)
    try {
      if (user) {
        const collectionRef = collection(db, `users/${user.uid}/transactions`);
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (document) => {
          let x= document.data()
          if(x.type=='expense'){
             await deleteDoc(doc(db, `users/${user.uid}/transactions`, document.id));
          }
        });
        toast.success("Deleted all expenses successfully!");
        await fetchTransactions(true);
        console.log("finished deleting");
        setisLoading(false)
      }
    } catch (e) {
      console.log("Error deleting expenses: ", e);
      toast.error("Couldn't delete all expenses!");
    }
  }
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Header></Header>
          <Cards
            showExpenseModal={showExpenseModal}
            expense={expense}
            isexpense={true}
            balance={balance}
            deleteallexpense={deleteallexpense}
          ></Cards>
          {transactions.filter(element=>element.type=='expense').length != 0 ? (
            <Chartsexpense sortedarray={finalarray}></Chartsexpense>
          ) : (
            <NoTransactions></NoTransactions>
          )}
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <Tableexpense
            transactions={finalarray}
            SetisEditModalVisible={SetisEditModalVisible}
            changeditdata={changeditdata}
            deletetrans={deletetrans}
          ></Tableexpense>
          <Editmodal
            isEditModalVisible={isEditModalVisible}
            handleEditCancel={handleEditCancel}
            onFinish={addeditedtransaction}
            datatobedited={datatobedited}
            changeditdata={changeditdata}
          ></Editmodal>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export default Expenses;
