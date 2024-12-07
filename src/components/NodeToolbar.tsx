import React from 'react';
import { Brain, Hammer, FolderGit2, Cable } from 'lucide-react';
import { Button } from './Button';
import { useFlowStore } from '../store/flowStore';
import { NodeType } from '../types/flow';

const tools: { type: NodeType; icon: React.ElementType; label: string }[] = [
  { type: 'llm', icon: Brain, label: 'LLM' },
  { type: 'tool', icon: Hammer, label: 'Tool' },
  { type: 'branch', icon: FolderGit2, label: 'Branch' },
  { type: 'input', icon: Cable, label: 'Input' },
  { type: 'output', icon: Cable, label: 'Output' },
];

export const NodeToolbar: React.FC = () => {
  const addNode = useFlowStore((state) => state.addNode);

  const handleAddNode = (type: NodeType) => {
    addNode(type, {
      x: Math.random() * 500,
      y: Math.random() * 500,
    });
    alert('clicked', type);
  };

  return (
    <div className="absolute left-4 top-4 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg`z-50">
      {tools.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          onClick={() => handleAddNode(type)}
          className="flex items-center gap-2"
          variant="secondary"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};
