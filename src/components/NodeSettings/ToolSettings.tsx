import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { ToolConfig } from '../../types/flow';

interface ToolSettingsProps {
  nodeId: string;
  config?: ToolConfig;
}

export const ToolSettings: React.FC<ToolSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);
  const [paramKey, setParamKey] = React.useState('');
  const [paramValue, setParamValue] = React.useState('');

  const handleChange = (field: keyof ToolConfig, value: any) => {
    const newConfig: ToolConfig = {
      name: config?.name || '',
      description: config?.description || '',
      parameters: config?.parameters || {},
      ...config,
      [field]: value,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  const addParameter = () => {
    if (paramKey && paramValue) {
      handleChange('parameters', {
        ...config?.parameters,
        [paramKey]: paramValue,
      });
      setParamKey('');
      setParamValue('');
    }
  };

  const removeParameter = (key: string) => {
    const newParams = { ...config?.parameters };
    delete newParams[key];
    handleChange('parameters', newParams);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tool Name</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Parameters</label>
        <div className="space-y-2">
          {Object.entries(config?.parameters || {}).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
              <button
                onClick={() => removeParameter(key)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Parameter name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={paramKey}
            onChange={(e) => setParamKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={paramValue}
            onChange={(e) => setParamValue(e.target.value)}
          />
          <button
            onClick={addParameter}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};