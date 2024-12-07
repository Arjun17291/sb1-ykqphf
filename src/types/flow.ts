import { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';

export type NodeType = 'llm' | 'tool' | 'branch' | 'input' | 'output';

export type ToolType = 
  | 'mysql' 
  | 'mongodb' 
  | 'openai' 
  | 'anthropic' 
  | 'google-ai' 
  | 'huggingface'
  | 'custom';

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'google-ai' | 'huggingface';
  model: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  inputMappings: Record<string, string>;
}

export interface DatabaseConfig {
  type: 'mysql' | 'mongodb';
  connection: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  query: string;
  inputMappings: Record<string, string>;
}

export interface ToolConfig {
  type: ToolType;
  name: string;
  description: string;
  parameters: Record<string, string>;
  inputMappings: Record<string, string>;
}

export interface BranchConfig {
  conditions: Array<{
    condition: string;
    target: string;
  }>;
}

export interface InputConfig {
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
}

export interface OutputConfig {
  name: string;
  description: string;
  schema: Record<string, unknown>;
}

export type NodeConfig = LLMConfig | ToolConfig | DatabaseConfig | BranchConfig | InputConfig | OutputConfig;

export interface NodeData {
  type: NodeType;
  label: string;
  configuration?: NodeConfig;
  isExpanded?: boolean;
}

export interface Flow {
  id: string;
  name: string;
  description?: string;
  nodes: Node[];
  edges: Edge[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlowState {
  flows: Flow[];
  currentFlow: Flow | null;
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeConfig: (nodeId: string, config: NodeConfig) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  toggleNodeExpansion: (nodeId: string) => void;
  setSelectedNode: (node: Node | null) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  createFlow: () => void;
  loadFlow: (id: string) => void;
  updateFlow: () => string;
  updateFlowName: (name: string) => void;
  validateFlow: () => boolean;
}