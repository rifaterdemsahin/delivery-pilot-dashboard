import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import RepoGrid from './components/RepoGrid';
import InterestBasketDrawer from './components/InterestBasketDrawer';
import WorkshopConditionsModal from './components/WorkshopConditionsModal';
import AzureKeyVaultModal from './components/AzureKeyVaultModal';
import SkoolBookingModal from './components/SkoolBookingModal';
import CloudflareDeployModal from './components/CloudflareDeployModal';
import ConditionsMatrixView from './components/ConditionsMatrixView';
import ArchitectureView from './components/ArchitectureView';
import enrichedRepos from './data/reposData.json';
import { 
  FolderGit2, 
  KeyRound, 
  Cloud, 
  GraduationCap, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Zap,
  Sparkles
} from 'lucide-react';

const BASKET_STORAGE_KEY = 'delivery_pilot_selected_repos';

export default function App() {
  const [selectedRepos, setSelectedRepos] = useState(() => {
    try {
      const stored = localStorage.getItem(BASKET_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('repos'); // 'repos' | 'matrix' | 'architecture'
  const [visibilityFilter, setVisibilityFilter] = useState('all'); // 'all' | 'PUBLIC' | 'PRIVATE'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [conditionsModalRepo, setConditionsModalRepo] = useState(null);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [isCloudflareModalOpen, setIsCloudflareModalOpen] = useState(false);
  const [isSkoolModalOpen, setIsSkoolModalOpen] = useState(false);
  const [skoolTargetRepo, setSkoolTargetRepo] = useState(null);

  // Sync selected repos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(selectedRepos));
    } catch (e) {
      console.warn('Failed to persist selected repos:', e);
    }
  }, [selectedRepos]);

  const handleToggleSelect = (repo) => {
    setSelectedRepos((prev) => {
      const exists = prev.some((r) => r.name === repo.name);
      if (exists) {
        return prev.filter((r) => r.name !== repo.name);
      } else {
        return [...prev, repo];
      }
    });
  };

  const handleRemoveFromBasket = (repo) => {
    setSelectedRepos((prev) => prev.filter((r) => r.name !== repo.name));
  };

  const handleClearBasket = () => {
    setSelectedRepos([]);
  };

  const handleOpenSkoolWithRepo = (repo = null) => {
    setSkoolTargetRepo(repo);
    setIsSkoolModalOpen(true);
  };

  const handleQuickStatFilter = (visibility, category) => {
    setVisibilityFilter(visibility);
    setCategoryFilter(category);
    setActiveTab('repos');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Header
        selectedCount={selectedRepos.length}
        onOpenBasket={() => setIsBasketOpen(true)}
        onOpenVault={() => setIsVaultModalOpen(true)}
        onOpenCloudflare={() => setIsCloudflareModalOpen(true)}
        onOpenSkool={() => handleOpenSkoolWithRepo(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric / Hero Banner */}
        <StatsBanner
          repos={enrichedRepos}
          onSelectFilter={handleQuickStatFilter}
          activeVisibility={visibilityFilter}
          activeCategory={categoryFilter}
        />

        {/* Tab 1: Repositories & Workshop Catalog */}
        {activeTab === 'repos' && (
          <RepoGrid
            repos={enrichedRepos}
            selectedRepos={selectedRepos}
            onToggleSelect={handleToggleSelect}
            onViewConditions={(repo) => setConditionsModalRepo(repo)}
            visibilityFilter={visibilityFilter}
            setVisibilityFilter={setVisibilityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        {/* Tab 2: Workshop Pre & Post Conditions Matrix */}
        {activeTab === 'matrix' && (
          <ConditionsMatrixView
            onOpenSkool={() => handleOpenSkoolWithRepo(null)}
          />
        )}

        {/* Tab 3: Cloudflare & Azure Key Vault Architecture */}
        {activeTab === 'architecture' && (
          <ArchitectureView
            onOpenVault={() => setIsVaultModalOpen(true)}
            onOpenCloudflare={() => setIsCloudflareModalOpen(true)}
            onOpenSkool={() => handleOpenSkoolWithRepo(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">Delivery Pilot Dashboard</p>
              <p className="text-slate-500 text-[11px]">
                Built for Rifat Erdem Sahin&apos;s GitHub repository ecosystem & workshop delivery
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/rifaterdemsahin?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition"
            >
              <span>GitHub Repositories</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsVaultModalOpen(true)}
              className="hover:text-amber-400 flex items-center gap-1 transition"
            >
              <span>Azure Key Vault</span>
            </button>
            <button
              onClick={() => setIsCloudflareModalOpen(true)}
              className="hover:text-orange-400 flex items-center gap-1 transition"
            >
              <span>Cloudflare Pages</span>
            </button>
            <button
              onClick={() => handleOpenSkoolWithRepo(null)}
              className="hover:text-yellow-400 flex items-center gap-1 transition"
            >
              <span>Skool Booking</span>
            </button>
          </div>

          <div className="text-right text-[11px] text-slate-500">
            <span>Edge Deployed with Cloudflare • Secured via Azure Key Vault</span>
          </div>
        </div>
      </footer>

      {/* Slide-over Drawer: Interest Basket */}
      <InterestBasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        selectedRepos={selectedRepos}
        onRemoveRepo={handleRemoveFromBasket}
        onClearAll={handleClearBasket}
        onOpenSkool={() => handleOpenSkoolWithRepo(null)}
      />

      {/* Modal: Single Repo Pre/Post Conditions */}
      <WorkshopConditionsModal
        repo={conditionsModalRepo}
        onClose={() => setConditionsModalRepo(null)}
        onToggleSelect={handleToggleSelect}
        isSelected={conditionsModalRepo ? selectedRepos.some(r => r.name === conditionsModalRepo.name) : false}
        onOpenSkool={handleOpenSkoolWithRepo}
      />

      {/* Modal: Azure Key Vault Manager */}
      <AzureKeyVaultModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />

      {/* Modal: Cloudflare Edge Deploy Specs */}
      <CloudflareDeployModal
        isOpen={isCloudflareModalOpen}
        onClose={() => setIsCloudflareModalOpen(false)}
      />

      {/* Modal: Skool Workshop Booking */}
      <SkoolBookingModal
        isOpen={isSkoolModalOpen}
        onClose={() => setIsSkoolModalOpen(false)}
        selectedRepos={selectedRepos}
        singleRepo={skoolTargetRepo}
      />
    </div>
  );
}
