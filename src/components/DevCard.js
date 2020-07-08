import React from 'react';
import '../styles.scss';
import {Link} from 'react-router-dom';

export default function DevCard({dev}) {
    return (
            <tr>
                <td><span className="var">{dev.devId}</span></td>
                <td>{dev.name}</td>
                <td>{dev.origin}</td>
                <td className="edit-button-cell"><Link to={`/developers/${dev.devId} `}><button>Edit</button></Link></td>
            </tr>
    )
}
