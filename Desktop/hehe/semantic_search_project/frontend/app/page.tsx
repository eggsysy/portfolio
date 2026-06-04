"use client";

import { useState, useEffect } from "react";
import { performSearch, getStatus, SearchResult, StatusResponse } from "@/lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    getStatus()
      .then(setStatus)
      .catch((err) => console.error("Error fetching status:", err));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await performSearch(query);
      setResults(data.results);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <header className="text-center flex flex-col gap-4">
        <div className="inline-block mx-auto px-4 py-1 bg-secondary/10 text-secondary-dark rounded-full text-sm font-bold tracking-wider uppercase border border-secondary/20">
          AI-Powered Insights
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Semantic <span className="text-primary italic">Search</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Explore the 20 Newsgroups dataset using deep learning. Find documents by meaning, not just keywords.
        </p>
      </header>

      {/* Search Section */}
      <section className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="crafty-input"
            placeholder="What are you looking for? (e.g., 'space travel' or 'pc hardware')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading} className="crafty-button whitespace-nowrap">
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </section>

      {/* Results Section */}
      <section className="flex flex-col gap-8">
        {!searched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
            {["Science & Tech", "Politics", "Hobbies"].map((cat) => (
              <div key={cat} className="crafty-card bg-accent/5 border-dashed flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark font-bold">?</div>
                <span className="font-semibold">{cat}</span>
              </div>
            ))}
          </div>
        )}

        {searched && results.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-accent/20">
            <p className="text-2xl font-bold opacity-30">No matching documents found</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {results.map((result, idx) => (
            <div key={result.id} className="crafty-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    Rank #{idx + 1}
                 </span>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                    {result.metadata.category}
                  </span>
                  <span className="text-xs text-foreground/40 font-medium">
                    Score: {(1 - result.distance).toFixed(4)}
                  </span>
                </div>
                
                <p className="text-lg leading-relaxed text-foreground/80 italic">
                  "{result.text.length > 300 ? result.text.substring(0, 300) + "..." : result.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Status */}
      <footer className="mt-auto pt-12 text-center border-t border-accent/20">
        {status && (
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-white rounded-2xl shadow-crafty border border-accent/10">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">Documents</span>
              <span className="text-lg font-bold text-secondary-dark">{status.documents_indexed.toLocaleString()}</span>
            </div>
            <div className="w-px h-8 bg-accent/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">Model</span>
              <span className="text-sm font-bold text-primary">{status.model}</span>
            </div>
            <div className="w-px h-8 bg-accent/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">Status</span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-secondary-dark">
                <span className="w-2 h-2 rounded-full bg-secondary-dark animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}
