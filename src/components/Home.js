import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        document.title = "Home - EbonyMemo admin panel";
    }, [])

    return (
        <div className="welcome">
            <h4>Welcome to EbonyMemo admin panel</h4>
            <p>Use the navigation bar and manage content as needed. Documentation and guides are generally written on the respective pages.</p>
            <p>Don't hesitate to contact me if you have any question.</p>
        </div>
    )
}
