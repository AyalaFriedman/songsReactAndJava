import React from 'react';
import './title.css';

const Title: React.FC = () => {
    return <>
        <div className="hederRow">
            <span className="title">Title</span>
            <span className="title">Artist</span>
            <span className="title">Price</span>
        </div>
    </>
}

export default Title;
