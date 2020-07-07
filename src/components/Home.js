import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        document.title = "Home - EbonyMemo admin panel";
    }, [])

    return (
        <div>
            <h4>This is home page</h4>
        </div>
    )
}
