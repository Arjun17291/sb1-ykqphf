import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Panel,
  MiniMap,
} from 'reactflow';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlowStore } from '../store/flowStore';
import CustomNode from './CustomNode';
import { Button } from './Button';
import { NodeSettingsPanel } from './NodeSettings/NodeSettingsPanel';
import { FlowHeader } from './FlowHeader';
import 'reactflow/dist/style.css';

const nodeTypes = {
  customNode: CustomNode,
};

export const FlowEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    loadFlow,
    createFlow,
    updateFlow,
    validateFlow,
    setSelectedNode,
  } = useFlowStore();

  useEffect(() => {
    if (id && id !== 'new') {
      loadFlow(id);
    } else {
      createFlow();
    }
  }, [id, loadFlow, createFlow]);

  const handleSave = useCallback(() => {
    if (validateFlow()) {
      const flowId = updateFlow();
      if (id === 'new') {
        navigate(`/flow/${flowId}`);
      }
    }
  }, [id, updateFlow, validateFlow, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <FlowHeader onSave={handleSave} />
      <div className="flex-1 relative" onClick={() => setSelectedNode(null)}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.data?.type) {
                  case 'input': return '#93c5fd';
                  case 'output': return '#86efac';
                  case 'llm': return '#c4b5fd';
                  case 'tool': return '#fca5a5';
                  case 'branch': return '#fcd34d';
                  default: return '#e5e7eb';
                }
              }}
            />
            <NodeSettingsPanel />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};