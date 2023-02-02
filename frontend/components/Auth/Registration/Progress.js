import React, { useState } from 'react';

export const Progress = ({ status, prog1Title, prog2Title }) => {
    const [isActive, setIsActive] = useState(status);
    return (
        <div className='progress_container'>
            <div className='prog_body prog_1'>
                <div className='prog_main prog_active'>1</div>
                <p className='prog_title'>{prog1Title}</p>
            </div>

            <div className='prog_body connector'>
                <span className='connector_1 connector_active'></span>
                <span className={`connector_2 ${status ? 'connector_active' : 'connector_inactive'}`}></span>
            </div>

            <div className='prog_body prog_2'>
                <div className={`prog_main ${status ? 'prog_active' : 'prog_inactive'}`}>2</div>
                <p className='prog_title'>{prog2Title}</p>
            </div>
        </div>
    )
}
