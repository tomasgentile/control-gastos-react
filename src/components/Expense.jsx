import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
// para que funcione swipeable list es necesario isntalar npm i prop-types
import { formatDate } from '../helpers';
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const icons = {
  ahorro: IconoAhorro,
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}

const Expense = ({ expense, setEditExpense, deleteExpense }) => {
  const { name, category, amount, id, date } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>Editar</SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
        Eliminar</SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={icons[category]} alt="Icono gasto" />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='gasto'>{name}</p>
              <p className='fecha-gasto'>Agregado el: {''}<span>{formatDate(date)}</span></p>
            </div>
          </div>
          <p className='cantidad-gasto'>{'$' + amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense