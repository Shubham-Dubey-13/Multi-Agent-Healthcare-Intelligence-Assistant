from typing import Dict, Any, List
from app.services.llm_service import generate_response

class SupervisorAgent:
    """
    Supervisor Agent that classifies intents and routes requests to specialized agents.
    """
    def __init__(self):
        self.supported_intents = [
            "symptom_analysis",
            "report_explanation",
            "risk_prediction",
            "medical_question",
            "specialist_recommendation",
            "health_summary",
            "general_chat"
        ]

    async def classify_intent(self, message: str) -> str:
        prompt = f"""
        Classify the intent of the following user message into one of these categories:
        {', '.join(self.supported_intents)}

        Message: "{message}"

        Return ONLY the category name. If unsure, return "general_chat".
        """
        response = await generate_response(prompt, "You are an intent classification agent.")
        intent = response.strip().lower()
        if intent not in self.supported_intents:
            return "general_chat"
        return intent

    async def route_to_agent(self, intent: str, message: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Routes to the proper agent based on intent."""
        # For simplicity in this demo, the routing logic returns which agent it would call
        # Real implementation would instantiate the correct agent and call it.
        return {
            "intent": intent,
            "agent_used": intent.replace("_", " ").title() + " Agent",
            "message": message
        }
