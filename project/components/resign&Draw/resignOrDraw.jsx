import React from 'react';
import { Link } from 'react-router-dom';

export default function ResignOrDraw({ resign, draw, vsengine }) {
    return (
        <div className='resign-draw-component'>
            <button className='resign-button' onClick={resign}>
                Resign
            </button>
            <button className='draw-button' onClick={draw}>
                Draw
            </button>
            {vsengine && (
                <Link to='/'>
                    <button className='engine-button'>
                        Main page
                    </button>
                </Link>
            )}
        </div>
    );
}