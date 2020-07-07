import React from 'react';
import '../styles.scss';
import {Link} from 'react-router-dom';

export default function DevCard({dev}) {
    return (
        // <ul className="dev-card">
        //     <li><a className="id">{dev.devId}</a></li>
        //     <li>{dev.name}</li>
        //     <li>{dev.origin}</li>
        //     <li><button>Edit</button></li>
        // </ul> 
        // <table className="dev-card">
            <tr>
                <td><a className="var">{dev.devId}</a></td>
                <td>{dev.name}</td>
                <td>{dev.origin}</td>
                <td className="edit-button-cell"><Link to={`/developers/${dev.devId} `}><button>Edit</button></Link></td>
            </tr>
        // </table> 
    )
}
