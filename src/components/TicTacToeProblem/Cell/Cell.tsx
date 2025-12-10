import React from 'react';
import './Cell.css';

const Cell: React.FC = () => {
    return (
        <div className="tic-tac-toe-cell-x
        cursor-pointer
        rounded-lg
        aspect-square
        bg-white shadow
        typecard flex
        items-center
        justify-center" />
    )
}

export default Cell;