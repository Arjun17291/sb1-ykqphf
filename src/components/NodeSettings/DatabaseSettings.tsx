import React, { useState } from 'react';
import { useFlowStore } from '../../store/flowStore';
import { DatabaseConfig } from '../../types/flow';

interface DatabaseSettingsProps {
  nodeId: string;
  config?: DatabaseConfig;
}

export const DatabaseSettings: React.FC<DatabaseSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setValue] = useState('');

  const handleChange = (field: keyof DatabaseConfig, value: any) => {
    const newConfig: DatabaseConfig = {
      type: config?.type || 'mysql',
      connection: config?.connection || {
        host: '',
        port: 3306,
        database: '',
        username: '',
        password: '',
      },
      query: config?.query || '',
      inputMappings: config?.inputMappings || {},
      ...config,
      [field]: value,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  const addInputMapping = () => {
    if (inputKey && inputValue) {
      handleChange('inputMappings', {
        ...config?.inputMappings,
        [inputKey]: inputValue,
      });
      setInputKey('');
      setValue('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Database Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={config?.type || 'mysql'}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="mysql">MySQL</option>
          <option value="mongodb">MongoDB</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Connection Details</label>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Host"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config?.connection?.host || ''}
            onChange={(e) => handleChange('connection', { ...config?.connection, host: e.target.value })}
          />
          <input
            type="number"
            placeholder="Port"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config?.connection?.port || ''}
            onChange={(e) => handleChange('connection', { ...config?.connection, port: parseInt(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Database"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config?.connection?.database || ''}
            onChange={(e) => handleChange('connection', { ...config?.connection, database: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config?.connection?.username || ''}
            onChange={(e) => handleChange('connection', { ...config?.connection, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config?.connection?.password || ''}
            onChange={(e) => handleChange('connection', { ...config?.connection, password: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Query</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={config?.query || ''}
          onChange={(e) => handleChange('query', e.target.value)}
          placeholder={config?.type === 'mysql' ? 'SELECT * FROM table WHERE id = :id' : 'db.collection.find({ field: :value })'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Input Mappings</label>
        <div className="space-y-2">
          {Object.entries(config?.inputMappings || {}).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
              <button
                onClick={() => {
                  const newMappings = { ...config?.inputMappings };
                  delete newMappings[key];
                  handleChange('inputMappings', newMappings);
                }}
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
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Input source"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={addInputMapping}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};