import React, {useEffect} from 'react';

export default function About() {

    useEffect(() => {
        document.title = "About - EbonyMemo admin panel";
    }, [])

    return (
        <div>
            <h4>This is about page</h4>
        </div>
    )
}
