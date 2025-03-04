import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Printer } from "lucide-react";
import { Button } from "../components/ui/button";
import JsBarcode from "jsbarcode";

interface LabelPreviewProps {
  productName?: string;
  quantity?: number;
  sku?: string;
  productImage?: string;
  onPrint?: () => void;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({
  productName = "Nome do Produto",
  quantity = 10,
  sku = "SKU12345",
  productImage = "",
  onPrint = () => console.log("Imprimir etiqueta"),
}) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current && sku) {
      try {
        JsBarcode(barcodeRef.current, sku, {
          format: "CODE128",
          width: 2,
          height: 60,
          displayValue: false,
          margin: 0,
        });
      } catch (error) {
        console.error("Erro ao gerar código de barras:", error);
      }
    }
  }, [sku]);

  return (
    <div className="flex flex-col items-center w-full max-w-[600px] bg-gray-50 p-6 rounded-lg h-full">
      {/* Label Preview Card - Simulating a 10x15 vertical label */}
      <Card
        className="w-full max-w-[400px] h-[600px] bg-white border-2 border-gray-300 shadow-md mb-4 label-preview-card"
        style={{ aspectRatio: "2/3" }}
      >
        <CardContent
          className="p-6 flex flex-col h-full"
          style={{ boxSizing: "border-box" }}
        >
          {/* Company Logo/Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-2xl font-bold">JQ SHOP</h1>
            <p className="text-sm">Etiqueta de Envio</p>
          </div>

          {/* Product Information */}
          <div className="flex-grow flex flex-col items-center justify-center space-y-6">
            <div className="w-full">
              <h2 className="text-xl font-bold mb-1 text-center">Produto:</h2>
              <div className="flex flex-col items-center justify-center gap-2">
                {productImage && (
                  <div className="h-24 w-24 rounded-md overflow-hidden border border-gray-300 mx-auto mb-2">
                    <img
                      src={productImage}
                      alt={productName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder";
                      }}
                    />
                  </div>
                )}
                <p className="text-3xl font-bold break-words w-full text-center">
                  {productName}
                </p>
              </div>
            </div>

            <div className="text-center w-full">
              <h2 className="text-xl font-bold mb-1">Quantidade:</h2>
              <p className="text-5xl font-bold">{quantity}</p>
            </div>

            <div className="text-center w-full">
              <h2 className="text-xl font-bold mb-1">SKU:</h2>
              <p className="text-2xl font-bold">{sku}</p>
            </div>

            {/* Barcode */}
            <div className="w-full flex flex-col items-center">
              <svg ref={barcodeRef} className="w-4/5"></svg>
              <p className="text-sm mt-1">{sku}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Button */}
      <Button onClick={onPrint} className="mt-4 w-full max-w-[400px]" size="lg">
        <Printer className="mr-2 h-5 w-5" />
        Imprimir Etiqueta
      </Button>

      <p className="text-sm text-gray-500 mt-2">
        Esta etiqueta será impressa no formato vertical 10x15cm
      </p>
    </div>
  );
};

export default LabelPreview;
