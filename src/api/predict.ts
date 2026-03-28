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

export async function predictSolarCondition(file: File): Promise<PredictionResponse> {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://paritosh143-solar-backend-1.hf.space";
  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to get prediction from server: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
