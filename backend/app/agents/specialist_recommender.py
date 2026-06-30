from typing import List, Dict, Any
from app.utils.medical_data import CONDITION_TO_SPECIALIST

class SpecialistRecommenderAgent:
    """Recommends relevant medical specialists."""

    def recommend(self, symptoms: List[str], possible_conditions: List[str]) -> List[Dict[str, str]]:
        recommendations = []
        seen = set()
        
        for condition in possible_conditions:
            # Map condition to specialist based on simple rules or dict
            specialist = CONDITION_TO_SPECIALIST.get(condition, "General Physician")
            if specialist not in seen:
                recommendations.append({
                    "specialist_type": specialist,
                    "reason": f"Recommended based on potential {condition}",
                    "urgency_level": "Medium"
                })
                seen.add(specialist)
                
        if not recommendations:
            recommendations.append({
                "specialist_type": "General Physician",
                "reason": "For general consultation and accurate diagnosis.",
                "urgency_level": "Low"
            })
            
        return recommendations
