import chromadb
from typing import List, Dict, Any

class RAGAgent:
    """Retrieval-Augmented Generation agent for medical knowledge."""
    
    def __init__(self):
        self.persist_directory = "./chroma_db"
        try:
            self.client = chromadb.PersistentClient(path=self.persist_directory)
            self.collection = self.client.get_or_create_collection(name="medical_knowledge")
        except Exception:
            self.client = None
            self.collection = None

    def embed_documents(self, texts: List[str], metadatas: List[Dict[str, str]]):
        if not self.collection:
            return
        ids = [f"doc_{i}" for i in range(len(texts))]
        self.collection.add(documents=texts, metadatas=metadatas, ids=ids)

    def query(self, question: str, top_k: int = 5) -> Dict[str, Any]:
        if not self.collection:
            return {"answer": "I'm sorry, my medical knowledge base is currently unavailable.", "sources": [], "confidence": 0.0}
            
        try:
            results = self.collection.query(query_texts=[question], n_results=top_k)
            docs = results['documents'][0] if results['documents'] else []
            
            # Simple mock response generation based on retrieved context
            context = "\n".join(docs)
            if context:
                answer = f"Based on medical literature: {context[:200]}..."
            else:
                answer = "I couldn't find specific medical literature answering this question."
                
            return {
                "answer": answer,
                "sources": results.get('metadatas', [[]])[0],
                "confidence": 0.85
            }
        except Exception as e:
            print(f"RAG Error: {e}")
            return {"answer": "Error querying medical knowledge.", "sources": [], "confidence": 0.0}
