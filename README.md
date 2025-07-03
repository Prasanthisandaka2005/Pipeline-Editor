<h1>🧠 Nexstem Pipeline Editor – DAG Builder</h1>

  <p>A React-based Pipeline Editor that allows users to visually construct and validate Directed Acyclic Graphs (DAGs), simulating real-world data pipelines.</p>

  <h2>📸 Demo</h2>
  <p><a href="https://pipeline-editor-gold.vercel.app/" target="_blank">🔗 Live Demo</a></p>

  <h2>📦 Features</h2>
  <ul>
    <li>➕ Add custom-labeled nodes via modal</li>
    <li>🔗 Draw directional edges (source ➝ target)</li>
    <li>❌ Delete selected nodes/edges using <code>D</code> or <code>Delete</code> key</li>
    <li>🔄 Auto layout using Dagre (top-down flow)</li>
    <li>✅ Live DAG validation</li>
    <ul>
      <li>At least 2 nodes</li>
      <li>No cycles</li>
      <li>No self-connections</li>
      <li>All nodes must be connected</li>
    </ul>
    <li>📦 Optional real-time JSON view of nodes and edges</li>
    <li>🎨 Minimal UI with tooltips and icons</li>
  </ul>

  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li>⚛️ React</li>
    <li>📈 reactflow</li>
    <li>🧱 dagre</li>
    <li>🧪 Custom DAG validator</li>
    <li>🎨 react-modal</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre><code>
src/
├── components/
│   ├── CustomNode/         # Custom node with handles
│   ├── PipelineEditor/     # Main graph editor
├── utils/
│   ├── layout.js           # Dagre auto layout logic
│   ├── validateDAG.js      # DAG validation logic
├── App.jsx
└── index.js
  </code></pre>

  <h2>🚀 Setup Instructions</h2>
  <ol>
    <li><strong>Clone the repository</strong>
      <pre><code>git clone https://github.com/your-username/pipeline-editor.git
cd DagPipeline</code></pre>
    </li>
    <li><strong>Install dependencies</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Start development server</strong>
      <pre><code>npm run dev   # for Vite</code></pre>
    </li>
  </ol>

  <h2>🧩 Libraries Used</h2>
  <ul>
    <li><a href="https://reactflow.dev/" target="_blank">reactflow</a> – interactive graph UI</li>
    <li><a href="https://github.com/dagrejs/dagre" target="_blank">dagre</a> – layout engine</li>
    <li><a href="https://github.com/reactjs/react-modal" target="_blank">react-modal</a> – modal dialog</li>
  </ul>

  <h2>✅ Validation Logic</h2>
  <p>Validation is triggered on every node/edge update and includes:</p>
  <ul>
    <li>✅ At least 2 nodes</li>
    <li>✅ No cycles (DFS-based detection)</li>
    <li>✅ All nodes connected</li>
    <li>✅ No self-loops</li>
    <li>✅ Correct direction: source ➝ target</li>
  </ul>

  <h2>🎥 Recordings</h2>
  <p><a href="https://drive.google.com/file/d/1uKM_ehUK8_AIiUxtEHeMVQ9pqt_O7LMs/view?usp=sharing" target="_blank">🎬 Watch Demo Video</a></p>

  <h2>🤯 Challenges Faced</h2>
  <ul>
    <li>Ensuring validation updated on deletion</li>
    <li>Preventing invalid self or parallel connections</li>
    <li>Adapting layout to Dagre’s expectations</li>
    <li>Managing state without unnecessary re-renders</li>
  </ul>

  <h2>🧠 Learnings & Takeaways</h2>
  <ul>
    <li>Deeper understanding of DAGs and graph traversal</li>
    <li>Hands-on experience with React Flow & Dagre</li>
    <li>Clean React state architecture & validation logic</li>
    <li>Built reusable UI with modals and hooks</li>
  </ul>
