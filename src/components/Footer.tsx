import React from 'react';
import { Ship, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Ship className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-white">Marítima Tours</span>
            </div>
            <p className="mt-2 text-sm">
              Experiências únicas e inesquecíveis em passeios de barco.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>(XX) XXXXX-XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contato@maritima.com.br</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Local do Embarque, Cidade - UF</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li>Segunda a Sexta: 8h às 18h</li>
              <li>Sábado e Domingo: 8h às 17h</li>
              <li className="text-yellow-400">Feriados: Consulte disponibilidade</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Marítima Tours. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}