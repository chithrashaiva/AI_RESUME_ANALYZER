import { useState } from 'react';
import FileUploader from "~/components/FileUploader";
import { convertPdfToImage } from "~/lib/pdf2img";

export default function Test() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        console.log(msg);
        setLogs(prev => [...prev, msg]);
    };

    const handleFileSelect = async (selectedFile: File | null) => {
        setFile(selectedFile);
        setImageUrl("");
        setError("");
        setLogs([]);

        if (!selectedFile) return;

        setLoading(true);
        addLog(`File selected: ${selectedFile.name}`);
        
        try {
            addLog("Starting PDF conversion...");
            const result = await convertPdfToImage(selectedFile);
            
            if (result.error) {
                addLog(`Conversion failed: ${result.error}`);
                setError(result.error);
            } else if (result.imageUrl) {
                addLog("PDF converted successfully!");
                setImageUrl(result.imageUrl);
                addLog(`Image URL: ${result.imageUrl.substring(0, 50)}...`);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            addLog(`Error: ${errorMsg}`);
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-white min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">PDF to Image Converter Test</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
                    <FileUploader onFileSelect={handleFileSelect} />
                </div>

                {loading && (
                    <div className="text-center mb-4">
                        <p className="text-lg text-blue-600">Converting PDF...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
                        <p className="font-bold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {imageUrl && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Converted Image</h2>
                        <div className="border border-gray-300 p-4 rounded">
                            <img src={imageUrl} alt="Converted PDF" className="max-w-full h-auto" />
                        </div>
                    </div>
                )}

                <div className="bg-gray-100 p-4 rounded">
                    <h3 className="font-semibold mb-2">Debug Logs:</h3>
                    <div className="space-y-1 font-mono text-sm max-h-64 overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No logs yet...</p>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="text-gray-700">
                                    {log}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
