import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import './Block.css';

export interface IBlockProps extends PropsWithChildren {
    x: number;
    y: number;
    className?: string;
    onMouseMove?: (newX: number, newY: number) => void;
}

const Block: FC<IBlockProps> = ({ x, y, children, className, onMouseMove }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragOffsetX, setDragOffsetX] = useState<number>(0);
    const [dragOffsetY, setDragOffsetY] = useState<number>(0);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };

        const handleGlobalMouseMove = (event: MouseEvent) => {
            const offsetX = event.clientX - dragOffsetX;
            const offsetY = event.clientY - dragOffsetY;

            if (isDragging && onMouseMove) {
                onMouseMove(offsetX, offsetY);
            }
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleGlobalMouseMove);
            document.addEventListener("mouseup", handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [isDragging, onMouseMove, dragOffsetX, dragOffsetY]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        setIsDragging(true);
        setDragOffsetX(event.clientX - x);
        setDragOffsetY(event.clientY - y);
    };

    return (
        <div
            style={{ top: y, left: x }}
            className={className ? `block ${className}` : 'block'}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
};

export default Block;
