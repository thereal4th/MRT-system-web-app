'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  MapPin,
  Save,
  X ,
  FileUp
} from 'lucide-react'

// Define the shape of a Station
type Staff = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export default function StaffDatabasePage() {
  // 1. MOCK DATA (This would normally come from your DB)
  const [staff, setStaff] = useState<Staff[]>([
    { id: 1, name: "Name Lastname", status: "ACTIVE"},
    { id: 2, name: "Name Lastname", status: "INACTIVE"},
    { id: 3, name: "Name Lastname", status: "ACTIVE"},
  ]);

  // UI States
  const [isCreating, setIsCreating] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");

  // HANDLERS
  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to delete this station?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;

    const newStaff: Staff = {
      id: staff.length + 1,
      name: newStaffName,
      status: 'ACTIVE', // Default to closed for safety
    };

    setStaff([...staff, newStaff]);
    setNewStaffName("");
    setIsCreating(false);
  }

  // Helper for Status Badge Color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'INACTIVE': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Database</h1>
          <p className="text-slate-500">Manage staff accounts.</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Staff
          </button>

          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <FileUp className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* 2. CREATE FORM (Conditionally Rendered) */}
      {isCreating && (
        <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-4">
            <form onSubmit={handleCreate} className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-blue-900 mb-1">STAFF NAME</label>
                    <input 
                        autoFocus
                        type="text" 
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        placeholder="e.g. Taft Avenue"
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <Save className="h-4 w-4" /> Save
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setIsCreating(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50"
                    >
                        <X className="h-4 w-4" /> Cancel
                    </button>
                </div>
            </form>
        </div>
      )}

      {/* 3. DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {staff.map((station) => (
              <tr key={station.id} className="hover:bg-slate-50 transition-colors group">
                
                <td className="px-6 py-4 text-slate-500 font-mono text-sm">
                  {String(station.id).padStart(2, '0')}
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-slate-900">{station.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(station.status)}`}>
                    {station.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={() => handleDelete(station.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State (if needed) */}
        {staff.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                No staff found. Create one to get started.
            </div>
        )}
      </div>

    </div>
  )
}