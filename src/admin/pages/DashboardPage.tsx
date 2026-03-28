import { useEffect, useState } from 'react';
import { MessageSquare, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    messages: 0,
    unreadMessages: 0,
    products: 0,
    orders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [messages, unread, products, orders, pending] = await Promise.all([
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'PENDING'),
      ]);

      setStats({
        messages: messages.count ?? 0,
        unreadMessages: unread.count ?? 0,
        products: products.count ?? 0,
        orders: orders.count ?? 0,
        pendingOrders: pending.count ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Mensajes',
      value: stats.messages,
      sub: `${stats.unreadMessages} sin leer`,
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Productos',
      value: stats.products,
      sub: 'en catálogo',
      icon: Package,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Pedidos',
      value: stats.orders,
      sub: `${stats.pendingOrders} pendientes`,
      icon: ShoppingBag,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Actividad',
      value: '—',
      sub: 'próximamente',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="font-display font-black text-2xl mb-6">Dashboard</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-display font-black text-3xl mt-1">{value}</p>
                  <p className="text-xs text-gray-400 mt-1">{sub}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${color}`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
