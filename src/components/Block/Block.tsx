import { FC, PropsWithChildren, useEffect, useState } from "react";
import './Block.css';

interface IBlockProps extends PropsWithChildren {
    x: number;
    y: number;
    className?: string;
    onMouseMove?: (newX: number, newY: number) => void;
}

const Block: FC<IBlockProps> = ({ x, y, children, className, onMouseMove }) => {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };

        const handleGlobalMouseMove = (event: MouseEvent) => {
            const offsetX = event.clientX;
            const offsetY = event.clientY;

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
    }, [isDragging, onMouseMove])

    const handleMouseDown = (): void => {
        setIsDragging(true);
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
