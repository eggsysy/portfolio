from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from src.engine import SearchEngine
from src.cache import ResultCache
import os

app = FastAPI(title="Semantic Search API", description="Semantic Search on 20 Newsgroups dataset")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SearchEngine and Cache
engine = SearchEngine()
cache = ResultCache()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Semantic Search API. Go to /docs for API documentation."}

@app.get("/search")
def search(query: str = Query(..., description="The search query"), 
           top_k: int = Query(5, description="Number of results to return")):
    try:
        # Check cache first
        cached_res = cache.get(query, top_k)
        if cached_res:
            return {"query": query, "results": cached_res, "cached": True}

        # Perform search
        results = engine.search(query, top_k=top_k)
        
        # Save to cache
        cache.set(query, top_k, results)
        
        return {"query": query, "results": results, "cached": False}
    except Exception as e:
        return {"error": str(e)}

@app.get("/status")
def status():
    collection_count = engine.collection.count()
    return {
        "status": "online",
        "documents_indexed": collection_count,
        "model": "all-MiniLM-L6-v2"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
