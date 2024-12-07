import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { InputConfig } from '../../types/flow';

interface InputSettingsProps {
  nodeId: string;
  config?: InputConfig;
}

export const InputSettings: React.FC<InputSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);

  const handleChange = (field: keyof InputConfig, value: any) => {
    const newConfig: InputConfig = {
      name: config?.name || '',
      description: config?.description || '',
      type: config?.type || 'string',
      required: config?.required || false,
      ...config,
      [field]: value,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Input Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={config?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.type || 'string'}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="required"
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={config?.required || false}
          onChange={(e) => handleChange('required', e.target.checked)}
        />
        <label htmlFor="required" className="text-sm font-medium text-gray-700">
          Required
        </label>
      </div>
    </div>
  );
};