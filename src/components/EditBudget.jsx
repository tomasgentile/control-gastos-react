import { useState } from 'react';
import Message from './Message'

const EditBudget = ({ budget, setBudget, setEditBudget }) => {
    const [msg, setMsg] = useState('');

    const handleBudget = (e) => {
        e.preventDefault();

        if (!budget || budget < 0) {
            setMsg('No es un prespuesto válido');
            return
        }
        setMsg('');
        setEditBudget(false);
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handleBudget} className='formulario'>
                <div className='campo'>
                    <label htmlFor="edit-presupuesto">Modificar Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type="number"
                        value={budget}
                        id='edit-presupuesto'
                        onChange={e => setBudget(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value='Modificar' />
                {msg && <Message type='error'>{msg}</Message>}
            </form>
        </div>
    )
}

export default EditBudget