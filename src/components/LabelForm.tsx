import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Barcode, Printer, RotateCcw } from "lucide-react";

interface LabelFormProps {
  onFormChange?: (formData: LabelFormData) => void;
  onPrint?: () => void;
  onReset?: () => void;
}

export interface LabelFormData {
  productName: string;
  quantity: string;
  sku: string;
}

const LabelForm: React.FC<LabelFormProps> = ({
  onFormChange = () => {},
  onPrint = () => {},
  onReset = () => {},
}) => {
  const [formData, setFormData] = useState<LabelFormData>({
    productName: "",
    quantity: "",
    sku: "",
  });
  const [showScanner, setShowScanner] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  // Gerar código de barras automaticamente quando o SKU é alterado
  useEffect(() => {
    if (formData.sku && onFormChange) {
      onFormChange(formData);
    }
  }, [formData.sku]);

  const handleReset = () => {
    setFormData({
      productName: "",
      quantity: "",
      sku: "",
    });
    onReset();
  };

  const handleBarcodeScanned = (barcodeData: string) => {
    // In a real implementation, this would look up the product info from a database
    // For now, we'll just use the barcode as the SKU and set a placeholder name
    const updatedFormData = {
      ...formData,
      sku: barcodeData,
      productName: `Produto ${barcodeData.substring(0, 5)}`,
    };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
    setShowScanner(false);
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Informações da Etiqueta
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowScanner(!showScanner)}
            className="relative"
          >
            <Barcode className="h-5 w-5" />
            {showScanner && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </Button>
        </div>

        {showScanner && (
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Scanner de Código de Barras Ativo
              </p>
              <div className="h-32 bg-gray-200 flex items-center justify-center mb-2">
                <Barcode className="h-10 w-10 text-gray-400" />
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  // Simulate a barcode scan
                  handleBarcodeScanned(
                    `SKU${Math.floor(Math.random() * 10000)}`,
                  );
                }}
              >
                Simular Leitura
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Digite o nome do produto"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Digite a quantidade"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="Digite o SKU"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            onClick={onPrint}
            className="flex-1"
            disabled={!formData.productName || !formData.sku}
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimir Etiqueta
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            disabled={!formData.productName || !formData.sku}
            onClick={() => onFormChange(formData)}
          >
            <Barcode className="mr-2 h-4 w-4" /> Gerar Etiqueta
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-none">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LabelForm;
