import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Workflow  as Flow, Home } from 'lucide-react';
import { clsx } from 'clsx';

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          >
            <Flow className="w-6 h-6 text-blue-600" />
            <span>LangGraph Builder</span>
          </Link>
          
          <div className="ml-8 flex gap-4">
            <Link
              to="/"
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
                location.pathname === '/'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};