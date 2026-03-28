export interface PredictionResponse {
  condition: "Clean" | "Dusty" | "Dust" | "Snow";
  condition_confidence: number;
  p_clean: number;
  p_dust: number;
  p_snow: number;
  dust_level: "Low" | "Medium" | "Heavy" | "None";
  snow_level: "Low" | "Medium" | "Heavy" | "None";
  annotated_image?: string;
}

async function ensureStandardFormat(file: File): Promise<File> {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.type)) {
    return file;
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      
      // Fill white background in case of transparency going to JPEG
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Image conversion failed"));
        
        // Change extension to .jpg
        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        const convertedFile = new File([blob], newFileName, { type: "image/jpeg" });
        resolve(convertedFile);
      }, "image/jpeg", 0.95);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to read image for conversion"));
    };
    
    img.src = url;
  });
}

export async function predictSolarCondition(file: File): Promise<PredictionResponse> {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://paritosh143-solar-backend-1.hf.space";
  
  const standardFile = await ensureStandardFormat(file);
  const formData = new FormData();
  formData.append("file", standardFile);

  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to get prediction from server: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
