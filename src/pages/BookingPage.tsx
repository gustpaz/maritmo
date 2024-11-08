import React from 'react';
import { Calendar, Clock, Users, Plus, Minus } from 'lucide-react';

export default function BookingPage() {
  const [selectedPackage, setSelectedPackage] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [passengers, setPassengers] = React.useState(2);
  const [addons, setAddons] = React.useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = React.useState({
    name: '',
    whatsapp: '',
    email: '',
  });

  const packages = [
    {
      id: 'sunset',
      name: 'Passeio do Pôr do Sol',
      price: 150,
      duration: '2 horas',
    },
    {
      id: 'islands',
      name: 'Tour das Ilhas',
      price: 280,
      duration: '4 horas',
    },
    {
      id: 'complete',
      name: 'Expedição Completa',
      price: 400,
      duration: '6 horas',
    },
  ];

  const availableAddons = [
    {
      id: 'food',
      name: 'Serviço de Bordo Premium',
      price: 50,
    },
    {
      id: 'photos',
      name: 'Pacote de Fotos Profissionais',
      price: 80,
    },
    {
      id: 'champagne',
      name: 'Champagne e Petiscos',
      price: 120,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir mensagem do WhatsApp
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const selectedAddonsText = addons
      .map(id => availableAddons.find(a => a.id === id)?.name)
      .join(', ');
    
    const message = encodeURIComponent(
      `Olá! Gostaria de fazer uma reserva:\n\n` +
      `Pacote: ${selectedPkg?.name}\n` +
      `Data: ${date}\n` +
      `Horário: ${time}\n` +
      `Passageiros: ${passengers}\n` +
      `Adicionais: ${selectedAddonsText || 'Nenhum'}\n\n` +
      `Nome: ${customerInfo.name}\n` +
      `WhatsApp: ${customerInfo.whatsapp}\n` +
      `Email: ${customerInfo.email}`
    );
    
    // Redirecionar para o WhatsApp
    window.location.href = `https://wa.me/5500000000000?text=${message}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Faça sua Reserva</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Seleção de Pacote */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Escolha seu pacote</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedPackage === pkg.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-600'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <h3 className="font-semibold">{pkg.name}</h3>
                <p className="text-gray-600">{pkg.duration}</p>
                <p className="text-blue-600 font-bold mt-2">R$ {pkg.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline-block w-4 h-4 mr-2" />
              Horário
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Selecione um horário</option>
              <option value="09:00">09:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>
        </div>

        {/* Número de Passageiros */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline-block w-4 h-4 mr-2" />
            Número de Passageiros
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-semibold">{passengers}</span>
            <button
              type="button"
              onClick={() => setPassengers(Math.min(12, passengers + 1))}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Adicionais */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableAddons.map((addon) => (
              <div
                key={addon.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  addons.includes(addon.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-600'
                }`}
                onClick={() => {
                  setAddons(
                    addons.includes(addon.id)
                      ? addons.filter(id => id !== addon.id)
                      : [...addons, addon.id]
                  );
                }}
              >
                <h3 className="font-semibold">{addon.name}</h3>
                <p className="text-blue-600 font-bold mt-2">+ R$ {addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Informações do Cliente */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Suas Informações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={customerInfo.whatsapp}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700"
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}