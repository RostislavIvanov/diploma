import React, { useState } from 'react';
import './Modal.css'
import Block from "../Block/Block.tsx";
interface IModalProps {
    onClose: () => void;
    onSave: (content: string, paddingX: string, borderColor: string, fontSize: string, lineHeight: string) => void;
}

const Modal: React.FC<IModalProps> = ({ onClose, onSave }) => {
    const [content, setContent] = useState('Новый блок');
    const [paddingX, setPaddingX] = useState<number>(20);
    const [borderColor, setBorderColor] = useState('#000');
    const [fontSize, setFontSize] = useState<number>(20);
    const [lineHeight, setLineHeight] = useState<number>(20);

    const handleSave = () => {
        onSave(content, `${String(paddingX)}px`, borderColor, `${String(fontSize)}px`, `${String(lineHeight)}px`);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Настройки блока</h2>
                <div className={'modal-block-con'}>
                    <Block
                        x={100}
                        y={100}
                        className="modal-block"
                        borderColor={borderColor}
                        lineHeight={`${String(lineHeight)}px`}
                        fontSize={`${String(fontSize)}px`}
                        paddingX={`${String(paddingX)}px`}
                    >
                        {content}
                    </Block>
                </div>

                <label>
                    Контент:
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>

                <label>
                    Отступы по сторонам:
                    <input
                        type="range"
                        value={paddingX}
                        onChange={(e) => setPaddingX(Number(e.target.value))}
                    />
                </label>
                <label>
                    Цвет рамки:
                    <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                    />
                </label>
                <label>
                    Размер шрифта:
                    <input
                        type="range"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                </label>
                <label>
                    Высота блока:
                    <input
                        type="range"
                        value={lineHeight}
                        onChange={(e) => setLineHeight(Number(e.target.value))}
                    />
                </label>
                <div className="modal-buttons">
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
