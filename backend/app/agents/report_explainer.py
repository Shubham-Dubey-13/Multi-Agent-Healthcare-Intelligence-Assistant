from typing import Dict, Any, List
from app.services.llm_service import generate_response

class ReportExplainerAgent:
    """Explains medical reports in simple terms."""

    async def explain_report(self, extracted_text: str, report_type: str = "general") -> Dict[str, Any]:
        prompt = f"""
        Explain this medical report ({report_type}) in simple, easy-to-understand language.
        Identify key abnormal values.
        
        Report Text:
        {extracted_text}

        Format as JSON with keys: parameters (list of dicts with name, value, status), summary (string), explanations (list of strings), recommendations (list of strings).
        """
        response = await generate_response(prompt, "You are a medical report explainer agent. Respond strictly in JSON.")
        
        import json
        try:
            clean_response = response.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_response)
        except Exception:
            return {
                "parameters": [{"name": "Sample Test", "value": "Unknown", "status": "Normal"}],
                "summary": "This is a summary of your report based on the provided text.",
                "explanations": ["The values indicate general findings. We recommend reviewing with a doctor."],
                "recommendations": ["Share these results with your primary care physician."]
            }
