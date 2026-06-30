class MedicalNERPipeline:
    def __init__(self):
        # Would load spacy model here
        # import spacy
        # self.nlp = spacy.load("en_core_web_sm")
        self.nlp = None

    def extract_entities(self, text: str) -> dict:
        # Mock NER
        return {
            "drugs": ["Paracetamol"],
            "dosages": ["500mg"],
            "conditions": ["Fever"],
            "lab_tests": []
        }
