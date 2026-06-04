import os
import joblib
from functools import lru_cache

CACHE_DIR = "data/cache"
os.makedirs(CACHE_DIR, exist_ok=True)

class ResultCache:
    def __init__(self, cache_file="search_cache.joblib"):
        self.cache_path = os.path.join(CACHE_DIR, cache_file)
        self.cache = self._load_cache()

    def _load_cache(self):
        if os.path.exists(self.cache_path):
            try:
                return joblib.load(self.cache_path)
            except:
                return {}
        return {}

    def get(self, query, top_k):
        key = (query.lower().strip(), top_k)
        return self.cache.get(key)

    def set(self, query, top_k, results):
        key = (query.lower().strip(), top_k)
        self.cache[key] = results
        # Limit cache size to 1000 entries
        if len(self.cache) > 1000:
            self.cache.pop(next(iter(self.cache)))
        joblib.dump(self.cache, self.cache_path)
