import React, { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

export default function ResponsiveMobile() {

    const [show, setShow] = useState(false);

    const handleShowList = () => setShow(true);
    const handleShowChat = () => setShow(false);

    return (
        <div className='div-container'>
            <button onClick={handleShowList}>
                <Icon.List className='List-icon'/>
            </button>
            <button onClick={handleShowChat}>
                <Icon.Chat className='Chat-icon' />
            </button>
            <button>
                <Icon.ArrowLeft className='Arrow-left-icon' />
            </button>
            <button>
                <Icon.ArrowRight className='Arrow-right-icon' />
            </button>
        </div>
    );
}
