import { TrophyIcon } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Player } from '../../../utils/types';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import Board from '../Board/Board';

export const Game: React.FC = () => {
    const [cellArray, setCellArray] = useState<(Player | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
    const [turn, setTurn] = React.useState<Player | null>(null);

    const calculateWinnerCombination = (): Player | null => {
        const array = [...cellArray];
        let winningPlayer = null;
        const currentPlayer: Player = turn;
        const firstDiagonal: boolean = array[0][0] === currentPlayer && array[2][2] === currentPlayer && array[1][1] === currentPlayer;
        const secondDiagonal: boolean = array[0][2] === currentPlayer && array[2][0] === currentPlayer && array[1][1] === currentPlayer;

        if (currentPlayer && firstDiagonal || secondDiagonal) {
            return currentPlayer;
        }

        for (let i = 0; i < 3; i++) {
            //row
            if (array[i][0] === currentPlayer &&
                array[i][1] === currentPlayer &&
                array[i][2] === currentPlayer) {
                winningPlayer = currentPlayer;
                break;
            }
            //column
            if (array[0][i] === currentPlayer &&
                array[1][i] === currentPlayer &&
                array[2][i] === currentPlayer) {
                winningPlayer = currentPlayer;
                break;
            }
        }
        return winningPlayer;
    }

    const gameWinner: Player = useMemo(() => calculateWinnerCombination(), [cellArray]);

    const setNextPlayerTurn = useCallback((e: React.MouseEvent<HTMLDivElement>, cellId: string): void => {
        if (gameWinner !== null) {
            return;
        }

        const cellIdSplitter: string[] = cellId.split("-");
        const [row, column] = [parseInt(cellIdSplitter[0]), parseInt(cellIdSplitter[1])];
        const array: Player[][] = cellArray.map(row => [...row]);
        if (array[row][column] === null) {
            const turnValue = turn === Player.X ? Player.O : Player.X;
            array[row][column] = turnValue;
            setTurn(turnValue);
            setCellArray(array);
        }
    }, [cellArray, gameWinner, turn]);

    return (
        <div className='flex flex-col justify-center items-center gap-2 p-5'>
            {
                gameWinner && <Alert className='w-[50%] bg-green-500 text-amber-50'>
                    <TrophyIcon color='#fff' />
                    <AlertTitle>Congratulations!!</AlertTitle>
                    <AlertDescription>
                        The winner of Tic Tac Toe Game is player {gameWinner}
                    </AlertDescription>
                </Alert>
            }
            <Board cells={cellArray} setNextPlayerTurn={setNextPlayerTurn} />
        </div>
    )
}
