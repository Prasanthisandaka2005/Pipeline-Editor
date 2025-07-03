import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import PipelineEditor from './components/PipelineEditor/PipelineEditor';
import './App.css'

export default function App() {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
}
