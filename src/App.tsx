import Block from "./components/Block/Block.tsx";
import Arrow from "./components/Arrow/Arrow.tsx";
import './App.css'
const App = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', border: '1px solid #ccc' }}>
            <Block x={50} y={50}>Изображение</Block>
            <Block x={50} y={150}>Экспозиция +10</Block>
            <Arrow startX={183} startY={80} endX={308} endY={120} />
            <Arrow startX={195} startY={148} endX={308} endY={110} />
            <Block x={300} y={80} className={'big'}>Светлое изображение</Block>
        </div>
    );
};

export default App;
