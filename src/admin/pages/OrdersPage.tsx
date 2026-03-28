import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Order {
  id: string;
  created_at: string;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  total: number | null;
  notes: string | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'Pendiente',  color: 'bg-yellow-100 text-yellow-700' },
  CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-700' },
  SHIPPED:   { label: 'Enviado',    color: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Entregado',  color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelado',  color: 'bg-red-100 text-red-700' },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-6">Pedidos</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse h-16" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
          No hay pedidos aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => {
                  const s = STATUS_LABELS[o.status] ?? { label: o.status, color: 'bg-gray-100 text-gray-500' };
                  return (
                    <tr
                      key={o.id}
                      onClick={() => setSelected(o)}
                      className={`cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === o.id ? 'bg-gray-50' : ''}`}
                    >
                      <td className="px-4 py-3 font-medium">{o.customer_name ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{formatDate(o.created_at)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Detail */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit sticky top-6">
            {selected ? (
              <>
                <h2 className="font-display font-bold text-lg mb-1">{selected.customer_name ?? 'Sin nombre'}</h2>
                <p className="text-xs text-gray-400 mb-4">{formatDate(selected.created_at)}</p>

                <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                  {selected.customer_email && <p>📧 {selected.customer_email}</p>}
                  {selected.customer_phone && <p>📱 {selected.customer_phone}</p>}
                  {selected.total && <p className="font-semibold text-black">Total: ${selected.total}</p>}
                  {selected.notes && <p className="text-gray-500">{selected.notes}</p>}
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Cambiar estado</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(selected.id, key)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-opacity ${color} ${selected.status === key ? 'opacity-100 ring-2 ring-offset-1 ring-black' : 'opacity-60 hover:opacity-100'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-sm text-center py-8">Selecciona un pedido para ver detalles</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
