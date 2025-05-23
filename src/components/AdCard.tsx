import React from 'react';
import { MapPin, Clock, Fuel, Calendar, Star, ExternalLink, Phone } from 'lucide-react';
import { Advertisement } from '../types';

interface AdCardProps {
  advertisement: Advertisement;
  onContact: (ad: Advertisement) => void;
}

const AdCard: React.FC<AdCardProps> = ({ advertisement, onContact }) => {
  const {
    title,
    price,
    images,
    location,
    distance,
    mileage,
    year,
    fuelType,
    seller,
    publishedAt,
    aiScore,
    aiTags,
    source
  } = advertisement;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours}h`;
    return 'À l\'instant';
  };

  const getAIScoreColor = (score?: number) => {
    if (!score) return '';
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      leboncoin: 'bg-blue-100 text-blue-800',
      lacentrale: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[source as keyof typeof colors] || colors.other;
  };

  return (
    <div className="card-hover">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
            {images && images.length > 0 ? (
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Calendar className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
            <div className="flex items-center space-x-2 ml-4">
              {aiScore && (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAIScoreColor(aiScore)}`}>
                  <Star className="w-3 h-3 inline mr-1" />
                  {aiScore}/10
                </div>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceBadge(source)}`}>
                {source}
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary-600 mb-3">
            {formatPrice(price)}
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {location} • {distance} km
            </div>
            {mileage && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatMileage(mileage)} km
              </div>
            )}
            {year && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {year}
              </div>
            )}
            {fuelType && (
              <div className="flex items-center">
                <Fuel className="w-4 h-4 mr-1" />
                {fuelType}
              </div>
            )}
          </div>

          {/* AI Tags */}
          {aiTags && aiTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {aiTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {getTimeAgo(publishedAt)}
              {seller.isProfessional && (
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Pro
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onContact(advertisement)}
                className="btn-primary text-sm py-2 px-4"
              >
                <Phone className="w-4 h-4 mr-1" />
                Contacter
              </button>
              <button className="btn-outline text-sm py-2 px-4">
                <ExternalLink className="w-4 h-4 mr-1" />
                Voir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard; 