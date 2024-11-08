import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon,
  AlertCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Reservas Hoje',
      value: '12',
      icon: CalendarIcon,
      change: '+20%',
      changeType: 'increase'
    },
    {
      title: 'Clientes Atendidos',
      value: '1.234',
      icon: Users,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 45.678',
      icon: TrendingUp,
      change: '+8%',
      changeType: 'increase'
    }
  ];

  const recentBookings = [
    {
      id: '1',
      customer: 'João Silva',
      package: 'Passeio do Pôr do Sol',
      date: '2024-03-20',
      status: 'pending'
    },
    {
      id: '2',
      customer: 'Maria Santos',
      package: 'Tour das Ilhas',
      date: '2024-03-21',
      status: 'confirmed'
    },
    {
      id: '3',
      customer: 'Pedro Oliveira',
      package: 'Expedição Completa',
      date: '2024-03-22',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-full p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600"> vs. mês anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Reservas Recentes
          </h2>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pacote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.package}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Você tem 5 reservas pendentes aguardando confirmação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}