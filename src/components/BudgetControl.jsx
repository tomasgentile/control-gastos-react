import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({ budget, setBudget, expenses, setExpenses, setIsValidBudget }) => {
    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0);
        const totalAvailable = budget - totalSpent;
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

        setAvailable(totalAvailable);
        setPercentage(newPercentage);

        setTimeout(() => {
            setSpent(totalSpent);
        }, 2000);
    }, [expenses]);

    const formatQ = (q) => {
        return q.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('Deseas reiniciar presupuesto y gastos?')
        if (result) {
            setBudget(0);
            setExpenses([]);
            setIsValidBudget(false);
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}% Gastado`}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >Resetar App</button>
                <p><span>Presupuesto: </span>{formatQ(budget)}</p>
                <p className={`${available < 0 ? 'negativo' : null}`}>
                    <span>Disponible: </span>{formatQ(available)}
                </p>
                <p><span>Gastado: </span>{formatQ(spent)}</p>
            </div>
        </div>
    )
}

export default BudgetControl