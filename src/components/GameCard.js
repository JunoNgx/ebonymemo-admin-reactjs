 import React from 'react';
 import { Link } from 'react-router-dom';
 import '../styles.scss';

export default function GameCard({game}) {
    return (
        <tr>
            <td><span className="var">{game.gameId}</span></td>
            <td>{game.name}</td>
            <td>{game.developer ? game.developer.name : ''}</td>
            <td>{game.releaseYear}</td>
            <td className="edit-button-cell"><Link to={`/games/${game.gameId} `}><button>Edit</button></Link></td>
        </tr>
    )
}
