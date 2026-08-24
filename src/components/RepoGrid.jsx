import React, { useState, useMemo } from 'react';
import RepoCard from './RepoCard';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Globe, 
  Lock, 
  Layers, 
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ITEMS_PER_PAGE = 24;

// Explicit remembered exclusion filters
const EXCLUDED_NAMES = new Set(['saa']);
const EXCLUDED_PATTERNS = [
  /12[\s-_]?step/i,
  /\bsaa\b/i
];

function isRepoBlocked(repo) {
  const name = (repo.name || '').toLowerCase().trim();
  const desc = (repo.description || '').toLowerCase().trim();
  if (EXCLUDED_NAMES.has(name)) return true;
  for (const p of EXCLUDED_PATTERNS) {
    if (p.test(name) || p.test(desc)) return true;
  }
  return false;
}

export default function RepoGrid({ 
  repos, 
  selectedRepos, 
  onToggleSelect, 
  onViewConditions,
  visibilityFilter,
  setVisibilityFilter,
  categoryFilter,
  setCategoryFilter
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Clean repos with guaranteed exclusion filter
  const cleanRepos = useMemo(() => {
    return repos.filter(r => !isRepoBlocked(r));
  }, [repos]);

  // Extract unique languages
  const availableLanguages = useMemo(() => {
    const set = new Set();
    cleanRepos.forEach(r => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort();
  }, [cleanRepos]);

  // Filtered and sorted repos
  const filteredRepos = useMemo(() => {
    return cleanRepos.filter(repo => {
      // Visibility Filter
      if (visibilityFilter === 'PUBLIC' && repo.isPrivate) return false;
      if (visibilityFilter === 'PRIVATE' && !repo.isPrivate) return false;

      // Category Filter
      if (categoryFilter !== 'all' && repo.category !== categoryFilter) return false;

      // Language Filter
      if (languageFilter !== 'all' && repo.language !== languageFilter) return false;

      // Search Query Filter
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = repo.name.toLowerCase().includes(q);
        const matchesDesc = (repo.description || '').toLowerCase().includes(q);
        const matchesLang = (repo.language || '').toLowerCase().includes(q);
        const matchesCat = repo.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesLang && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'stars') return (b.stargazerCount || 0) - (a.stargazerCount || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
      return 0; // default order
    });
  }, [cleanRepos, visibilityFilter, categoryFilter, languageFilter, searchTerm, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE) || 1;
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRepos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRepos, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setVisibilityFilter('all');
    setCategoryFilter('all');
    setLanguageFilter('all');
    setSortBy('default');
    setCurrentPage(1);
  };

  const selectedIds = useMemo(() => new Set(selectedRepos.map(r => r.name)), [selectedRepos]);

  return (
    <div>
      {/* Control Bar: Search & Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search 460+ repos, AI models, security labs..."
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
            {searchTerm && (
              <button 
                onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Visibility Filter Buttons */}
          <div className="md:col-span-3 flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => { setVisibilityFilter('all'); setCurrentPage(1); }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                visibilityFilter === 'all' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({cleanRepos.length})
            </button>
            <button
              onClick={() => { setVisibilityFilter('PUBLIC'); setCurrentPage(1); }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                visibilityFilter === 'PUBLIC' 
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700 shadow-sm' 
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Globe className="w-3 h-3" /> Public
            </button>
            <button
              onClick={() => { setVisibilityFilter('PRIVATE'); setCurrentPage(1); }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                visibilityFilter === 'PRIVATE' 
                  ? 'bg-amber-950/90 text-amber-300 border border-amber-700 shadow-sm' 
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <Lock className="w-3 h-3" /> Private
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-2">
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="all">All Domains & Categories</option>
              <option value="AI & LLM">AI & LLM</option>
              <option value="Cybersecurity & Adversarial">Cybersecurity & Adversarial</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="FullStack & Web Apps">FullStack & Web Apps</option>
              <option value="Automation & Tooling">Automation & Tooling</option>
              <option value="Engineering & Architecture">Engineering & Architecture</option>
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="md:col-span-2">
            <select
              value={languageFilter}
              onChange={(e) => { setLanguageFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="all">All Languages</option>
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-2 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="default">Sort: Default</option>
              <option value="stars">Stars</option>
              <option value="name">Name (A-Z)</option>
              <option value="updated">Recent</option>
            </select>
          </div>
        </div>

        {/* Filter stats and active summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredRepos.length}</strong> matching repositories</span>
            {(visibilityFilter !== 'all' || categoryFilter !== 'all' || languageFilter !== 'all' || searchTerm) && (
              <button
                onClick={resetFilters}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline ml-2"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">Page {currentPage} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories Cards Grid */}
      {paginatedRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedRepos.map(repo => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isSelected={selectedIds.has(repo.name)}
              onToggleSelect={onToggleSelect}
              onViewConditions={onViewConditions}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl glass-panel border border-slate-800">
          <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white">No repositories match your filter</h4>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search keywords, clearing language filters, or viewing both public and private repos.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
            Page {currentPage} of {totalPages} ({filteredRepos.length} items)
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
