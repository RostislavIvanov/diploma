import React, { FC, PropsWithChildren, useState } from "react";
import './Block.css';

interface IBlockProps extends PropsWithChildren {
    x: number;
    y: number;
    className?: string;
    onMouseMove?: (newX: number, newY: number) => void;
}

const Block: FC<IBlockProps> = ({ x, y, children, className, onMouseMove }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        const offsetX = event.clientX - x;
        const offsetY = event.clientY - y;
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragging) {
            const newX = event.clientX - dragOffset.x;
            const newY = event.clientY - dragOffset.y;
            onMouseMove && onMouseMove(newX, newY);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{ top: y, left: x }}
            className={className ? `block ${className}` : 'block'}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </div>
    );
};

export default Block;
