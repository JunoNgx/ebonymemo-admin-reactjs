import React, {useEffect} from 'react';
import '../styles.scss';
import GameCard from './GameCard';

export default function GamePanel({games}) {

    useEffect(() => {
        document.title = "Games - EbonyMemo admin panel";
    }, [])

    return (
        <div>
            {games.map(game => (
                <GameCard key={game.gameId} game={game}/>
            ))}
        </div>
    )
}
