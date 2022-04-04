import { useState, useEffect } from 'react'
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';
import Header from './components/Header'
import Modal from './components/Modal';
import { idGenerator } from './helpers';
import NewExpenseIcon from './img/nuevo-gasto.svg'

function App() {
  const [budget, setBudget] = useState(
    // comprueba si hay un presupuesto almacenado en localstorage
    Number(localStorage.getItem('budget')) ?? 0);
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  const [expenses, setExpenses] = useState(
    // comprueba si hay gastos almacenados en localstorage
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );
  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);

      setTimeout(() => {
        setModalAnimation(true);
      }, 250);
    }
  }, [editExpense]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    // Si el presupuesto guardado en local storage es mayor a 0, es un presupuesto valido
    const budgetLs = Number(localStorage.getItem('budget')) ?? 0;

    if (budgetLs > 0) {
      setIsValidBudget(true);
    }
  }, []);

  useEffect(() => {
    // guarda en local storage el arreglo de gastos o un arreglo vacio
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    // Filtrar gastos por categoria
    if (filter) {
      const filterExpenses = expenses.filter(expense => expense.category === filter);
      setFilteredExpenses(filterExpenses);
    }
  }, [filter]);

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});

    setTimeout(() => {
      setModalAnimation(true);
    }, 250);
  }

  const saveExpense = (newExpense) => {
    if (newExpense.id) {
      // Editando
      const updatedExpenses = expenses.map(expenseState => expenseState.id === newExpense.id ? newExpense : expenseState);
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      // Guardando nuevo gasto
      newExpense.id = idGenerator();
      newExpense.date = Date.now();
      setExpenses([...expenses, newExpense]);
    }

    setModalAnimation(false);
    setTimeout(() => {
      setModal(false);
    }, 250);
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expenseState => expenseState.id !== id);
    setExpenses(updatedExpenses);
  }

  return (
    <div className={modal ? 'fijar' : null}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpenseList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={NewExpenseIcon}
              alt="New Expense Icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && isValidBudget &&
        <Modal
          setModal={setModal}
          modalAnimation={modalAnimation}
          setModalAnimation={setModalAnimation}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />}

    </div>
  )
}

export default App
