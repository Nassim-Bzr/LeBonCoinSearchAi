import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Zap, Target, Clock, TrendingUp, Shield } from 'lucide-react';
import SearchForm from '../components/SearchForm';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (searchData: any) => {
    // Simuler la recherche et rediriger vers le dashboard
    console.log('Recherche lancée:', searchData);
    // En production, ici on déclencherait l'API de recherche
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Bot,
      title: 'IA Avancée',
      description: 'Notre intelligence artificielle analyse des milliers d\'annonces en temps réel pour identifier les meilleures opportunités.'
    },
    {
      icon: Zap,
      title: 'Alertes Instantanées',
      description: 'Soyez prévenu immédiatement par SMS ou email dès qu\'une annonce correspond à vos critères.'
    },
    {
      icon: Target,
      title: 'Recherche Précise',
      description: 'Définissez vos critères exacts et notre système trouvera exactement ce que vous cherchez.'
    },
    {
      icon: TrendingUp,
      title: 'Analyse de Prix',
      description: 'Détectez les bonnes affaires grâce à notre analyse comparative des prix du marché.'
    },
    {
      icon: Clock,
      title: 'Gain de Temps',
      description: 'Plus besoin de parcourir manuellement des centaines d\'annonces, l\'IA fait le travail pour vous.'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Vos données sont protégées et nous ne contactons jamais les vendeurs en votre nom.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Annonces analysées par jour' },
    { value: '95%', label: 'Précision de l\'IA' },
    { value: '2min', label: 'Temps de configuration' },
    { value: '24/7', label: 'Surveillance continue' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-600 mb-6">
              LeBoncoin<span className="text-accent-500"> AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Automatisez votre recherche de véhicules avec l'intelligence artificielle.
              <br />
              <strong>Trouvez la perle rare avant tout le monde.</strong>
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
            Pourquoi choisir LeBoncoin AI ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre technologie révolutionne la façon dont vous recherchez des véhicules d'occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              En 3 étapes simples, configurez votre recherche automatisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Définissez vos critères</h3>
              <p className="text-primary-100">
                Renseignez le modèle de véhicule, le prix maximum, la localisation et tous vos critères spécifiques.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">L'IA surveille pour vous</h3>
              <p className="text-primary-100">
                Notre intelligence artificielle analyse en continu les nouvelles annonces et détecte les opportunités.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Recevez les alertes</h3>
              <p className="text-primary-100">
                Soyez alerté instantanément par SMS ou email des meilleures annonces correspondant à vos critères.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à automatiser votre recherche ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Rejoignez des milliers d'utilisateurs qui ont déjà trouvé la voiture de leurs rêves
          </p>
          <button 
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
          >
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 