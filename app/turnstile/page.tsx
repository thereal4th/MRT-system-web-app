'use client'

import { useState, useRef, useEffect} from 'react'
import { Settings, Lock } from 'lucide-react'
import jsQR from 'jsqr' // qr decoding engine

export default function TurnstilePage(){
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastScanTime = useRef<number>(0);

    const [stationId, setStationId] = useState<string | null>(null);
    const [scanStatus, setScanStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [message, setMessage] = useState("Ready to Scan");

    //USEFFECT
    useEffect(() => {
        //if no station is selected, do nothing
        if(!stationId) return;

        let animationFrameId: number;
        let currentStream: MediaStream | null = null;

        const checkFrame = () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA){
                const video = videoRef.current;
                const canvas = canvasRef.current;

                if (canvas){
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    const ctx = canvas.getContext('2d', {willReadFrequently: true});

                    if(ctx){
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                        const code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: "dontInvert"})

                        if(code && code.data){
                            const now = Date.now();
                            if(now - lastScanTime.current > 2500){
                                lastScanTime.current = now;
                                console.log("QR DETECTED: ", code.data);

                                setScanStatus('SUCCESS');
                                //setMessage(`QR: ${code.data.substring(0, 1000)}`); //debug line to view URL
                                setMessage('Please Proceed')

                                setTimeout(() => {
                                    setScanStatus('IDLE');
                                    setMessage('Ready to Scan')
                                }, 2000);

                            }
                        }
                    }
                }
            }
            animationFrameId = requestAnimationFrame(checkFrame);
        };

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {facingMode:'user'}
                });

                currentStream = stream;

                if(videoRef.current){
                    videoRef.current.srcObject = stream;
                    videoRef.current.setAttribute("playsinline", "true");
                    await videoRef.current.play();
                    requestAnimationFrame(checkFrame);
                }
            }
            catch(err){
                console.log("Camera initialization error: ", err);
                setMessage("ERROR");
            }
        };
        
        //start camera only when video element exists
        //small timeout to wait for the DOM to get ready after re-render
        const timer = setTimeout(()=>{
            startCamera();
        }, 100);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(animationFrameId);
            if(currentStream){
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    },  [stationId]);

    //configure station
    if(!stationId) {
        return(
            <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4">
                <Settings className="h-12 w-12 text-slate-700 mb-4" />
                <h1 className="text-xl font-bold mb-4">Configure Turnstile</h1>
                <p className="text-slate-600 mb-8 text-center max-w-xs">
                    Select the physical location of this device.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {['north-ave', 'quezon-ave', 'kamuning', 'cubao'].map((id) => (
                        <button 
                            key={id}
                            onClick={() => setStationId(id)}
                            className="p-4 bg-slate-800 text-white rounded-lg border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all uppercase text-sm font-bold"
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    //scanner screen
    return (
        // 1. OUTER CONTAINER: Flex Column, exactly screen height
        <div className="h-dvh w-full bg-black flex flex-col overflow-hidden">
            
            <canvas ref={canvasRef} className="hidden" />

            {/*THE SCANNER AREA*/}
            <div className="flex-1 relative overflow-hidden min-h-0">
                
                {/* A. Success Message (Overlay) */}
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300`}>
                    <h1 className={`text-6xl font-black uppercase tracking-tighter ${scanStatus === 'SUCCESS' ? 'text-emerald-500' : scanStatus === 'ERROR'? 'text-red-500':'text-blue-500'}`}>
                        {scanStatus}
                    </h1>
                    <p className="text-white text-2xl mt-4 font-mono">{message}</p>
                </div>

                {/* B. The Video (Fills the flex-1 container) */}
                <video 
                    ref={videoRef} 
                    className="absolute inset-0 w-full h-full object-cover z-0" 
                    muted 
                    playsInline
                />

                {/* C. The Frame (Centered in the flex-1 container) */}
                {/* Note: We use the shadow trick here to ensure perfect centering */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-80 h-80 rounded-3xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl" />
                    </div>
                </div>
            </div>

            {/*FOOTER*/}
            <div className="h-12 bg-slate-900 flex justify-between items-center px-6 shrink-0 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-500">SYSTEM ONLINE</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                    <Lock className="h-3 w-3 text-white" />
                    <span className="text-xs font-mono text-white uppercase">{stationId}</span>
                </div>
            </div>

        </div>
    )
}