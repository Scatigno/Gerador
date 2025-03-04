import React, { useState } from "react";
import LabelForm from "./LabelForm";
import LabelPreview from "./LabelPreview";
import BarcodeScanner from "./BarcodeScanner";
import { Card } from "./ui/card";

// Define the LabelFormData interface here instead of importing it
interface LabelFormData {
  productName: string;
  quantity: string;
  sku: string;
  productImage?: string;
}

interface LabelGeneratorProps {
  onPrint?: () => void;
}

const LabelGenerator: React.FC<LabelGeneratorProps> = ({
  onPrint = () => console.log("Imprimindo etiqueta..."),
}) => {
  const [formData, setFormData] = useState<LabelFormData>({
    productName: "",
    quantity: "",
    sku: "",
    productImage: "",
  });
  const [showScanner, setShowScanner] = useState(false);

  const handleFormChange = (data: LabelFormData) => {
    setFormData(data);
    console.log("Etiqueta gerada com sucesso!", data);
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      quantity: "",
      sku: "",
      productImage: "",
    });
  };

  const handleBarcodeScanned = (barcodeData: string) => {
    // In a real implementation, this would look up the product info from a database
    setFormData({
      ...formData,
      sku: barcodeData,
      productName:
        formData.productName || `Produto ${barcodeData.substring(0, 5)}`,
    });
    setShowScanner(false);
  };

  const handleToggleScanner = () => {
    setShowScanner(!showScanner);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Gerador de Etiquetas
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <LabelForm
            onFormChange={handleFormChange}
            onPrint={onPrint}
            onReset={handleReset}
          />

          {showScanner && (
            <Card className="p-4 bg-white shadow-md rounded-lg">
              <BarcodeScanner
                onScan={handleBarcodeScanned}
                isActive={showScanner}
              />
            </Card>
          )}

          {!showScanner && (
            <div className="flex justify-center">
              <button
                onClick={handleToggleScanner}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Abrir Scanner de Código de Barras
              </button>
            </div>
          )}
        </div>

        <div>
          <LabelPreview
            productName={formData.productName || undefined}
            quantity={
              formData.quantity ? parseInt(formData.quantity) : undefined
            }
            sku={formData.sku || undefined}
            productImage={formData.productImage}
            onPrint={onPrint}
          />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Esta aplicação gera etiquetas verticais de 10x15 para caixas de envio.
        </p>
        <p>
          Escaneie um código de barras ou insira as informações do produto
          manualmente para criar sua etiqueta.
        </p>
      </div>
    </div>
  );
};

export default LabelGenerator;
