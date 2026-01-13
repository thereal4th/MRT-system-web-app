'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Printer, Download, MapPin } from 'lucide-react'

//replace with DB data 
const stations = [
  { id: 'north', label: 'North Avenue' },
  { id: 'quezon', label: 'Quezon Avenue' },
  { id: 'kamuning', label: 'GMA Kamuning' },
  { id: 'cubao', label: 'Araneta Center-Cubao' },
  { id: 'santolan', label: 'Santolan-Annapolis' },
  { id: 'ortigas', label: 'Ortigas' },
  { id: 'shaw', label: 'Shaw Boulevard' },
  { id: 'boni', label: 'Boni' },
  { id: 'guadalupe', label: 'Guadalupe' },
  { id: 'buendia', label: 'Buendia' },
  { id: 'ayala', label: 'Ayala' },
  { id: 'magallanes', label: 'Magallanes' },
  { id: 'taft', label: 'Taft Avenue' },
]

export default function StationQRPage() {
  const [selectedStation, setSelectedStation] = useState("")

  // Helper to find label based on value
  const currentStationLabel = stations.find(s => s.id === selectedStation)?.label || "Unknown"

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-end gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Station QR Generator</h1>
          <p className="text-slate-500">Generate static codes for passengers to scan.</p>
        </div>

        <div className="w-full md:w-72">
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Station</label>
            <div className="relative">
                <select 
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="" disabled>Select Station...</option>
                    {stations.map((station) => (
                        <option key={station.id} value={station.id}>
                            {station.label}
                        </option>
                    ))}
                </select>
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
        </div>
      </div>

      {selectedStation ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" id="printable-area">
          
          <QRCard 
            type="ENTRY" 
            stationId={selectedStation} 
            stationName={currentStationLabel}
            color="green"
          />

          <QRCard 
            type="EXIT" 
            stationId={selectedStation} 
            stationName={currentStationLabel}
            color="red"
          />

        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border-2 border-dashed border-slate-300">
            <MapPin className="h-12 w-12 text-slate-300 mb-2" />
            <p className="text-slate-500">Please select a station to generate codes.</p>
        </div>
      )}

    </div>
  )
}

//Reusable Component for the Card
function QRCard({ type, stationId, stationName, color }: { type: string, stationId: string, stationName: string, color: 'green' | 'red' }) {
    
    // The actual data the User's phone will read
    const qrData = JSON.stringify({
        station: stationId,
        type: type, // 'ENTRY' or 'EXIT'
        timestamp: new Date().toISOString() // Optional security feature
    });

    const borderColor = color === 'green' ? 'border-green-500' : 'border-red-500';
    const textColor = color === 'green' ? 'text-green-600' : 'text-red-600';
    const bgColor = color === 'green' ? 'bg-green-50' : 'bg-red-50';

    return (
        <div className={`bg-white p-8 rounded-2xl shadow-sm border-t-8 ${borderColor} flex flex-col items-center text-center`}>
            
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-900">{stationName}</h2>
                <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold tracking-wider ${bgColor} ${textColor}`}>
                    {type} POINT
                </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner mb-6">
                <QRCode 
                    value={qrData} 
                    size={200}
                    level="H" // High error correction
                    fgColor={color === 'green' ? '#15803d' : '#b91c1c'} // Dark Green or Dark Red
                />
            </div>


            <p className="text-slate-500 text-sm max-w-xs mx-auto">
                Scan this code with the MRT-3 App to {type === 'ENTRY' ? 'start' : 'end'} your journey.
            </p>

            <div className="mt-8 flex gap-3 w-full print:hidden">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                    <Download className="h-4 w-4" /> Save
                </button>
            </div>
        </div>
    )
}