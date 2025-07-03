import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../CustomNode/CustomNode';
import { getLayoutedElements } from '../../utils/layout';
import { validateDAG } from '../../utils/validateDAG';
import Modal from 'react-modal';
import './index.css'

Modal.setAppElement('#root');
const nodeTypes = { custom: CustomNode };

export default function PipelineEditor() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [validation, setValidation] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const { fitView } = useReactFlow();

    useEffect(() => {
        const result = validateDAG(nodes, edges);
        setValidation(result);
    }, [nodes, edges]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete" || e.key === 'd') {
                setNodes((prevNodes) => {
                    const selectedIds = new Set(prevNodes.filter(n => n.selected).map(n => n.id));
                    const filteredNodes = prevNodes.filter(n => !selectedIds.has(n.id));

                    setEdges((prevEdges) => {
                        const filteredEdges = prevEdges.filter(
                            (e) =>
                                !e.selected &&
                                !selectedIds.has(e.source) &&
                                !selectedIds.has(e.target)
                        );
                        setValidation(validateDAG(filteredNodes, filteredEdges));
                        return filteredEdges;
                    });

                    return filteredNodes;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setEdges, setNodes]);


    const onConnect = useCallback(
        (params) => {
            if (params.source === params.target) return;
            setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrow' } }, eds));
        },
        [setEdges]
    );

    const openModal = () => {
        setNewLabel('');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAddNode = () => {
        if (!newLabel.trim()) return;
        const id = `${+new Date()}`;
        setNodes((nds) => [
            ...nds,
            {
                id,
                data: { label: newLabel },
                position: { x: Math.random() * 250, y: Math.random() * 250 },
                type: 'custom',
            },
        ]);
        closeModal();
    };


    const autoLayout = () => {
        const layouted = getLayoutedElements(nodes, edges);
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
        fitView();
    };

    return (
        <div className='editor'>
            <div className='sidebox'>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Node"
                    className="react-modal-content"
                    overlayClassName="react-modal-overlay"
                >
                    <h2>Add Node</h2>
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Enter node label"
                        className="input-field"
                    />
                    <div className='modal-btns'>
                        <button onClick={closeModal}>Cancel</button>
                        <button onClick={handleAddNode} disabled={!newLabel.trim()}>
                            Add
                        </button>
                    </div>
                </Modal>
                <div className='row'>
                    <button onClick={openModal}>Add Node</button>
                    <button onClick={autoLayout}>Auto Layout</button>
                </div>
                <span className='validationH'>Validation for Directed Acyclic Graph</span>
                <span className='validation'>{validation}</span>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
