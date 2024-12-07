import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Workflow  as Flow, Calendar, User } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';
import { format } from 'date-fns';
import { Button } from '../components/Button';

export const Dashboard: React.FC = () => {
  const flows = useFlowStore((state) => state.flows);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Your LangGraphs</h1>
        <Link to="/flow/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Flow
          </Button>
        </Link>
      </div>

      {flows.length === 0 ? (
        <div className="text-center py-12">
          <Flow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flows yet</h3>
          <p className="text-gray-500 mb-4">Create your first LangGraph flow to get started</p>
          <Link to="/flow/new">
            <Button variant="primary" className="flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Create New Flow
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <Link
              key={flow.id}
              to={`/flow/${flow.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Flow className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{flow.name}</h3>
                      <p className="text-sm text-gray-500">
                        {flow.nodes.length} nodes • {flow.edges.length} connections
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(flow.updatedAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{flow.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};