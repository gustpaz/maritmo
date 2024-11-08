import React from 'react';
import { Upload, Plus, Trash2, X, Image as ImageIcon, Video, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
}

export default function AdminContent() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([
    {
      id: '1',
      author: 'Maria Silva',
      content: 'Experiência incrível! O passeio superou todas as expectativas.',
      rating: 5,
      date: '2024-03-15'
    },
    {
      id: '2',
      author: 'João Santos',
      content: 'Melhor passeio de barco que já fiz. As paisagens são deslumbrantes.',
      rating: 5,
      date: '2024-03-14'
    }
  ]);

  const [mediaGallery, setMediaGallery] = React.useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1559632852-6e09741e6552',
      title: 'Pôr do sol na baía'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1468413253725-0d5181091126',
      title: 'Passeio nas ilhas'
    },
    {
      id: '3',
      type: 'video',
      url: 'https://example.com/video1.mp4',
      title: 'Tour completo'
    }
  ]);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = React.useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = React.useState(false);
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);

  const handleTestimonialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const testimonialData = {
      id: editingTestimonial?.id || Date.now().toString(),
      author: formData.get('author') as string,
      content: formData.get('content') as string,
      rating: Number(formData.get('rating')),
      date: new Date().toISOString().split('T')[0]
    };

    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => 
        t.id === editingTestimonial.id ? testimonialData : t
      ));
    } else {
      setTestimonials([...testimonials, testimonialData]);
    }

    setIsTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleMediaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mediaData = {
      id: Date.now().toString(),
      type: formData.get('type') as 'image' | 'video',
      url: formData.get('url') as string,
      title: formData.get('title') as string
    };

    setMediaGallery([...mediaGallery, mediaData]);
    setIsMediaModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Galeria de Mídia */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Galeria de Mídia</h2>
          <button
            onClick={() => setIsMediaModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Mídia
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mediaGallery.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Video className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => setMediaGallery(mediaGallery.filter(m => m.id !== item.id))}
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

      {/* Depoimentos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Depoimentos</h2>
          <button
            onClick={() => setIsTestimonialModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Depoimento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setIsTestimonialModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setTestimonials(testimonials.filter(t => t.id !== testimonial.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{testimonial.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(testimonial.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Mídia */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Adicionar Mídia</h3>
              <button onClick={() => setIsMediaModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleMediaSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select
                  name="type"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="image">Imagem</option>
                  <option value="video">Vídeo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  name="url"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Adicionar Mídia
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Depoimento */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
              </h3>
              <button
                onClick={() => {
                  setIsTestimonialModalOpen(false);
                  setEditingTestimonial(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                <input
                  type="text"
                  name="author"
                  defaultValue={editingTestimonial?.author}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Depoimento</label>
                <textarea
                  name="content"
                  defaultValue={editingTestimonial?.content}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avaliação</label>
                <select
                  name="rating"
                  defaultValue={editingTestimonial?.rating || 5}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} estrelas
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {editingTestimonial ? 'Salvar Alterações' : 'Adicionar Depoimento'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}