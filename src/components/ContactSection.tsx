import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  CheckCircle2,
  ChevronDown,
  CreditCard,
} from 'lucide-react';
import { STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM } from '../data/products';

interface ContactSectionProps {
  whatsappNumber?: string;
  instagramHandle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  whatsappNumber = STORE_WHATSAPP_NUMBER,
  instagramHandle = STORE_INSTAGRAM,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: 'Consulta sobre Combos de Accesorios',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const text = `¡Hola Maison Cherry! 🍒
Mi nombre es *${formData.name}* (${formData.contact || 'Sin teléfono'}).
*Asunto:* ${formData.subject}
*Mensaje:* ${formData.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: '¿Cómo funciona la compra y confirmación por WhatsApp?',
      a: 'Seleccionás tu combo en la tienda, ingresás tu nombre en la bolsa de compras y al pulsar "Finalizar Pedido vía WhatsApp" se abre tu chat con el pedido detallado, el precio y el descuento de -$10.000 aplicado. Te confirmamos el stock y coordinamos entrega y pago inmediatamente.',
    },
    {
      q: '¿Qué formas de pago reciben?',
      a: 'Por ahora aceptamos únicamente Efectivo (al retirar en Catamarca Capital) y Transferencia bancaria directa (CBU / Alias). No trabajamos con cuotas ni tarjetas por el momento.',
    },
    {
      q: '¿Cómo se aplica el descuento de -$10.000 OFF por Inauguración?',
      a: 'El descuento de -$10.000 se deduce automáticamente en tu carrito al elegir cualquiera de nuestros 3 combos, válido hasta fin de octubre o agotar stock.',
    },
    {
      q: '¿Cómo se realizan las entregas en Catamarca y envíos?',
      a: 'En Catamarca Capital coordinamos retiro en punto céntrico sin costo adicional o entrega por cadetería. Para otras localidades coordinamos envío por correo.',
    },
  ];

  return (
    <section id="contacto" className="w-full py-16 sm:py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9182b] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9182b]" />
            <span>Contacto Oficial Maison Cherry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 font-normal">
            Estamos para asesorarte
          </h2>
          <p className="mt-3 text-sm text-neutral-500 font-light">
            Escribinos por WhatsApp o visitá nuestro Instagram para coordinar tu compra en Catamarca.
          </p>
        </div>

        {/* Contact Grid: Info Cards + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 transition-all hover:border-neutral-300">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">WhatsApp Oficial</h3>
                  <p className="text-xs text-neutral-500">+54 383 476-5670</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 mb-4">
                Atención directa para coordinar pagos por transferencia, efectivo y retiro de combos.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola Maison Cherry! Me gustaría hacer una consulta.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <span>Chatear por WhatsApp</span>
              </a>
            </div>

            {/* Instagram Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 transition-all hover:border-neutral-300">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">Instagram Oficial</h3>
                  <p className="text-xs text-neutral-500">@{instagramHandle}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 mb-4">
                Seguinos en nuestra cuenta oficial para enterarte de novedades y lanzamientos.
              </p>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <span>Ver @{instagramHandle}</span>
              </a>
            </div>

            {/* Location & Payment methods */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9182b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Ubicación & Retiros
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    San Fernando del Valle de Catamarca, Argentina.
                  </p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Medios de Pago
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Únicamente Efectivo y Transferencia bancaria (CBU / Alias).
                  </p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 flex items-start gap-3">
                <Clock className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Horarios de Atención
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Lunes a Sábado: 09:00 a 13:00 hs y 17:00 a 21:00 hs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-200/80">
            <h3 className="text-lg font-serif font-bold text-neutral-900 mb-1">
              Envíanos un Mensaje
            </h3>
            <p className="text-xs text-neutral-500 mb-6 font-light">
              Completá el formulario para iniciar la conversación en WhatsApp con tu consulta.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Tu Nombre <span className="text-[#c9182b]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Martina Gómez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 3834-000000"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Motivo de Consulta
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                >
                  <option value="Consulta sobre Combo Cherry Clasic">Combo Cherry Clasic ($32.200)</option>
                  <option value="Consulta sobre Combo Cherry Perla">Combo Cherry Perla ($42.200)</option>
                  <option value="Consulta sobre Combo Friends">Combo Friends ($72.200)</option>
                  <option value="Consulta sobre Envíos o Retiro en Catamarca">Envíos y Retiro en Catamarca</option>
                  <option value="Consulta sobre Pago por Transferencia / Efectivo">Pago por Transferencia o Efectivo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Tu Mensaje <span className="text-[#c9182b]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="¿Querés consultar disponibilidad, coordinar entrega en Catamarca o pagar por transferencia?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-all active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta a WhatsApp (+54 383 476-5670)</span>
              </button>

              {submitted && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>¡Mensaje transferido a WhatsApp! Te responderemos enseguida.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-16 pt-12 border-t border-neutral-200 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-serif font-bold text-neutral-900">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Información clara sobre pagos, entregas y confirmación.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-50/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-100/60 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 border-t border-neutral-200/60 leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
