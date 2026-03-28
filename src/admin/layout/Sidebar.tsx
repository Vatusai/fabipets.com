import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Package, ShoppingBag, X } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/messages', label: 'Mensajes', icon: MessageSquare },
  { to: '/admin/products', label: 'Productos', icon: Package },
  { to: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-200
          flex flex-col transition-transform duration-300 md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="font-display font-black text-lg">
            Fabipets<span style={{ color: 'var(--camel)' }}>.</span>
          </span>
          <button onClick={onClose} className="md:hidden p-1 text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-gray-200 text-xs text-gray-400">
          Admin Panel v1.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
