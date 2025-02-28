import React from "react";
import LabelGenerator from "./LabelGenerator";
import { Printer, Tag, Box } from "lucide-react";

const Home: React.FC = () => {
  const handlePrint = () => {
    // Create a new window with only the label content
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Get the current label from the DOM
    const labelElement = document.querySelector(".label-preview-card");
    if (!labelElement) return;

    // Set up the print window
    printWindow.document.write(`
      <html>
        <head>
          <title>Etiqueta JQ Shop</title>
          <style>
            body { margin: 0; padding: 0; }
            .print-container { 
              width: 10cm; 
              height: 15cm; 
              margin: 0 auto; 
              padding: 0; 
              box-sizing: border-box;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${labelElement.outerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);

    console.log("Imprimindo apenas a etiqueta...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Tag className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              JQ Shop - Gerador de Etiquetas
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Criador de Etiquetas 10x15
            </span>
            <Box className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Criador de Etiquetas para Caixas de Envio
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Crie etiquetas verticais de 10x15 para suas caixas de envio
            </p>
          </div>

          {/* Label Generator Component */}
          <LabelGenerator onPrint={handlePrint} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-500">
                Etiquetas impressas no formato vertical 10x15cm
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              &copy; {new Date().getFullYear()} JQ Shop
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
