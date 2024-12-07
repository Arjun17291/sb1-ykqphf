import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { LLMConfig } from '../../types/flow';

interface LLMSettingsProps {
  nodeId: string;
  config?: LLMConfig;
}

export const LLMSettings: React.FC<LLMSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);

  const handleChange = (field: keyof LLMConfig, value: string | number) => {
    const newConfig: LLMConfig = {
      model: config?.model || 'gpt-3.5-turbo',
      temperature: config?.temperature || 0.7,
      maxTokens: config?.maxTokens || 1000,
      prompt: config?.prompt || '',
      ...config,
      [field]: value,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Model</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.model || 'gpt-3.5-turbo'}
          onChange={(e) => handleChange('model', e.target.value)}
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Temperature</label>
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.temperature || 0.7}
          onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.maxTokens || 1000}
          onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prompt</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          value={config?.prompt || ''}
          onChange={(e) => handleChange('prompt', e.target.value)}
        />
      </div>
    </div>
  );
};