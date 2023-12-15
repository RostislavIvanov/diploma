import { useState } from "react";
import Block from "./components/Block/Block.tsx";
import Arrow from "./components/Arrow/Arrow.tsx";
import './App.css';

const App = () => {
    const [blocks, setBlocks] = useState([
        { id: 1, x: 50, y: 50, content: 'Изображение' },
        { id: 2, x: 50, y: 150, content: 'Экспозиция +10' },
        { id: 3, x: 300, y: 80, content: 'Светлое изображение', className: 'big' }
    ]);

    const addBlock = () => {
        const newBlock = {
            id: Math.random(), // Генерируем случайный ID (можно использовать UUID для более уникальных значений)
            x: 50,
            y: 250, // Задайте начальное положение нового блока
            content: 'Новый блок' // Задайте содержимое нового блока
        };

        setBlocks([...blocks, newBlock]);
    };

    const handleBlockMove = (id: number, newX: number, newY: number) => {
        const updatedBlocks = blocks.map(block =>
            block.id === id ? { ...block, x: newX, y: newY } : block
        );
        setBlocks(updatedBlocks);
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
            <Arrow startX={183} startY={80} endX={308} endY={120} />
            <Arrow startX={195} startY={148} endX={308} endY={110} />
            <button onClick={addBlock}>Добавить блок</button>
        </div>
    );
};

export default App;
