from typing import Dict, Any, List
from datetime import datetime

class SummaryGeneratorAgent:
    """Generates health summaries and PDF reports."""
    
    def generate_health_summary(self, user_data: Dict[str, Any], history: List[Dict[str, Any]], metrics: List[Dict[str, Any]]) -> Dict[str, Any]:
        
        # Simple mock summary generator
        trends = "Stable"
        if metrics:
            trends = "Monitoring required based on recent metrics."
            
        return {
            "summary": f"Health summary for {user_data.get('full_name', 'Patient')}. Overall status is {trends.lower()}",
            "trends": trends,
            "recommendations": ["Maintain a balanced diet.", "Exercise regularly."],
            "generated_at": datetime.utcnow().isoformat()
        }

    def generate_pdf_report(self, summary_data: Dict[str, Any]) -> str:
        # Mock PDF generation, just returns a path
        return "/tmp/mock_report.pdf"
