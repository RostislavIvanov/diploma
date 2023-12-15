import { FC, PropsWithChildren } from "react";
import './Block.css';
interface IBlockProps extends PropsWithChildren {
    x: number;
    y: number;
    className?: string;
}

const Block: FC<IBlockProps> = ({ x, y, children, className }) => {
    return (
        <div style={{ top: y, left: x }} className={className ? `block ${className}` : 'block'}>
            {children}
        </div>
    );
};

export default Block;
