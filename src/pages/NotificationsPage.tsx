import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Check, X, Clock, Filter, Eye, ExternalLink } from 'lucide-react';
import { Notification } from '../types';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sent' | 'pending' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'email' | 'sms' | 'push'>('all');

  // Données simulées
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'email',
      title: 'Nouvelle annonce: Renault Clio',
      message: 'Nouvelle Renault Clio correspondant à vos critères détectée - Prix: 13 500€',
      status: 'sent',
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      advertisementId: '1',
      criteriaId: '1'
    },
    {
      id: '2',
      type: 'sms',
      title: 'Alerte Prix',
      message: 'BMW Série 3 - Baisse de prix détectée: -1500€',
      status: 'sent',
      sentAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      advertisementId: '2',
      criteriaId: '2'
    },
    {
      id: '3',
      type: 'email',
      title: 'Opportunité IA',
      message: 'Notre IA a détecté une excellente opportunité pour votre recherche "BMW Série 3"',
      status: 'pending',
      criteriaId: '2'
    },
    {
      id: '4',
      type: 'email',
      title: 'Résumé quotidien',
      message: '23 nouvelles annonces trouvées aujourd\'hui, 3 opportunités détectées',
      status: 'sent',
      sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      criteriaId: '1'
    },
    {
      id: '5',
      type: 'sms',
      title: 'Alerte urgente',
      message: 'Peugeot 208 rare - Contact immédiat recommandé',
      status: 'failed',
      criteriaId: '1'
    },
    {
      id: '6',
      type: 'push',
      title: 'Nouvelle correspondance',
      message: 'Audi A3 trouvée selon vos critères',
      status: 'sent',
      sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      criteriaId: '1'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-blue-500" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'push':
        return <Phone className="w-5 h-5 text-purple-500" />;
      default:
        return <Mail className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'sms':
        return 'bg-green-100 text-green-800';
      case 'push':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Envoyé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échec';
      default:
        return 'Inconnu';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      case 'push':
        return 'Push';
      default:
        return type;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesStatus = filter === 'all' || notification.status === filter;
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Il y a ${diffHours}h`;
    } else {
      return 'À l\'instant';
    }
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length,
    today: notifications.filter(n => {
      const today = new Date();
      const notificationDate = n.sentAt || new Date();
      return notificationDate.toDateString() === today.toDateString();
    }).length
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Historique des notifications
          </h1>
          <p className="text-gray-600">
            Consultez l'historique de toutes vos alertes et notifications envoyées
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-primary-600">{stats.total}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Envoyées</p>
                <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Échecs</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aujourd'hui</p>
                <p className="text-2xl font-bold text-accent-600">{stats.today}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par statut
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="sent">Envoyées</option>
                <option value="pending">En attente</option>
                <option value="failed">Échecs</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrer par type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tous les types</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="btn-outline flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary-600">
            Notifications ({filteredNotifications.length})
          </h2>

          {filteredNotifications.length === 0 ? (
            <div className="card text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune notification trouvée
              </h3>
              <p className="text-gray-600">
                Aucune notification ne correspond aux filtres sélectionnés.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="card">
                  <div className="flex items-start space-x-4">
                    {/* Type Icon */}
                    <div className="flex-shrink-0">
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                            {getTypeLabel(notification.type)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {getStatusLabel(notification.status)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          {getStatusIcon(notification.status)}
                          <span className="ml-2">
                            {notification.sentAt ? (
                              <>Envoyé {formatDate(notification.sentAt)}</>
                            ) : (
                              'En attente d\'envoi'
                            )}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          {notification.advertisementId && (
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir l'annonce
                            </button>
                          )}
                          
                          {notification.status === 'failed' && (
                            <button className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                              Renvoyer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-primary-600 mb-6">
            Activité récente
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email envoyé avec succès</p>
                <p className="text-sm text-gray-600">Nouvelle annonce Renault Clio détectée</p>
                <p className="text-xs text-gray-500">Il y a 2 heures</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Nouveau critère de recherche créé</p>
                <p className="text-sm text-gray-600">BMW Série 3 diesel</p>
                <p className="text-xs text-gray-500">Il y a 1 jour</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Notification push envoyée</p>
                <p className="text-sm text-gray-600">Opportunité détectée par l'IA</p>
                <p className="text-xs text-gray-500">Il y a 2 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 