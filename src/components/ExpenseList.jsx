import React from 'react'
import Expense from './Expense'

const ExpenseList = ({ expenses, setEditExpense, deleteExpense, filter, filteredExpenses }) => {
    return (
        <div className='listado-gastos contenedor'>


            {filter ? (
                <>
                    <h2>{filteredExpenses.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
                    {filteredExpenses.map(expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                    ))}
                </>
            ) : (
                <>
                    <h2>{expenses.length ? 'Gastos' : 'No hay gastos aún'}</h2>
                    {expenses.map(expense => (
                        <Expense
                            key={expense.id}
                            expense={expense}
                            setEditExpense={setEditExpense}
                            deleteExpense={deleteExpense}
                        />
                    ))}
                </>

            )}
        </div>
    )
}

export default ExpenseList