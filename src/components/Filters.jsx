import { useState, useEffect } from 'react'

const Filter = ({ filter, setFilter }) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label htmlFor="filtro">Filtrar Gastos</label>
                    <select
                        id="filtro"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="">Todas las Categorías</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscriptions">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filter
