import React, { useState } from 'react';
import { Filter, TrendingUp, AlertTriangle, Clock, DollarSign, MapPin, SortAsc } from 'lucide-react';
import AdCard from '../components/AdCard';
import { Advertisement, DashboardStats, FilterOptions, AIInsight } from '../types';

const DashboardPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Données simulées
  const stats: DashboardStats = {
    totalAds: 127,
    newToday: 23,
    averagePrice: 12450,
    priceDrops: 8,
    opportunities: 15
  };

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'price_opportunity',
      title: 'Prix sous le marché',
      description: 'Cette Renault Clio est 15% moins chère que la moyenne du marché',
      confidence: 0.85,
      advertisementId: '1',
      createdAt: new Date()
    },
    {
      id: '2',
      type: 'rare_find',
      title: 'Modèle rare détecté',
      description: 'Cette BMW Série 3 avec ces options est rare sur le marché',
      confidence: 0.92,
      advertisementId: '2',
      createdAt: new Date()
    },
    {
      id: '3',
      type: 'price_drop',
      title: 'Baisse de prix récente',
      description: 'Le vendeur a baissé le prix de 1 500€ il y a 2 jours',
      confidence: 0.95,
      advertisementId: '3',
      createdAt: new Date()
    }
  ];

  const advertisements: Advertisement[] = [
    {
      id: '1',
      title: 'Renault Clio V 1.0 TCe 100 Zen',
      description: 'Véhicule en excellent état, entretien régulier, non fumeur',
      price: 13500,
      images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'],
      location: 'Paris 15ème',
      distance: 12,
      mileage: 45000,
      year: 2020,
      fuelType: 'Essence',
      seller: {
        name: 'Jean Dupont',
        isProfessional: false
      },
      url: 'https://leboncoin.fr/ad/123',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
      source: 'leboncoin',
      aiScore: 8.5,
      aiTags: ['Prix intéressant', 'Faible kilométrage']
    },
    {
      id: '2',
      title: 'BMW Série 3 320d 184 ch BVA8',
      description: 'BMW Série 3 en parfait état, toutes options, carnet d\'entretien complet',
      price: 28900,
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'],
      location: 'Boulogne-Billancourt',
      distance: 8,
      mileage: 89000,
      year: 2018,
      fuelType: 'Diesel',
      seller: {
        name: 'Garage Premium Auto',
        isProfessional: true
      },
      url: 'https://leboncoin.fr/ad/124',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5h ago
      source: 'leboncoin',
      aiScore: 9.2,
      aiTags: ['Modèle rare', 'Professionnel']
    },
    {
      id: '3',
      title: 'Peugeot 208 1.2 VTi Style',
      description: 'Première main, garage, révisions à jour, pneus neufs',
      price: 9200,
      images: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'],
      location: 'Neuilly-sur-Seine',
      distance: 15,
      mileage: 67000,
      year: 2017,
      fuelType: 'Essence',
      seller: {
        name: 'Marie Martin',
        isProfessional: false
      },
      url: 'https://leboncoin.fr/ad/125',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      source: 'lacentrale',
      aiScore: 7.8,
      aiTags: ['Baisse de prix', 'Première main']
    }
  ];

  const handleContact = (ad: Advertisement) => {
    console.log('Contacter:', ad.title);
    // Ici on ouvrirait une modal ou redirigerait vers une page de contact
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'price_opportunity':
        return DollarSign;
      case 'rare_find':
        return TrendingUp;
      case 'price_drop':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'price_opportunity':
        return 'bg-green-100 text-green-800';
      case 'rare_find':
        return 'bg-blue-100 text-blue-800';
      case 'price_drop':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Suivez vos recherches et découvrez les meilleures opportunités détectées par l'IA
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total annonces</p>
                <p className="text-2xl font-bold text-primary-600">{stats.totalAds}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nouvelles aujourd'hui</p>
                <p className="text-2xl font-bold text-green-600">{stats.newToday}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prix moyen</p>
                <p className="text-2xl font-bold text-accent-600">{stats.averagePrice.toLocaleString()}€</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Baisses de prix</p>
                <p className="text-2xl font-bold text-orange-600">{stats.priceDrops}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Opportunités IA</p>
                <p className="text-2xl font-bold text-purple-600">{stats.opportunities}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-primary-600 mb-4">
            🤖 Insights IA - Opportunités détectées
          </h2>
          <div className="space-y-4">
            {aiInsights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <p className="text-gray-600 text-sm">{insight.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>Confiance: {Math.round(insight.confidence * 100)}%</span>
                      <span className="mx-2">•</span>
                      <span>Il y a {Math.floor(Math.random() * 30)} minutes</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-primary-600">
            Annonces trouvées ({advertisements.length})
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
            
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc'];
                setFilters({ ...filters, sortBy: sortBy as any, sortOrder });
              }}
            >
              <option value="date-desc">Plus récent</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="distance-asc">Distance</option>
              <option value="ai_score-desc">Score IA</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix max</label>
                <input
                  type="number"
                  placeholder="Ex: 15000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage max</label>
                <input
                  type="number"
                  placeholder="Ex: 100000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année min</label>
                <input
                  type="number"
                  placeholder="Ex: 2015"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option value="">Tous</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrique">Électrique</option>
                  <option value="hybride">Hybride</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Ads List */}
        <div className="space-y-6">
          {advertisements.map((ad) => (
            <AdCard
              key={ad.id}
              advertisement={ad}
              onContact={handleContact}
            />
          ))}
        </div>

        {/* Pagination or Load More */}
        <div className="text-center mt-8">
          <button className="btn-outline">
            Charger plus d'annonces
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 