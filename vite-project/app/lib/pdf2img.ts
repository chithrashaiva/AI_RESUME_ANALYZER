export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log("Starting PDF conversion for file:", file.name);

        // Import pdfjs-dist
        const pdfjsLib = await import("pdfjs-dist");
        const { getDocument, GlobalWorkerOptions } = pdfjsLib;
        
        // Configure worker
        GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
        console.log("Worker configured:", GlobalWorkerOptions.workerSrc);

        // Read file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        console.log("File read as ArrayBuffer, size:", arrayBuffer.byteLength);

        // Load PDF
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        console.log("PDF loaded, pages:", pdf.numPages);

        // Get first page
        const page = await pdf.getPage(1);
        console.log("Page 1 retrieved");

        // Create canvas
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Could not get 2D context from canvas");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        // Render page to canvas
        console.log("Rendering page to canvas...");
        const renderTask = page.render({
            canvasContext: context,
            viewport: viewport,
        }).promise;

        await renderTask;
        console.log("Page rendered successfully");

        // Convert canvas to blob
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });
                        
                        const imageUrl = URL.createObjectURL(blob);
                        console.log("Image created successfully, size:", blob.size);
                        
                        resolve({
                            imageUrl,
                            file: imageFile,
                        });
                    } else {
                        console.error("Canvas.toBlob returned null");
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to convert canvas to image",
                        });
                    }
                },
                "image/png",
                0.95
            );
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("PDF conversion error:", errorMessage, err);
        return {
            imageUrl: "",
            file: null,
            error: `PDF Conversion Error: ${errorMessage}`,
        };
    }
}