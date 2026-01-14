'use client'

import {useState, useEffect} from 'react'
import { QrReader } from 'react-qr-reader'
//import {handleScanAction} from '@/app/actions/scan' 
import {Settings, Lock} from 'lucide-react'

export default function TurnstilePage(){
    const [stationId, setStationId] = useState<string | null>(null);
    const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS' | 'FAILED'>('IDLE');
    const [message, setMessage] = useState("Ready");

    //if no stationid property
    if(!stationId) {
        return(
            <div className="min-h-screen bg-slate-50 text-white flex flex-col items-center justify-center p-4">
                <Settings className="h-12 w-12 text-slate-700 mb-4" />
                <h1 className="text-xl font-bold mb-4">Configure Turnstile</h1>
                <p className="text-slate-600 mb-8 text-center max-w-xs">
                Select the physical location of this device. This setting will persist until refresh.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {['north-ave', 'quezon-ave', 'kamuning', 'cubao'].map((id) => (
                        <button 
                            key={id}
                            onClick={() => setStationId(id)}
                            className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all uppercase text-sm font-bold"
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    //else display scanner
    return(
        <div className = "min-hscreen bg-black flex flex-col relative overflow-hidden">
            <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${scanStatus==='IDLE'?'opacity-0':'opacity-100 bg-black/80'}`}>
                <h1 className={`text-6xl font-black uppercase tracking-tighter ${scanStatus === 'SUCCESS'? 'text-emerald-500':'text-red-500'}`}>{scanStatus}</h1>
                <p className="text-white text-2xl mt-4 font-mono">{message}</p>
            </div>

            <div className="flex-1 relative">
                <QrReader
                    onResult={(result, error)=>{
                        if(!!result){
                            //call server action here
                            // handleScan(result?.text)
                            console.log(result.getText())

                            //mock feedback for now
                            setScanStatus('SUCCESS')
                            setMessage("FARE: P20.00")
                            setTimeout(()=>setScanStatus('IDLE'), 2000) //cooldown for the error message
                        }
                    }}
                    constraints={{facingMode: 'user'}}
                    className="w-full h-fll object-cover"
                    videoStyle={{objectFit: 'cover'}} //force full screen
                    />
                {/*Target Box*/}
                <div className="absolute inset-0 border-50 border-black/50 flex items-center justify-center" >
                    <div className="w-64 h-64 border-4 border-white/30 rounded-3xl relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl"/>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl"/>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl"/>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl"/>
                    </div>
                </div>
                
                {/*Persisten Status Footer*/}
                <div className="h-12 bg-slate-900 flex justify-between items-center px-6 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                        <span className="text-xs font-mono text-emerald-500">SYSTEM ONLINE</span>
                    </div>
                    <div>
                        <Lock className="h-3 w-3 text-white"/>
                        <span className="text-xs font-mono text-white uppercase">{stationId}</span>
                    </div>
                </div>
            </div> 
        </div>


    )
}
