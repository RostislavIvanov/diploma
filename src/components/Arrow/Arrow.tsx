import { FC } from "react";

interface IArrowProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
const Arrow:FC<IArrowProps> = ({ startX, startY, endX, endY }) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const length = Math.sqrt(dx * dx + dy * dy);

    return (
        <svg style={{
            position: 'absolute',
            width: length,
            height: '20px',
            transform: `translate(${startX}px, ${startY}px) rotate(${angle}deg)`,
            zIndex: 2
        }}>
            <line
                x1="10"
                y1="10"
                x2={length}
                y2="10"
                strokeWidth={'5'}
                stroke={'purple'}
            />
            <circle
                cx={'10'}
                cy={'10'}
                r={10}
                fill={'purple'}
            />
            <circle
                cx={'10'}
                cy={'10'}
                r={5}
                fill={'white'}
            />
            <circle
                cx={length - 10}
                cy={'10'}
                r={10}
                fill={'purple'}
            />
            <circle
                cx={length - 10}
                cy={'10'}
                r={5}
                fill={'white'}
            />
        </svg>
    );
};

export default Arrow;
