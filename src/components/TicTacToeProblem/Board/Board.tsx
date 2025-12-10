import React from 'react'
import Cell from '../Cell/Cell'
import './Board.css';
const Board: React.FC = () => {
    return (
        <div className='board-container gap-3'>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
        </div>
    )
}

export default Board