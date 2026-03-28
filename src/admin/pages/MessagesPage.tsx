import { useEffect, useState } from 'react';
import { Mail, Phone, PawPrint, CheckCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  pet: string | null;
  message: string | null;
  read: boolean;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from('messages').update({ read: true }).eq('id', id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read: true } : null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const subjectLabel: Record<string, string> = {
    dog: '🐶 Perro', cat: '🐱 Gato', rabbit: '🐰 Conejo', other: '🐾 Otro',
  };

  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-6">Mensajes</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse h-20" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
          No hay mensajes aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) markAsRead(msg.id); }}
                className={`w-full text-left bg-white rounded-2xl border p-4 transition-colors hover:border-black ${
                  selected?.id === msg.id ? 'border-black' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                      <p className={`text-sm truncate ${!msg.read ? 'font-semibold' : 'font-medium text-gray-700'}`}>
                        {msg.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-xs text-gray-500 mt-1">{subjectLabel[msg.subject] ?? msg.subject}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit sticky top-6">
            {selected ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-display font-bold text-lg">{selected.name}</h2>
                    <p className="text-xs text-gray-400">{formatDate(selected.created_at)}</p>
                  </div>
                  {!selected.read && (
                    <button
                      onClick={() => markAsRead(selected.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-black border border-gray-200 rounded-lg px-2 py-1"
                    >
                      <CheckCheck size={12} /> Marcar leído
                    </button>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />{selected.email}
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} />{selected.phone}
                    </div>
                  )}
                  {selected.pet && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <PawPrint size={14} />{selected.pet}
                    </div>
                  )}
                  {selected.subject && (
                    <div className="text-gray-600">
                      Tipo: {subjectLabel[selected.subject] ?? selected.subject}
                    </div>
                  )}
                </div>

                {selected.message && (
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                    {selected.message}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex-1 text-center bg-black text-white text-sm font-semibold py-2 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Responder por email
                  </a>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-green-500 text-white text-sm font-semibold py-2 rounded-xl hover:bg-green-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-sm text-center py-8">
                Selecciona un mensaje para verlo
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
