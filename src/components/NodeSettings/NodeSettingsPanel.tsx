import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { LLMSettings } from './LLMSettings';
import { ToolSettings } from './ToolSettings';
import { BranchSettings } from './BranchSettings';
import { InputSettings } from './InputSettings';
import { OutputSettings } from './OutputSettings';
import { Button } from '../Button';
import { X } from 'lucide-react';

export const NodeSettingsPanel: React.FC = () => {
  const { selectedNode, setSelectedNode, updateNodeLabel } = useFlowStore();

  if (!selectedNode) return null;

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeLabel(selectedNode.id, e.target.value);
  };

  const renderSettings = () => {
    switch (selectedNode.data.type) {
      case 'llm':
        return (
          <LLMSettings
            nodeId={selectedNode.id}
            config={selectedNode.data.configuration}
          />
        );
      case 'tool':
        return (
          <ToolSettings
            nodeId={selectedNode.id}
            config={selectedNode.data.configuration}
          />
        );
      case 'branch':
        return (
          <BranchSettings
            nodeId={selectedNode.id}
            config={selectedNode.data.configuration}
          />
        );
      case 'input':
        return (
          <InputSettings
            nodeId={selectedNode.id}
            config={selectedNode.data.configuration}
          />
        );
      case 'output':
        return (
          <OutputSettings
            nodeId={selectedNode.id}
            config={selectedNode.data.configuration}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute right-4 top-4 w-80 bg-white rounded-lg shadow-lg p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Node Settings</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSelectedNode(null)}
          className="!p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Node Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
          />
        </div>

        {renderSettings()}
      </div>
    </div>
  );
};