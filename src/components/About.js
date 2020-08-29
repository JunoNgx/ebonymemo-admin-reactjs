import React, {useEffect} from 'react';

export default function About() {

    useEffect(() => {
        document.title = "About - EbonyMemo admin panel";
    }, [])

    return (
        <div className="about">
            <p>This is the content management application for <strong>Ebony Memo</strong>, an arthouse videogame curator website for smartphones.</p>
            <p>This application is made with <strong>ReactJS</strong> and communicates with a <strong>NodeJS/Express backend</strong> via a RESTful API. For more information and the juicy details, view the <a href="https://github.com/JunoNgx/ebonymemo-backend-nodejs" target="_blank">source on GitHub</a>.</p>
            <p>For any question, suggestion, or query, please feel free to contact Juno via Twitter, GitHub or email.</p>
        </div>
    )
}
