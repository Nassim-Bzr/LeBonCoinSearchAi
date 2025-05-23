import React, { useState } from 'react';
import { Search, MapPin, Euro, Gauge, Fuel, Calendar } from 'lucide-react';

interface SearchFormData {
  keywords: string;
  category: string;
  priceMax: string;
  location: string;
  radius: string;
  mileageMax: string;
  fuelType: string;
  yearMin: string;
}

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading = false }) => {
  const [formData, setFormData] = useState<SearchFormData>({
    keywords: '',
    category: 'voitures',
    priceMax: '',
    location: '',
    radius: '50',
    mileageMax: '',
    fuelType: '',
    yearMin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const categories = [
    { value: 'voitures', label: 'Voitures' },
    { value: 'motos', label: 'Motos' },
    { value: 'camping-cars', label: 'Camping-cars' },
    { value: 'utilitaires', label: 'Utilitaires' }
  ];

  const fuelTypes = [
    { value: '', label: 'Tous carburants' },
    { value: 'essence', label: 'Essence' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electrique', label: 'Électrique' },
    { value: 'hybride', label: 'Hybride' },
    { value: 'gpl', label: 'GPL' }
  ];

  const radiusOptions = [
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '50', label: '50 km' },
    { value: '100', label: '100 km' },
    { value: '200', label: '200 km' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titre principal */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary-600 mb-2">
          Que recherchez-vous ?
        </h2>
        <p className="text-gray-600">
          Décrivez votre véhicule idéal et notre IA trouvera les meilleures opportunités
        </p>
      </div>

      {/* Recherche principale */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          placeholder="Ex: Renault Clio noire, Peugeot 208, BMW Série 3..."
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          required
        />
      </div>

      {/* Grille des options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Prix maximum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Euro className="inline w-4 h-4 mr-1" />
            Prix maximum
          </label>
          <input
            type="number"
            name="priceMax"
            value={formData.priceMax}
            onChange={handleChange}
            placeholder="Ex: 15000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Localisation
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ville ou code postal"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Rayon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rayon de recherche
          </label>
          <select
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {radiusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Kilométrage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Gauge className="inline w-4 h-4 mr-1" />
            Kilométrage max
          </label>
          <input
            type="number"
            name="mileageMax"
            value={formData.mileageMax}
            onChange={handleChange}
            placeholder="Ex: 150000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Carburant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Fuel className="inline w-4 h-4 mr-1" />
            Carburant
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {fuelTypes.map(fuel => (
              <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
            ))}
          </select>
        </div>

        {/* Année minimum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Année minimum
          </label>
          <input
            type="number"
            name="yearMin"
            value={formData.yearMin}
            onChange={handleChange}
            placeholder="Ex: 2015"
            min="1990"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bouton de recherche */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`btn-primary text-lg px-8 py-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Recherche en cours...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Démarrer la recherche IA
            </>
          )}
        </button>
      </div>

      {/* Note explicative */}
      <div className="text-center text-sm text-gray-500 bg-secondary-100 p-4 rounded-lg">
        💡 <strong>Notre IA analysera</strong> en temps réel les annonces correspondant à vos critères et vous alertera des meilleures opportunités
      </div>
    </form>
  );
};

export default SearchForm; 