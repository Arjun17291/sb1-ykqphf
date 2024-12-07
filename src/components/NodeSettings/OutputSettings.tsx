import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { OutputConfig } from '../../types/flow';

interface OutputSettingsProps {
  nodeId: string;
  config?: OutputConfig;
}

export const OutputSettings: React.FC<OutputSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);
  const [schemaKey, setSchemaKey] = React.useState('');
  const [schemaType, setSchemaType] = React.useState('string');

  const handleChange = (field: keyof OutputConfig, value: any) => {
    const newConfig: OutputConfig = {
      name: config?.name || '',
      description: config?.description || '',
      schema: config?.schema || {},
      ...config,
      [field]: value,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  const addSchemaField = () => {
    if (schemaKey) {
      handleChange('schema', {
        ...config?.schema,
        [schemaKey]: schemaType,
      });
      setSchemaKey('');
      setSchemaType('string');
    }
  };

  const removeSchemaField = (key: string) => {
    const newSchema = { ...config?.schema };
    delete newSchema[key];
    handleChange('schema', newSchema);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Output Name</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Schema</label>
        <div className="space-y-2">
          {Object.entries(config?.schema || {}).map(([key, type]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium">{key}:</span>
              <span>{type}</span>
              <button
                onClick={() => removeSchemaField(key)}
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
            placeholder="Field name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={schemaKey}
            onChange={(e) => setSchemaKey(e.target.value)}
          />
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={schemaType}
            onChange={(e) => setSchemaType(e.target.value)}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
          <button
            onClick={addSchemaField}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};