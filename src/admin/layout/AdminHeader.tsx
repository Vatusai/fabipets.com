import { Menu, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="md:hidden p-1 text-gray-600">
        <Menu size={20} />
      </button>
      <div className="hidden md:block text-sm text-gray-500">
        Panel de Administración
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-sm text-gray-600 hidden sm:block">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <LogOut size={15} />
          Salir
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
