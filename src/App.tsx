import { useState } from "react";
import Block, { IBlockProps } from "./components/Block/Block.tsx";
import Arrow, { IArrowProps } from "./components/Arrow/Arrow.tsx";
import './App.css';

type IArrow = IArrowProps & { id: number };
type IBlock = IBlockProps & { id: number, content: string };

const App = () => {
    const [blocks, setBlocks] = useState<IBlock[]>([]);
    const [arrows, setArrows] = useState<IArrow[]>([]);

    const addBlock = (): void => {
        const newBlock: IBlock = {
            id: Math.random(),
            x: window.innerWidth / 2 - 50,
            y: window.innerHeight / 2 - 25,
            content: 'Новый блок'
        };

        setBlocks([...blocks, newBlock]);
    };

    const addArrow = (): void => {
        const newArrow: IArrow = {
            id: Math.random(),
            startX: window.innerWidth / 2 - 50,
            startY: window.innerHeight / 2,
            endX: window.innerWidth / 2 + 50,
            endY: window.innerHeight / 2,
        };

        setArrows([...arrows, newArrow]);
    };

    const handleBlockMove = (id: number, newX: number, newY: number) => {
        const updatedBlocks = blocks.map(block =>
            block.id === id ? { ...block, x: newX, y: newY } : block
        );
        setBlocks(updatedBlocks);
    };

    const handleArrowMove = (id: number, newStartX: number, newStartY: number, newEndX: number, newEndY: number) => {
        const updatedArrows = arrows.map(arrow =>
            arrow.id === id ? { ...arrow, startX: newStartX, startY: newStartY, endX: newEndX, endY: newEndY } : arrow
        );
        setArrows(updatedArrows);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', border: '1px solid #ccc' }}>
            {blocks.map(block => (
                <Block
                    key={block.id}
                    x={block.x}
                    y={block.y}
                    className={block.className}
                    onMouseMove={(newX, newY) => handleBlockMove(block.id, newX, newY)}
                >
                    {block.content}
                </Block>
            ))}
            {arrows.map(arrow => (
                <Arrow
                    key={arrow.id}
                    startX={arrow.startX}
                    startY={arrow.startY}
                    endX={arrow.endX}
                    endY={arrow.endY}
                    onMouseMove={(newStartX, newStartY, newEndX, newEndY) =>
                        handleArrowMove(arrow.id, newStartX, newStartY, newEndX, newEndY)}
                />
            ))}
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                <button onClick={addBlock}>Добавить блок</button>
                <button onClick={addArrow}>Добавить стрелку</button>
            </div>

        </div>
    );
};

export default App;
