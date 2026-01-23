import React from 'react';
import './Cell.css';
import { CellProps, Player } from '../../../utils/types';

const Cell: React.FC<CellProps> = ({ setNextPlayerTurn, cellId, value }) => {
    const cssStyle = value === Player.X ? 'tic-tac-toe-cell-x' : value === Player.O ? 'tic-tac-toe-cell-o' : 'tic-tac-toe-cell-empty'; ``
    return (
        <div
            data-testid={`tic-tac-toe-cell-${cellId}`}
            className={`
            ${cssStyle}
            cursor-pointer
            rounded-lg
            aspect-square
            bg-white shadow
            typecard flex
            hover:shadow-lg
            items-center
            justify-center`}
            onClick={(e) => setNextPlayerTurn(e, cellId)}
        />
    )
}

export default Cell;