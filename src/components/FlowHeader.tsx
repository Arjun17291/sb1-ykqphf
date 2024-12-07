import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from './Button';
import { useFlowStore } from '../store/flowStore';

interface FlowHeaderProps {
  onSave: () => void;
}

export const FlowHeader: React.FC<FlowHeaderProps> = ({ onSave }) => {
  const { currentFlow, updateFlowName } = useFlowStore();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="h-6 w-px bg-gray-200" />
          <input
            type="text"
            value={currentFlow?.name || ''}
            onChange={(e) => updateFlowName(e.target.value)}
            placeholder="Untitled Flow"
            className="text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
          />
        </div>
        <Button
          variant="primary"
          onClick={onSave}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Flow
        </Button>
      </div>
    </div>
  );
};