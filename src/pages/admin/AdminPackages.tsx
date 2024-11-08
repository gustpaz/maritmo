import React from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  maxPassengers: number;
  active: boolean;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  active: boolean;
}

export default function AdminPackages() {
  const [packages, setPackages] = React.useState<Package[]>([
    {
      id: '1',
      name: 'Passeio do Pôr do Sol',
      duration: '2 horas',
      price: 150,
      description: 'Um passeio romântico para contemplar o pôr do sol',
      maxPassengers: 12,
      active: true,
    },
    {
      id: '2',
      name: 'Tour das Ilhas',
      duration: '4 horas',
      price: 280,
      description: 'Conheça as mais belas ilhas da região',
      maxPassengers: 15,
      active: true,
    },
  ]);

  const [addons, setAddons] = React.useState<Addon[]>([
    {
      id: '1',
      name: 'Serviço de Bordo Premium',
      price: 50,
      description: 'Bebidas e petiscos especiais',
      active: true,
    },
    {
      id: '2',
      name: 'Pacote de Fotos',
      price: 80,
      description: 'Fotos profissionais do seu passeio',
      active: true,
    },
  ]);

  const [isPackageModalOpen, setIsPackageModalOpen] = React.useState(false);
  const [isAddonModalOpen, setIsAddonModalOpen] = React.useState(false);
  const [editingPackage, setEditingPackage] = React.useState<Package | null>(null);
  const [editingAddon, setEditingAddon] = React.useState<Addon | null>(null);

  const handlePackageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const packageData = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.get('name') as string,
      duration: formData.get('duration') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      maxPassengers: Number(formData.get('maxPassengers')),
      active: true,
    };

    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? packageData : p));
    } else {
      setPackages([...packages, packageData]);
    }

    setIsPackageModalOpen(false);
    setEditingPackage(null);
  };

  const handleAddonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addonData = {
      id: editingAddon?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      active: true,
    };

    if (editingAddon) {
      setAddons(addons.map(a => a.id === editingAddon.id ? addonData : a));
    } else {
      setAddons([...addons, addonData]);
    }

    setIsAddonModalOpen(false);
    setEditingAddon(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Pacotes</h2>
        <button
          onClick={() => setIsPackageModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Pacote
        </button>
      </div>

      {/* Lista de Pacotes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duração</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacidade</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                  <div className="text-sm text-gray-500">{pkg.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pkg.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R$ {pkg.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pkg.maxPassengers} pessoas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingPackage(pkg);
                      setIsPackageModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPackages(packages.filter(p => p.id !== pkg.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seção de Adicionais */}
      <div className="mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Adicionais</h2>
          <button
            onClick={() => setIsAddonModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Adicional
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((addon) => (
            <div key={addon.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{addon.name}</h3>
                  <p className="text-gray-500 mt-1">{addon.description}</p>
                  <p className="text-blue-600 font-bold mt-2">R$ {addon.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingAddon(addon);
                      setIsAddonModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setAddons(addons.filter(a => a.id !== addon.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Pacote */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingPackage ? 'Editar Pacote' : 'Novo Pacote'}
              </h3>
              <button
                onClick={() => {
                  setIsPackageModalOpen(false);
                  setEditingPackage(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePackageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingPackage?.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duração</label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={editingPackage?.duration}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingPackage?.price}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  name="description"
                  defaultValue={editingPackage?.description}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacidade Máxima</label>
                <input
                  type="number"
                  name="maxPassengers"
                  defaultValue={editingPackage?.maxPassengers}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {editingPackage ? 'Salvar Alterações' : 'Criar Pacote'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Adicional */}
      {isAddonModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingAddon ? 'Editar Adicional' : 'Novo Adicional'}
              </h3>
              <button
                onClick={() => {
                  setIsAddonModalOpen(false);
                  setEditingAddon(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddonSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingAddon?.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingAddon?.price}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  name="description"
                  defaultValue={editingAddon?.description}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {editingAddon ? 'Salvar Alterações' : 'Criar Adicional'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}