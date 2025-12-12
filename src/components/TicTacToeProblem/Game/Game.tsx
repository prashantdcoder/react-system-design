import React, { useCallback, useEffect, useState } from 'react';
import { Player } from '../../../utils/types';
import Board from '../Board/Board';
import { CheckCircle2Icon, TrophyIcon } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../../ui/alert';

export const Game: React.FC = () => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [captureMap, setCaptureMap] = useState<Map<string, Player>>(new Map());
    const [cellArray, setCellArray] = useState<Array<Player | null>>([null, null, null, null, null, null, null, null, null]);
    const [turn, setTurn] = React.useState<Player | null>(null);

    const setNextPlayerTurn = (e: React.MouseEvent<HTMLDivElement>, cellId?: string): void => {
        if (!cellId || captureMap.size === 9 || winner) {
            return;
        }

        if (!captureMap.has(cellId)) {
            const newCaptureMap: Map<string, Player> = new Map(captureMap);
            newCaptureMap.set(cellId, turn === Player.X ? Player.O : Player.X);
            const turnValue = turn === Player.X ? Player.O : Player.X;
            const array = [...cellArray];
            array[parseInt(cellId)] = turnValue;
            setCaptureMap(newCaptureMap);
            setTurn(turnValue);
            setCellArray(array);
        }
    }

    useEffect(() => {
        calculateWinner();
    }, [cellArray])

    const calculateWinner = useCallback(() => {
        const rowWinnerMap = isWinnerFromRow();
        const columnWinnerMap = isWinnerFromColumn();
        if (rowWinnerMap.size > 0) {
            decideWinner(rowWinnerMap);
            return;
        }

        if (columnWinnerMap.size > 0) {
            decideWinner(columnWinnerMap);
            return;
        }
    }, [cellArray]);

    const decideWinner = (map: Map<Player, boolean>): void => {
        const winnerPlayer: Player = Array.from(map.keys())[0];
        setWinner(winnerPlayer);
    }

    const isWinnerFromRow = (): Map<Player, boolean> => {
        const map = new Map<Player, boolean>();
        for (let i = 0; i < 9; i = i + 3) {
            let xCount = 0;
            let oCount = 0;

            for (let j = i; j < i + 3; j++) {
                const cellValue = cellArray[j];
                if (cellValue === Player.X) {
                    xCount++;
                }

                if (cellValue === Player.O) {
                    oCount++;
                }

                if (xCount === 3 || oCount === 3) {
                    break;
                }
            }
            if (xCount === 3) {
                map.set(Player.X, true);
                return map;
            }
            if (oCount === 3) {
                map.set(Player.O, true);
                return map;
            }
        }
        return map;
    }

    const isWinnerFromColumn = (): Map<Player, boolean> => {
        const map = new Map<Player, boolean>();
        for (let i = 0; i < 3; i++) {
            let xCount = 0;
            let oCount = 0;
            for (let j = 0; j < 3; j++) {
                const cellValue = cellArray[i + (j * 3)];
                if (cellValue === Player.X) {
                    xCount++;
                }

                if (cellValue === Player.O) {
                    oCount++;
                }

                if (xCount === 3 || oCount === 3) {
                    break;
                }
            }
            if (xCount === 3) {
                map.set(Player.X, true);
                return map;
            }
            if (oCount === 3) {
                map.set(Player.O, true);
                return map;
            }
        }
        return map;
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
