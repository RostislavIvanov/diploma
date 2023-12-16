import React, { FC, useState, useEffect } from "react";

export interface IArrowProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    onMouseMove?: (newStartX: number, newStartY: number, newEndX: number, newEndY: number) => void;
}

const Arrow: FC<IArrowProps> = ({ startX, startY, endX, endY, onMouseMove }) => {
    const [isArrowStartDragging, setIsArrowStartDragging] = useState<boolean>(false);
    const [isArrowEndDragging, setIsArrowEndDragging] = useState<boolean>(false);
    const [dragOffsetX, setDragOffsetX] = useState<number>(0);
    const [dragOffsetY, setDragOffsetY] = useState<number>(0);
    const circleRadius = 10;
    
    useEffect(() => {
        const handleMouseUp = () => {
            setIsArrowStartDragging(false);
            setIsArrowEndDragging(false);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const offsetX = event.clientX - dragOffsetX;
            const offsetY = event.clientY - dragOffsetY;

            if (isArrowStartDragging && onMouseMove) {
                onMouseMove(offsetX, offsetY, endX, endY);
            } else if (isArrowEndDragging && onMouseMove) {
                onMouseMove(startX, startY, offsetX, offsetY);
            }
        };

        if (isArrowStartDragging || isArrowEndDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isArrowStartDragging, isArrowEndDragging, onMouseMove, endX, endY, startX, startY, dragOffsetX, dragOffsetY]);

    const handleArrowStartMouseDown = (event: React.MouseEvent<SVGCircleElement>): void => {
        setIsArrowStartDragging(true);
        setDragOffsetX(event.clientX - startX);
        setDragOffsetY(event.clientY - startY);
    };

    const handleArrowEndMouseDown = (event: React.MouseEvent<SVGCircleElement>): void => {
        setIsArrowEndDragging(true);
        setDragOffsetX(event.clientX - endX);
        setDragOffsetY(event.clientY - endY);
    };

    return (
        <svg
            style={{ position: 'absolute', overflow: "visible", width: '1px', height: '1px'}}
        >
            <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                strokeWidth={circleRadius / 2}
                stroke={'purple'}
            />
            <circle
                cx={startX}
                cy={startY}
                r={circleRadius}
                fill={'purple'}
                onMouseDown={handleArrowStartMouseDown}
                style={{ cursor: 'grab' }}
            />
            <circle
                cx={endX}
                cy={endY}
                r={circleRadius}
                fill={'purple'}
                onMouseDown={handleArrowEndMouseDown}
                style={{ cursor: 'grab' }}
            />
        </svg>
    );
};

export default Arrow;
