import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Brain, Database, FolderGit2, Cable, ChevronDown, ChevronUp } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';
import { clsx } from 'clsx';
import { NodeSettings } from './NodeSettings/NodeSettings';

const iconMap = {
  llm: Brain,
  tool: Database,
  branch: FolderGit2,
  input: Cable,
  output: Cable,
};

const bgColorMap = {
  llm: 'bg-purple-50 hover:bg-purple-100',
  tool: 'bg-red-50 hover:bg-red-100',
  branch: 'bg-yellow-50 hover:bg-yellow-100',
  input: 'bg-blue-50 hover:bg-blue-100',
  output: 'bg-green-50 hover:bg-green-100',
};

const borderColorMap = {
  llm: 'border-purple-200',
  tool: 'border-red-200',
  branch: 'border-yellow-200',
  input: 'border-blue-200',
  output: 'border-green-200',
};

const CustomNode = ({ id, data }: { id: string; data: NodeData }) => {
  const Icon = iconMap[data.type];
  const toggleNodeExpansion = useFlowStore((state) => state.toggleNodeExpansion);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNodeExpansion(id);
  };

  return (
    <div
      className={clsx(
        'shadow-lg rounded-md border-2 transition-all duration-200',
        bgColorMap[data.type],
        borderColorMap[data.type],
        data.isExpanded ? 'min-w-[400px]' : 'min-w-[200px]'
      )}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={clsx(
              'w-5 h-5',
              {
                'text-purple-500': data.type === 'llm',
                'text-red-500': data.type === 'tool',
                'text-yellow-500': data.type === 'branch',
                'text-blue-500': data.type === 'input',
                'text-green-500': data.type === 'output',
              }
            )} />
            <span className="font-medium text-sm">{data.label}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeExpansion(id);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            {data.isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {data.isExpanded && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <NodeSettings nodeId={id} type={data.type} config={data.configuration} />
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default memo(CustomNode);