import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { BranchConfig } from '../../types/flow';

interface BranchSettingsProps {
  nodeId: string;
  config?: BranchConfig;
}

export const BranchSettings: React.FC<BranchSettingsProps> = ({ nodeId, config }) => {
  const updateNodeConfig = useFlowStore((state) => state.updateNodeConfig);
  const [condition, setCondition] = React.useState('');
  const [target, setTarget] = React.useState('');

  const handleChange = (conditions: BranchConfig['conditions']) => {
    const newConfig: BranchConfig = {
      conditions,
    };
    updateNodeConfig(nodeId, newConfig);
  };

  const addCondition = () => {
    if (condition && target) {
      handleChange([
        ...(config?.conditions || []),
        { condition, target },
      ]);
      setCondition('');
      setTarget('');
    }
  };

  const removeCondition = (index: number) => {
    const newConditions = [...(config?.conditions || [])];
    newConditions.splice(index, 1);
    handleChange(newConditions);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Conditions</label>
        <div className="space-y-2">
          {config?.conditions?.map((cond, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-medium">If:</span>
              <span>{cond.condition}</span>
              <span className="font-medium">Then:</span>
              <span>{cond.target}</span>
              <button
                onClick={() => removeCondition(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="Condition"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Target node"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <button
            onClick={addCondition}
            className="w-full px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Condition
          </button>
        </div>
      </div>
    </div>
  );
};