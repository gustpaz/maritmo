import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Clock, Users, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559632852-6e09741e6552?auto=format&fit=crop&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Descubra o Paraíso em um Passeio de Barco
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experiências únicas e inesquecíveis com as melhores rotas e serviço premium
          </p>
          <Link
            to="/reservar"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Reserve Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher a Marítima Tours?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos experiências únicas com segurança, conforto e profissionalismo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Anchor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Embarcações Premium</h3>
              <p className="text-gray-600">
                Frota moderna e bem equipada para sua segurança e conforto
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Horários Flexíveis</h3>
              <p className="text-gray-600">
                Diversos horários disponíveis para melhor atender você
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Especializada</h3>
              <p className="text-gray-600">
                Profissionais treinados e experientes para sua melhor experiência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Passeios Mais Populares
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha entre nossas rotas mais procuradas e viva momentos inesquecíveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Passeio do Pôr do Sol",
                image: "https://images.unsplash.com/photo-1586902197503-e71026292412?auto=format&fit=crop&q=80",
                price: "R$ 150",
                duration: "2 horas"
              },
              {
                title: "Tour das Ilhas",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80",
                price: "R$ 280",
                duration: "4 horas"
              },
              {
                title: "Expedição Completa",
                image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&q=80",
                price: "R$ 400",
                duration: "6 horas"
              }
            ].map((tour, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{tour.duration}</span>
                    <span className="text-blue-600 font-bold">{tour.price}</span>
                  </div>
                  <Link
                    to="/reservar"
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                text: "Experiência incrível! O passeio superou todas as expectativas. Equipe muito atenciosa e profissional."
              },
              {
                name: "João Santos",
                text: "Melhor passeio de barco que já fiz. As paisagens são deslumbrantes e o serviço é impecável."
              },
              {
                name: "Ana Oliveira",
                text: "Momento inesquecível com minha família. Já estamos planejando voltar!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para sua aventura?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Reserve seu passeio agora e garanta momentos inesquecíveis
          </p>
          <Link
            to="/reservar"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg"
          >
            Fazer Reserva
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}