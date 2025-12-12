import React from 'react';
import { BoardProps } from '../../../utils/types';
import Cell from '../Cell/Cell';
import './Board.css';

const Board: React.FC<BoardProps> = ({ cells, setNextPlayerTurn }) => {
    return (
        <div className='board-container gap-3 text-blue-700'>
            {
                cells.map((item, rowIndex) => {
                    const cellId: string = `${rowIndex}`;
                    return (<Cell value={item} cellId={cellId} setNextPlayerTurn={setNextPlayerTurn} key={cellId} />)
                })
            }
        </div>
    )
}

export default React.memo(Board);