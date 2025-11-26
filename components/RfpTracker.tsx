import React from 'react';
import { MOCK_RFPS, ANALYTICS_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Download, ArrowUpRight } from 'lucide-react';

const RfpTracker: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Value Identified', value: '$4.2M', change: '+12%', color: 'text-blue-600' },
          { label: 'Win Probability (Avg)', value: '68%', change: '+5%', color: 'text-green-600' },
          { label: 'Active Opportunities', value: '12', change: '-2', color: 'text-purple-600' },
          { label: 'Proposals Submitted', value: '4', change: '+1', color: 'text-orange-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-medium ${stat.color} bg-opacity-10 px-2 py-0.5 rounded-full bg-current`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Government Opportunities (SAM.gov Feed)</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                <Filter size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                <Download size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_RFPS.map((rfp) => (
                  <tr key={rfp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                        {rfp.agency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{rfp.title}</div>
                      <div className="text-xs text-gray-500">{rfp.solicitationNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(rfp.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${rfp.matchScore > 90 ? 'bg-green-500' : rfp.matchScore > 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            style={{ width: `${rfp.matchScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{rfp.matchScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${rfp.status === 'Open' ? 'bg-green-100 text-green-800' : 
                          rfp.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : 
                          rfp.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {rfp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center gap-1 mx-auto">
              View All Opportunities <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Chart Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Pipeline Value</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={ANALYTICS_DATA}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} tickFormatter={(val) => `$${val/1000}k`} />
                 <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                 <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Your pipeline has grown by <span className="text-green-600 font-semibold">15%</span> compared to last quarter.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RfpTracker;
