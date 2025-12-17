import React from 'react';
import { BoardProps } from '../../../utils/types';
import Cell from '../Cell/Cell';
import './Board.css';

const Board: React.FC<BoardProps> = ({ cells, setNextPlayerTurn }) => {
    return (
        <div className='board-container gap-3 text-blue-700'>
            {
                cells.map((row, rowIndex) =>
                    row.map((col, colIndex) => {
                        const cellId: string = `${rowIndex}-${colIndex}`;
                        return (
                            <Cell
                                value={col}
                                cellId={cellId}
                                setNextPlayerTurn={setNextPlayerTurn}
                                key={cellId}
                            />
                        );
                    })
                )
            }
        </div>
    )
}

export default React.memo(Board);