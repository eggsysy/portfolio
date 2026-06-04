import pandas as pd
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.utils import embedding_functions
import os

class SearchEngine:
    def __init__(self, model_name="all-MiniLM-L6-v2", db_path="data/chroma_db"):
        self.model = SentenceTransformer(model_name)
        self.client = chromadb.PersistentClient(path=db_path)
        
        # Use SentenceTransformer for ChromaDB embedding function
        self.emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name=model_name)
        
        self.collection = self.client.get_or_create_collection(
            name="news_collection",
            embedding_function=self.emb_fn
        )

    def index_documents(self, parquet_path):
        if self.collection.count() > 0:
            print("Collection already indexed. Skipping.")
            return

        print(f"Loading data from {parquet_path}...")
        df = pd.read_parquet(parquet_path)
        
        # To avoid overloading memory, we can index in batches
        batch_size = 500
        for i in range(0, len(df), batch_size):
            batch = df.iloc[i : i + batch_size]
            
            self.collection.add(
                documents=batch["text"].tolist(),
                metadatas=[{"category": c} for c in batch["category"].tolist()],
                ids=[str(idx) for idx in range(i, i + len(batch))]
            )
            print(f"Indexed {i + len(batch)} / {len(df)} documents")

    def search(self, query, top_k=5):
        results = self.collection.query(
            query_texts=[query],
            n_results=top_k
        )
        
        formatted_results = []
        for i in range(len(results["ids"][0])):
            formatted_results.append({
                "id": results["ids"][0][i],
                "text": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
                "distance": results["distances"][0][i]
            })
        return formatted_results

if __name__ == "__main__":
    # For quick testing
    engine = SearchEngine()
    if os.path.exists("data/cleaned_corpus.parquet"):
        engine.index_documents("data/cleaned_corpus.parquet")
        res = engine.search("space exploration and nasa", top_k=3)
        for r in res:
            print(f"\nResult (Score: {r['distance']:.4f}):")
            print(f"Category: {r['metadata']['category']}")
            print(f"Text snippet: {r['text'][:200]}...")
