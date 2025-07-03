import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => (
    <div className="react-flow__node-default">
        <Handle type="target" position={Position.Left} />
        <div>{data.label}</div>
        <Handle type="source" position={Position.Right} />
    </div>
)

export default CustomNode