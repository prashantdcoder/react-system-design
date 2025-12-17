import { TrophyIcon } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Player } from '../../../utils/types';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import Board from '../Board/Board';

export const Game: React.FC = () => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [captureMap, setCaptureMap] = useState<Map<string, Player>>(new Map());
    const [cellArray, setCellArray] = useState<(Player | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
    const [turn, setTurn] = React.useState<Player | null>(null);

    const setNextPlayerTurn = useCallback((e: React.MouseEvent<HTMLDivElement>, cellId: string): void => {
        if (captureMap.size === 9 || winner !== null) {
            return;
        }
        if (!captureMap.has(cellId)) {
            const turnValue = turn === Player.X ? Player.O : Player.X;
            const newCaptureMap: Map<string, Player> = new Map(captureMap);
            newCaptureMap.set(cellId, turnValue);
            const array = cellArray.map(row => [...row]);
            const cellIdSplitter = cellId.split("-");
            array[parseInt(cellIdSplitter[0])][parseInt(cellIdSplitter[1])] = turnValue;
            setCaptureMap(newCaptureMap);
            setTurn(turnValue);
            setCellArray(array);
        }
    }, [cellArray, winner, turn, captureMap]);

    const calculateWinnerCombination = (): Player | null => {
        const array = [...cellArray];
        let winningPlayer = null;
        const center = array[1][1];
        if (
            center &&
            (array[0][0] === center && array[2][2] === center) ||
            (array[0][2] === center && array[2][0] === center)

        ) {
            return center;
        }


        for (let i = 0; i < 3; i++) {
            let rowValue = "";
            let colValue = "";
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

    const memoisedWinner = useMemo(() => calculateWinnerCombination, [cellArray]);

    useEffect(() => {
        if (memoisedWinner) {
            setWinner(memoisedWinner);
        }
    }, [memoisedWinner])

    return (
        <div className='flex flex-col justify-center items-center gap-2 p-5'>
            {
                winner && <Alert className='w-[50%] bg-green-500 text-amber-50'>
                    <TrophyIcon color='#fff' />
                    <AlertTitle>Congratulations!!</AlertTitle>
                    <AlertDescription>
                        The winner of Tic Tac Toe Game is player {winner}
                    </AlertDescription>
                </Alert>
            }
            <Board cells={cellArray} setNextPlayerTurn={setNextPlayerTurn} />
        </div>
    )
}
