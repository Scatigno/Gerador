import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Camera, X, ZapOff } from "lucide-react";

interface BarcodeScannerProps {
  onScan?: (barcodeData: string) => void;
  isActive?: boolean;
}

const BarcodeScanner = ({
  onScan = () => {},
  isActive = false,
}: BarcodeScannerProps) => {
  const [scanning, setScanning] = useState(isActive);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Mock function to simulate barcode detection
  const mockDetectBarcode = () => {
    // In a real implementation, this would analyze video frames
    // For demo purposes, we'll simulate finding a barcode after a delay
    const mockBarcodes = ["SKU123456789", "PROD987654321", "BOX555123789"];

    const randomBarcode =
      mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];

    setTimeout(() => {
      if (scanning) {
        onScan(randomBarcode);
        setScanning(false);
      }
    }, 2000);
  };

  const startScanner = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      setStream(mediaStream);
      setScanning(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // In a real implementation, we would start analyzing frames here
      mockDetectBarcode();
    } catch (err) {
      setError(
        "Não foi possível acessar a câmera. Verifique se as permissões foram concedidas.",
      );
      console.error("Erro ao acessar a câmera:", err);
    }
  };

  const stopScanner = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  useEffect(() => {
    // Start scanner if isActive prop changes to true
    if (isActive && !scanning) {
      startScanner();
    }

    // Cleanup function to stop scanner when component unmounts
    return () => {
      stopScanner();
    };
  }, [isActive]);

  return (
    <Card className="w-full max-w-md mx-auto p-4 bg-white shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
          {scanning ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full hidden"
              />
              <div className="absolute inset-0 border-2 border-dashed border-primary opacity-70 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/4 border-2 border-primary"></div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={stopScanner}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              {error ? (
                <div className="text-center p-4">
                  <ZapOff className="mx-auto h-10 w-10 text-destructive mb-2" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : (
                <>
                  <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    A visualização da câmera aparecerá aqui
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {!scanning && (
          <Button className="w-full" onClick={startScanner} disabled={!!error}>
            <Camera className="mr-2 h-4 w-4" />
            Escanear Código de Barras
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Posicione o código de barras dentro do quadro do scanner para capturar
          automaticamente as informações do produto
        </p>
      </div>
    </Card>
  );
};

export default BarcodeScanner;
