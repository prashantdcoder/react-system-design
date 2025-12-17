import { TrophyIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Player } from '../../../utils/types';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import Board from '../Board/Board';

export const Game: React.FC = () => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [captureMap, setCaptureMap] = useState<Map<string, Player>>(new Map());
    const [cellArray, setCellArray] = useState<(Player | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
    const [turn, setTurn] = React.useState<Player | null>(null);

    const setNextPlayerTurn = useCallback((e: React.MouseEvent<HTMLDivElement>, cellId?: string): void => {
        if (captureMap.size === 9 || winner !== null) {
            return;
        }
        if (!captureMap.has(cellId)) {
            const turnValue = turn === Player.X ? Player.O : Player.X;
            const newCaptureMap: Map<string, Player> = new Map(captureMap);
            newCaptureMap.set(cellId, turnValue);
            const array = [...cellArray];
            const cellIdSplitter = cellId.split("-");
            array[parseInt(cellIdSplitter[0])][parseInt(cellIdSplitter[1])] = turnValue;
            setCaptureMap(newCaptureMap);
            setTurn(turnValue);
            setCellArray(array);
        }
    }, [cellArray])

    useEffect(() => {
        calculateWinner();
    }, [cellArray])

    const calculateWinner = useCallback(() => {
        const winningPlayer: Player = calculateWinnerCombination();
        setWinner(winningPlayer);
    }, [cellArray]);

    const calculateWinnerCombination = (): Player => {
        const array = [...cellArray];
        let winningPlayer = null;
        for (let i = 0; i < 3; i++) {
            let rowValue = "";
            let colValue = "";
            if (array[0][0] === Player.X && array[1][1] === Player.X && array[2][2] === Player.X) {
                winningPlayer = Player.X;
                break;
            }

            if (array[0][0] === Player.O && array[1][1] === Player.O && array[2][2] === Player.O) {
                winningPlayer = Player.O;
                break;
            }

            if (array[0][2] === Player.X && array[1][1] === Player.X && array[2][0] === Player.X) {
                winningPlayer = Player.X;
                break;
            }

            if (array[0][2] === Player.O && array[1][1] === Player.O && array[2][0] === Player.O) {
                winningPlayer = Player.O;
                break;
            }


            for (let j = 0; j < 3; j++) {
                rowValue += array[i][j];
                colValue += array[j][i];
            }

            if (rowValue === "XXX" || colValue === "XXX") {
                winningPlayer = Player.X
                break;
            }

            if (rowValue === "OOO" || colValue === "OOO") {
                winningPlayer = Player.O
                break;
            }
        }
        return winningPlayer;
    }


    return (
        <div className='flex flex-col justify-center items-center gap-2 p-5'>
            {
                winner && <Alert className='w-[50%] bg-green-500 text-amber-50'>
                    <TrophyIcon />
                    <AlertTitle>Congratulations!!</AlertTitle>
                    <AlertDescription>
                        The winner of Tic Tac Toe Game is player {winner}.
                    </AlertDescription>
                </Alert>
            }
            <Board cells={cellArray} setNextPlayerTurn={setNextPlayerTurn} />
        </div>
    )
}
