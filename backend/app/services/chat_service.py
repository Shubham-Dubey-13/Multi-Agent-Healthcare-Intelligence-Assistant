from typing import Dict, Any, List
from app.services.llm_service import llm_service
import json

class ChatService:
    def __init__(self):
        # We would inject agents here
        pass
        
    async def process_message(self, message: str, user_id: str, context_type: str = "general") -> Dict[str, Any]:
        """
        Process an incoming chat message, classify intent, and route to the correct agent.
        """
        # 1. Intent Classification
        intent = await self._classify_intent(message)
        
        # 2. Route to appropriate agent (mocked for now until agents are fully built)
        if intent == "symptom_analysis":
            agent_used = "SymptomAnalyzer"
            prompt = f"Analyze these symptoms: {message}"
            response = await llm_service.generate_response(prompt, "You are a medical symptom analyzer.")
            
        elif intent == "report_explanation":
            agent_used = "ReportExplainer"
            prompt = f"Explain this medical query regarding a report: {message}"
            response = await llm_service.generate_response(prompt, "You are a lab report explainer.")
            
        elif intent == "risk_prediction":
            agent_used = "RiskPredictor"
            prompt = f"Assess health risks based on: {message}"
            response = await llm_service.generate_response(prompt, "You are a health risk predictor.")
            
        elif intent == "medical_question":
            agent_used = "RAGAgent"
            prompt = f"Answer this medical question: {message}"
            response = await llm_service.generate_response(prompt, "You are a medical researcher answering questions.")
            
        else:
            agent_used = "GeneralAssistant"
            prompt = message
            response = await llm_service.generate_response(prompt, "You are a helpful healthcare AI assistant.")
            
        return {
            "response": response,
            "agent_used": agent_used,
            "intent": intent,
            "sources": []
        }
        
    async def _classify_intent(self, message: str) -> str:
        """Classifies the user intent to route to the correct agent."""
        msg_lower = message.lower()
        
        # Simple keyword-based routing for fallback
        if any(word in msg_lower for word in ["symptom", "pain", "ache", "fever", "cough", "hurt"]):
            return "symptom_analysis"
        elif any(word in msg_lower for word in ["report", "lab", "blood test", "mri", "xray", "result"]):
            return "report_explanation"
        elif any(word in msg_lower for word in ["risk", "chance of", "predict", "prevent"]):
            return "risk_prediction"
        elif any(word in msg_lower for word in ["what is", "how to", "why does", "treatment for", "side effect"]):
            return "medical_question"
            
        return "general"

chat_service = ChatService()
