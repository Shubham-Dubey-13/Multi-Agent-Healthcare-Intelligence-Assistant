import google.generativeai as genai
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.is_mock = False
        
        if not self.api_key or self.api_key.startswith("your-gemini"):
            logger.warning("GEMINI_API_KEY not set or invalid. Using mock LLM service.")
            self.is_mock = True
        else:
            genai.configure(api_key=self.api_key)
            # Using standard recommended model
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            
    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        if self.is_mock:
            return self._mock_response(prompt, system_instruction)
            
        try:
            # Current python google-generativeai API allows passing system instructions in GenerationConfig or model initialization
            # For simplicity, we'll prepend it to the prompt if provided
            full_prompt = prompt
            if system_instruction:
                full_prompt = f"System Instruction: {system_instruction}\n\nUser Request: {prompt}"
                
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            logger.error(f"Error generating LLM response: {str(e)}")
            return f"I apologize, but I encountered an error processing your request: {str(e)}"
            
    def _mock_response(self, prompt: str, system_instruction: str) -> str:
        """Returns mock responses based on keywords in the prompt when API key is missing."""
        prompt_lower = prompt.lower()
        
        if "symptom" in prompt_lower or "headache" in prompt_lower:
            return "Based on your symptoms, this could be a tension headache or migraine. If it persists or is severe, please consult a Neurologist or General Physician. *Disclaimer: I am an AI, not a doctor. Please seek professional medical advice.*"
        
        elif "report" in prompt_lower or "blood" in prompt_lower:
            return "Looking at your mock report values: Your Hemoglobin is slightly low, which might indicate mild anemia. Your Cholesterol is within normal limits. *Disclaimer: Always discuss lab results with your doctor.*"
            
        elif "risk" in prompt_lower or "diabetes" in prompt_lower:
            return "Based on the factors provided (mock data), your risk for Type 2 Diabetes appears moderate due to BMI and family history. Regular exercise and diet modifications are recommended."
            
        else:
            return "I am operating in mock mode because no valid Gemini API key was provided in the .env file. Please add a valid key to unlock full AI capabilities."

llm_service = LLMService()
