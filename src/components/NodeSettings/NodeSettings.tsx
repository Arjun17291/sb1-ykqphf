import React from 'react';
import { NodeType, NodeConfig } from '../../types/flow';
import { LLMSettings } from './LLMSettings';
import { DatabaseSettings } from './DatabaseSettings';
import { BranchSettings } from './BranchSettings';
import { InputSettings } from './InputSettings';
import { OutputSettings } from './OutputSettings';

interface NodeSettingsProps {
  nodeId: string;
  type: NodeType;
  config?: NodeConfig;
}

export const NodeSettings: React.FC<NodeSettingsProps> = ({ nodeId, type, config }) => {
  const renderSettings = () => {
    switch (type) {
      case 'llm':
        return (
          <LLMSettings
            nodeId={nodeId}
            config={config}
          />
        );
      case 'tool':
        return (
          <DatabaseSettings
            nodeId={nodeId}
            config={config}
          />
        );
      case 'branch':
        return (
          <BranchSettings
            nodeId={nodeId}
            config={config}
          />
        );
      case 'input':
        return (
          <InputSettings
            nodeId={nodeId}
            config={config}
          />
        );
      case 'output':
        return (
          <OutputSettings
            nodeId={nodeId}
            config={config}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderSettings()}
    </div>
  );
};