from typing import Dict, Any, List
from app.services.llm_service import generate_response
from app.utils.medical_data import SYMPTOM_TO_CONDITION

class SymptomAnalyzerAgent:
    """Analyzes symptoms to suggest conditions and specialists."""
    
    async def analyze(self, symptoms: List[str], duration: str, severity: str, additional_info: str) -> Dict[str, Any]:
        symptoms_str = ", ".join(symptoms)
        prompt = f"""
        Analyze the following symptoms:
        Symptoms: {symptoms_str}
        Duration: {duration}
        Severity: {severity}
        Additional Info: {additional_info}

        Provide possible conditions, a risk level (Low, Medium, High), and recommended specialists.
        Ensure you include a medical disclaimer.
        Format as JSON with keys: possible_conditions (list), risk_level (string), recommended_specialists (list), explanation (string), disclaimer (string).
        """
        response = await generate_response(prompt, "You are a symptom analysis agent. Respond strictly in JSON.")
        
        # Fallback or simple mock parser
        import json
        try:
            # Handle potential markdown formatting from LLM
            clean_response = response.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_response)
        except Exception:
            # Fallback if parsing fails
            return {
                "possible_conditions": ["General Viral Infection", "Consult Doctor for accurate diagnosis"],
                "risk_level": "Medium",
                "recommended_specialists": ["General Physician"],
                "explanation": "Based on your symptoms, it is hard to pinpoint an exact condition without a physical examination.",
                "disclaimer": "This is not medical advice. Please consult a qualified healthcare professional."
            }
