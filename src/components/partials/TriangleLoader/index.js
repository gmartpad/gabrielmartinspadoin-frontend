import React from 'react';
import { Div } from './styled';

const TriangleLoader = () => {
    return (
        <Div>
            <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
        </Div>
    );
}

export default TriangleLoader;