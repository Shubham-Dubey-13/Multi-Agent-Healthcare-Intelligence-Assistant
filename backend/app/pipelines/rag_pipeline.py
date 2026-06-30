from app.agents.rag_agent import RAGAgent

SAMPLE_MEDICAL_TEXTS = [
    "Type 2 diabetes is an impairment in the way the body regulates and uses sugar (glucose) as a fuel.",
    "Hypertension (high blood pressure) is when the pressure in your blood vessels is too high (140/90 mmHg or higher).",
    "Asthma is a condition in which your airways narrow and swell and may produce extra mucus.",
    "Migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head."
]

class MedicalRAGPipeline:
    def __init__(self):
        self.agent = RAGAgent()
        
    def init_vector_store(self):
        # Pre-populate some knowledge
        metadatas = [{"category": "disease_info"} for _ in SAMPLE_MEDICAL_TEXTS]
        self.agent.embed_documents(SAMPLE_MEDICAL_TEXTS, metadatas)
        
    def query(self, question: str, top_k: int = 5) -> dict:
        return self.agent.query(question, top_k)
