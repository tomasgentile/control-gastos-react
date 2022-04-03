import { useState, useEffect } from 'react';
import CloseBtn from '../img/cerrar.svg';
import Message from './Message';

const Modal = ({ setModal, modalAnimation, setModalAnimation, saveExpense, editExpense, setEditExpense }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (Object.keys(editExpense).length > 0) {
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setId(editExpense.id);
            setDate(editExpense.date);
        }
    }, []);

    const closeModal = () => {
        setModalAnimation(false);
        setEditExpense({});
        setTimeout(() => {
            setModal(false);
        }, 250);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([name, amount, category].includes('')) {
            setMessage('Todos los campos son requeridos');

            setTimeout(() => {
                setMessage('');
            }, 3000);

            return;
        }
        saveExpense({ name, amount, category, id, date });
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CloseBtn}
                    alt="Cerrar modal"
                    onClick={closeModal}
                />
            </div>

            <form
                className={`formulario ${modalAnimation ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {message && <Message type='error'>{message}</Message>}

                <div className='campo'>
                    <label htmlFor="name">Nombre Gasto</label>
                    <input
                        id='name'
                        type="text"
                        placeholder='Añade el nombre del Gasto'
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="amount">Importe</label>
                    <input
                        id='amount'
                        type="number"
                        placeholder='Añade el importe del Gasto: ej. 300'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="category">Categoria</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscriptions">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={editExpense.name ? "Guardar Cambios" : "Añadir Gasto"}
                />
            </form>
        </div>
    )
}

export default Modal