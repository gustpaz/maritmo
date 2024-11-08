import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check, X, AlertCircle } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Booking {
  id: string;
  customerName: string;
  packageName: string;
  date: Date;
  time: string;
  passengers: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  addons: string[];
  contact: {
    whatsapp: string;
    email: string;
  };
}

export default function AdminBookings() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [bookings, setBookings] = React.useState<Booking[]>([
    {
      id: '1',
      customerName: 'João Silva',
      packageName: 'Passeio do Pôr do Sol',
      date: new Date(),
      time: '16:00',
      passengers: 4,
      status: 'pending',
      addons: ['Serviço de Bordo Premium'],
      contact: {
        whatsapp: '(11) 98765-4321',
        email: 'joao@email.com'
      }
    },
    {
      id: '2',
      customerName: 'Maria Santos',
      packageName: 'Tour das Ilhas',
      date: new Date(),
      time: '09:00',
      passengers: 6,
      status: 'confirmed',
      addons: ['Pacote de Fotos', 'Serviço de Bordo Premium'],
      contact: {
        whatsapp: '(11) 91234-5678',
        email: 'maria@email.com'
      }
    }
  ]);

  const startDate = startOfWeek(selectedDate, { locale: ptBR });
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="space-y-6">
      {/* Calendário e Navegação */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Calendário de Reservas</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {format(selectedDate, "MMMM yyyy", { locale: ptBR })}
            </span>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center cursor-pointer rounded-lg ${
                isSameDay(day, selectedDate)
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-xs mb-1">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className="font-semibold">
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Reservas para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-medium text-gray-900">
                      {booking.customerName}
                    </h4>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status === 'confirmed' ? 'Confirmado' : 
                       booking.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{booking.packageName}</p>
                    <p>{booking.time} • {booking.passengers} pessoas</p>
                    {booking.addons.length > 0 && (
                      <p className="mt-1">
                        <span className="font-medium">Adicionais:</span>{' '}
                        {booking.addons.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>WhatsApp: {booking.contact.whatsapp}</p>
                    <p>Email: {booking.contact.email}</p>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-full"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Nenhuma reserva para esta data</p>
            </div>
          )}
        </div>
      </div>

      {/* Alertas */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Lembre-se de confirmar as reservas com pelo menos 24h de antecedência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}