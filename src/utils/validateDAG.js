export const validateDAG = (nodes, edges) => {
    if (nodes.length < 2) return 'At least 2 nodes required';

    const adj = {};
    const nodeSet = new Set(nodes.map((n) => n.id));
    nodes.forEach((n) => (adj[n.id] = []));

    edges.forEach((e) => {
        if (nodeSet.has(e.source) && nodeSet.has(e.target)) {
            adj[e.source].push(e.target);
        }
    });

    const visited = {};
    const recStack = {};

    const dfs = (node) => {
        visited[node] = true;
        recStack[node] = true;

        for (const neighbor of adj[node] || []) {
            if (!visited[neighbor] && dfs(neighbor)) return true;
            if (recStack[neighbor]) return true;
        }

        recStack[node] = false;
        return false;
    };

    for (const node of nodes) {
        if (!visited[node.id]) {
            if (dfs(node.id)) return 'Cycle detected';
        }
    }

    for (const node of nodes) {
        const connected = edges.some(
            (e) => e.source === node.id || e.target === node.id
        );
        if (!connected) return 'All nodes must be connected';
    }

    return 'Valid DAG';
};
