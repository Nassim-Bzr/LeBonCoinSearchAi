import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Save, AlertCircle } from 'lucide-react';
import { SearchCriteria } from '../types';

const SettingsPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<SearchCriteria | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Données simulées
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria[]>([
    {
      id: '1',
      name: 'Renault Clio récente',
      category: 'voitures',
      keywords: 'Renault Clio',
      priceMax: 15000,
      location: 'Paris',
      radius: 50,
      mileageMax: 80000,
      fuelType: 'essence',
      yearMin: 2018,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'BMW Série 3 diesel',
      category: 'voitures',
      keywords: 'BMW Série 3',
      priceMax: 35000,
      location: 'Île-de-France',
      radius: 100,
      mileageMax: 120000,
      fuelType: 'diesel',
      yearMin: 2016,
      isActive: false,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'voitures',
    keywords: '',
    priceMax: '',
    location: '',
    radius: '50',
    mileageMax: '',
    fuelType: '',
    yearMin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCriteria: SearchCriteria = {
      id: editingCriteria ? editingCriteria.id : Date.now().toString(),
      name: formData.name,
      category: formData.category,
      keywords: formData.keywords,
      priceMax: formData.priceMax ? parseInt(formData.priceMax) : undefined,
      location: formData.location,
      radius: parseInt(formData.radius),
      mileageMax: formData.mileageMax ? parseInt(formData.mileageMax) : undefined,
      fuelType: formData.fuelType || undefined,
      yearMin: formData.yearMin ? parseInt(formData.yearMin) : undefined,
      isActive: true,
      createdAt: editingCriteria ? editingCriteria.createdAt : new Date(),
      updatedAt: new Date()
    };

    if (editingCriteria) {
      setSearchCriteria(prev => 
        prev.map(criteria => criteria.id === editingCriteria.id ? newCriteria : criteria)
      );
    } else {
      setSearchCriteria(prev => [...prev, newCriteria]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'voitures',
      keywords: '',
      priceMax: '',
      location: '',
      radius: '50',
      mileageMax: '',
      fuelType: '',
      yearMin: ''
    });
    setShowForm(false);
    setEditingCriteria(null);
    setIsEditing(false);
  };

  const handleEdit = (criteria: SearchCriteria) => {
    setFormData({
      name: criteria.name,
      category: criteria.category,
      keywords: criteria.keywords,
      priceMax: criteria.priceMax?.toString() || '',
      location: criteria.location,
      radius: criteria.radius.toString(),
      mileageMax: criteria.mileageMax?.toString() || '',
      fuelType: criteria.fuelType || '',
      yearMin: criteria.yearMin?.toString() || ''
    });
    setEditingCriteria(criteria);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce critère de recherche ?')) {
      setSearchCriteria(prev => prev.filter(criteria => criteria.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setSearchCriteria(prev =>
      prev.map(criteria =>
        criteria.id === id ? { ...criteria, isActive: !criteria.isActive } : criteria
      )
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Critères de recherche
          </h1>
          <p className="text-gray-600">
            Gérez vos recherches automatiques et configurez vos alertes IA
          </p>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un nouveau critère
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-primary-600 mb-6">
              {isEditing ? 'Modifier le critère' : 'Nouveau critère de recherche'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom du critère */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du critère *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Renault Clio récente"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* Grille des options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="voitures">Voitures</option>
                    <option value="motos">Motos</option>
                    <option value="camping-cars">Camping-cars</option>
                    <option value="utilitaires">Utilitaires</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mots-clés *</label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Ex: BMW Série 3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum (€)</label>
                  <input
                    type="number"
                    name="priceMax"
                    value={formData.priceMax}
                    onChange={handleChange}
                    placeholder="Ex: 15000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ville ou région"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rayon (km)</label>
                  <select
                    name="radius"
                    value={formData.radius}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                    <option value="50">50 km</option>
                    <option value="100">100 km</option>
                    <option value="200">200 km</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage max</label>
                  <input
                    type="number"
                    name="mileageMax"
                    value={formData.mileageMax}
                    onChange={handleChange}
                    placeholder="Ex: 100000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tous carburants</option>
                    <option value="essence">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="electrique">Électrique</option>
                    <option value="hybride">Hybride</option>
                    <option value="gpl">GPL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Année minimum</label>
                  <input
                    type="number"
                    name="yearMin"
                    value={formData.yearMin}
                    onChange={handleChange}
                    placeholder="Ex: 2015"
                    min="1990"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Mettre à jour' : 'Créer le critère'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Criteria */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary-600">
            Vos critères de recherche ({searchCriteria.length})
          </h2>

          {searchCriteria.length === 0 ? (
            <div className="card text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun critère configuré
              </h3>
              <p className="text-gray-600 mb-4">
                Créez votre premier critère de recherche pour commencer à recevoir des alertes automatiques.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Créer un critère
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {searchCriteria.map((criteria) => (
                <div key={criteria.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {criteria.name}
                        </h3>
                        <button
                          onClick={() => handleToggleActive(criteria.id)}
                          className="text-2xl"
                        >
                          {criteria.isActive ? (
                            <ToggleRight className="w-8 h-8 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          criteria.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {criteria.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Recherche:</span> {criteria.keywords}
                        </div>
                        <div>
                          <span className="font-medium">Prix max:</span> {criteria.priceMax ? `${criteria.priceMax}€` : 'Non défini'}
                        </div>
                        <div>
                          <span className="font-medium">Lieu:</span> {criteria.location} ({criteria.radius}km)
                        </div>
                        <div>
                          <span className="font-medium">Kilométrage:</span> {criteria.mileageMax ? `${criteria.mileageMax}km` : 'Non défini'}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Créé le {criteria.createdAt.toLocaleDateString('fr-FR')} • 
                        Mis à jour le {criteria.updatedAt.toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(criteria)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(criteria.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-primary-600 mb-4">
            Paramètres de notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Alertes email</h3>
                <p className="text-sm text-gray-600">Recevoir les notifications par email</p>
              </div>
              <ToggleRight className="w-8 h-8 text-green-500" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Alertes SMS</h3>
                <p className="text-sm text-gray-600">Recevoir les notifications par SMS</p>
              </div>
              <ToggleLeft className="w-8 h-8 text-gray-400" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Résumé quotidien</h3>
                <p className="text-sm text-gray-600">Recevoir un résumé quotidien des nouvelles annonces</p>
              </div>
              <ToggleRight className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 