from typing import Dict, Any
from app.agents.risk_predictor import RiskPredictorAgent

class HealthRiskPredictor:
    def __init__(self):
        self.agent = RiskPredictorAgent()
        
    def predict(self, features: Dict[str, Any]) -> dict:
        results = {}
        results["diabetes"] = self.agent.predict_diabetes_risk(features)
        results["cardiac"] = self.agent.predict_cardiac_risk(features)
        return results
