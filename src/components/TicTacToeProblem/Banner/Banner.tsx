import { TrophyIcon } from 'lucide-react';
import React from 'react';
import { ticTacToeProblemLocale } from '../../../utils/constants';
import { Player } from '../../../utils/types';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

interface BannerProps {
    winner: Player;
}
const Banner: React.FC<BannerProps> = ({ winner }) => {
    const { title, description } = ticTacToeProblemLocale.banner;
    return (
        <Alert className='w-[50%] bg-green-500 text-amber-50'>
            <TrophyIcon color='#fff' />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description} {winner}
            </AlertDescription>
        </Alert>
    )
}

export default Banner;