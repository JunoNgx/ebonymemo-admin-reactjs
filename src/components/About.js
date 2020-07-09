import React, {useEffect} from 'react';

export default function About() {

    useEffect(() => {
        document.title = "About - EbonyMemo admin panel";
    }, [])

    return (
        <div className="about">
            <p>This is the admin panel for <strong>EbonyMemo</strong>, an arthouse smartphone videogame currator website that has not yet been deployed.</p>
            <p>This panel is reserved for administrators only and not meant for customers.</p>
        </div>
    )
}
