from typing import Dict, Any

class RiskPredictorAgent:
    """Predicts health risks based on patient metrics using simple ML models or rules."""

    def predict_diabetes_risk(self, features: Dict[str, Any]) -> Dict[str, Any]:
        # Simple rule-based prediction as fallback for actual ML
        age = features.get("age", 30)
        bmi = features.get("bmi", 22.0)
        
        risk_score = 0
        if age > 45: risk_score += 2
        if bmi > 25: risk_score += 3
        if bmi > 30: risk_score += 2
        
        probability = min(risk_score / 10.0, 0.99)
        level = "High" if probability > 0.6 else "Medium" if probability > 0.3 else "Low"
        
        return {
            "disease": "Type 2 Diabetes",
            "probability": probability,
            "level": level,
            "factors": ["Age", "BMI"] if risk_score > 0 else []
        }
        
    def predict_cardiac_risk(self, features: Dict[str, Any]) -> Dict[str, Any]:
        age = features.get("age", 30)
        bp = features.get("blood_pressure", "120/80")
        
        sys_bp = int(bp.split("/")[0]) if "/" in bp else 120
        risk_score = 0
        if age > 50: risk_score += 3
        if sys_bp > 130: risk_score += 2
        if sys_bp > 140: risk_score += 3
        
        probability = min(risk_score / 10.0, 0.99)
        level = "High" if probability > 0.6 else "Medium" if probability > 0.3 else "Low"
        
        return {
            "disease": "Cardiac Event",
            "probability": probability,
            "level": level,
            "factors": ["Blood Pressure", "Age"] if risk_score > 0 else []
        }
