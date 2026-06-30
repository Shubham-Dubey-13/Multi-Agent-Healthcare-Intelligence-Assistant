from app.agents.ocr_agent import OCRAgent

class OCRPipeline:
    def __init__(self):
        self.ocr_agent = OCRAgent()
        
    def preprocess_image(self, image_bytes: bytes) -> str:
        # Mock preprocessing, would save bytes to temp file and return path
        return "/tmp/mock_image.jpg"
        
    def extract_text(self, image_bytes: bytes) -> str:
        path = self.preprocess_image(image_bytes)
        return self.ocr_agent.extract_text(path)
        
    def extract_structured_data(self, raw_text: str) -> dict:
        # Would use NER or LLM
        return {"raw_text": raw_text, "summary": "Extracted structure placeholder"}
