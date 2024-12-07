import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { NodeData, FlowState, NodeConfig, Flow } from '../types/flow';
import { defaultNodes, defaultEdges } from '../config/defaultFlow';

let nodeId = 0;
let flowId = 0;

const createDefaultFlow = (): Flow => ({
  id: `flow-${++flowId}`,
  name: 'Untitled Flow',
  nodes: defaultNodes,
  edges: defaultEdges,
  author: 'You',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useFlowStore = create<FlowState>((set, get) => ({
  flows: [],
  currentFlow: null,
  nodes: [],
  edges: [],
  selectedNode: null,
  
  createFlow: () => {
    const newFlow = createDefaultFlow();
    set({
      currentFlow: newFlow,
      nodes: newFlow.nodes,
      edges: newFlow.edges,
    });
  },

  loadFlow: (id: string) => {
    const flow = get().flows.find(f => f.id === id);
    if (flow) {
      set({
        currentFlow: flow,
        nodes: flow.nodes,
        edges: flow.edges,
      });
    }
  },

  updateFlow: () => {
    const { currentFlow, nodes, edges, flows } = get();
    if (!currentFlow) return '';

    const updatedFlow = {
      ...currentFlow,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };

    const existingIndex = flows.findIndex(f => f.id === currentFlow.id);
    const updatedFlows = existingIndex >= 0
      ? flows.map(f => f.id === currentFlow.id ? updatedFlow : f)
      : [...flows, updatedFlow];

    set({ flows: updatedFlows, currentFlow: updatedFlow });
    return updatedFlow.id;
  },

  updateFlowName: (name: string) => {
    set(state => ({
      currentFlow: state.currentFlow ? { ...state.currentFlow, name } : null,
    }));
  },

  validateFlow: () => {
    const { nodes, edges } = get();
    
    // Basic validation rules
    const hasInput = nodes.some(node => node.data.type === 'input');
    const hasOutput = nodes.some(node => node.data.type === 'output');
    const isConnected = edges.length >= nodes.length - 1;

    if (!hasInput) {
      alert('Flow must have at least one input node');
      return false;
    }

    if (!hasOutput) {
      alert('Flow must have at least one output node');
      return false;
    }

    if (!isConnected) {
      alert('All nodes must be connected');
      return false;
    }

    return true;
  },

  addNode: (type, position) => {
    const newNode: Node<NodeData> = {
      id: `node-${++nodeId}`,
      type: 'customNode',
      position,
      data: { 
        type, 
        label: type.toUpperCase(),
        isExpanded: false,
      },
    };
    
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  updateNodeConfig: (nodeId, config) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, configuration: config } }
          : node
      ),
    }));
  },

  updateNodeLabel: (nodeId, label) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label } }
          : node
      ),
    }));
  },

  toggleNodeExpansion: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, isExpanded: !node.data.isExpanded } }
          : node
      ),
    }));
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },
  
  onNodesChange: (changes: NodeChange[]) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },
  
  onConnect: (connection: Connection) => {
    set((state) => ({
      edges: addEdge(
        { ...connection, type: 'smoothstep', animated: true },
        state.edges
      ),
    }));
  },
}));