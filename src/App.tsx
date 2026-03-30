import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  HandHeart, 
  Heart,
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  MapPin,
  Phone,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Menu,
  X,
  Database
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { mockAddresses, getStats, getSupporters } from './mockData';
import { HumanitarianAddress, Category } from './types';
import { cn } from './lib/utils';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'addresses' | 'matching' | 'supporters'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
  const [selectedAddress, setSelectedAddress] = useState<HumanitarianAddress | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(25);

  const stats = useMemo(() => getStats(), []);
  const supporters = useMemo(() => getSupporters(), []);

  const filteredAddresses = useMemo(() => {
    return mockAddresses.filter(addr => {
      const matchesSearch = addr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           addr.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || addr.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  const chartData = Object.entries(stats.byCategory).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-bottom border-slate-100">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Database size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight"
            >
              Nguyễn Bỉnh Khiêm
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Tổng quan" 
            active={activeTab === 'dashboard'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Địa chỉ nhân đạo" 
            active={activeTab === 'addresses'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('addresses')}
          />
          <NavItem 
            icon={<Heart size={20} />} 
            label="Nhà Hảo tâm" 
            active={activeTab === 'supporters'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('supporters')}
          />
          <NavItem 
            icon={<HandHeart size={20} />} 
            label="Gán ghép thông minh" 
            active={activeTab === 'matching'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('matching')}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-semibold text-slate-800">
            {activeTab === 'dashboard' && "Hệ thống Nhân đạo - THPT Nguyễn Bỉnh Khiêm"}
            {activeTab === 'addresses' && "Danh sách Địa chỉ Nhân đạo"}
            {activeTab === 'matching' && "Kết nối Nguồn lực"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm mã ID, tên..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    label="Tổng địa chỉ" 
                    value={stats.total} 
                    icon={<Users className="text-blue-600" />} 
                    trend="+12% tháng này"
                  />
                  <StatCard 
                    label="Hộ nghèo/Cận nghèo" 
                    value={stats.byCategory['Hộ nghèo'] + stats.byCategory['Cận nghèo']} 
                    icon={<AlertCircle className="text-red-500" />} 
                    trend="Cần ưu tiên"
                  />
                  <StatCard 
                    label="Đã hoàn thành" 
                    value={stats.byStatus['Đã hoàn thành']} 
                    icon={<CheckCircle2 className="text-emerald-500" />} 
                    trend={`${Math.round((stats.byStatus['Đã hoàn thành'] / stats.total) * 100)}% tỷ lệ`}
                  />
                  <StatCard 
                    label="Đang chờ hỗ trợ" 
                    value={stats.byStatus['Chưa hỗ trợ']} 
                    icon={<Clock className="text-amber-500" />} 
                    trend="Cần kết nối"
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-600" />
                      Phân loại đối tượng
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-emerald-600" />
                      Trạng thái hỗ trợ
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div 
                key="addresses"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <FilterDropdown 
                      value={filterCategory} 
                      onChange={(v) => setFilterCategory(v as any)} 
                      options={['All', ...Object.keys(stats.byCategory)]}
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus size={18} />
                    Thêm hồ sơ mới
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mã ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Họ và tên</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lớp</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phân loại</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Địa chỉ</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nhu cầu</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAddresses.slice(0, displayLimit).map((addr) => (
                        <tr 
                          key={addr.id} 
                          className="hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedAddress(addr)}
                        >
                          <td className="px-6 py-4 font-mono text-sm text-blue-600 font-medium">{addr.id}</td>
                          <td className="px-6 py-4 font-semibold">{addr.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{addr.studentClass}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              addr.category === 'Hộ nghèo' ? "bg-red-100 text-red-700" :
                              addr.category === 'Cận nghèo' ? "bg-orange-100 text-orange-700" :
                              addr.category === 'Học sinh dân tộc thiểu số' ? "bg-blue-100 text-blue-700" :
                              addr.category === 'Khuyết tật' ? "bg-purple-100 text-purple-700" :
                              "bg-pink-100 text-pink-700"
                            )}>
                              {addr.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 max-w-[200px] truncate">
                            {addr.address}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1 flex-wrap">
                              {addr.needs.map((need, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
                                  {need}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={addr.status} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-slate-600">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-6 border-t border-slate-100 flex flex-col items-center gap-4">
                    <p className="text-sm text-slate-500 font-medium">
                      Đang hiển thị <span className="text-slate-900 font-bold">{Math.min(displayLimit, filteredAddresses.length)}</span> trên tổng số <span className="text-slate-900 font-bold">{filteredAddresses.length}</span> học sinh
                    </p>
                    {displayLimit < filteredAddresses.length && (
                      <button 
                        onClick={() => setDisplayLimit(prev => prev + 25)}
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                      >
                        <Plus size={18} /> Xem thêm học sinh
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'matching' && (
              <motion.div 
                key="matching"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <HandHeart className="text-blue-600" />
                      Gợi ý gán ghép thông minh
                    </h3>
                    <div className="space-y-4">
                      {mockAddresses.filter(a => a.status === 'Chưa hỗ trợ').slice(0, 5).map(addr => (
                        <div key={addr.id} className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-all group">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-slate-800">{addr.name} - Lớp {addr.studentClass}</h4>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MapPin size={12} /> {addr.address}
                              </p>
                            </div>
                            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {addr.id}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {addr.needs.map((n, i) => (
                                <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                                  <Package size={12} /> {n}
                                </span>
                              ))}
                            </div>
                            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all">
                              Gán nhà hảo tâm
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <h4 className="font-bold text-lg mb-2">Thống kê kết nối</h4>
                    <p className="text-blue-100 text-sm mb-6">Hệ thống đã tự động đề xuất 24 cặp gán ghép mới trong 24h qua.</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-medium">Tỷ lệ đáp ứng nhu cầu</span>
                        <span className="text-xl font-bold">68%</span>
                      </div>
                      <div className="w-full bg-blue-500 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[68%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4">Nhà hảo tâm mới</h4>
                    <div className="space-y-4">
                      {supporters.slice(0, 3).map((supporter, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                            {supporter.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{supporter.name}</p>
                            <p className="text-xs text-slate-500">Đã hỗ trợ {supporter.supportedCount} học sinh</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'supporters' && (
              <motion.div 
                key="supporters"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Danh sách Nhà Hảo tâm</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Plus size={18} /> Thêm mới
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supporters.map((supporter, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {supporter.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800">{supporter.name}</h4>
                          <p className="text-xs text-slate-500">Nhà hảo tâm đồng hành</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <span className="text-xs font-medium text-slate-500">Số lượng hỗ trợ</span>
                          <span className="text-sm font-bold text-blue-600">{supporter.supportedCount} học sinh</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                          <span className="text-xs font-medium text-slate-500">Trạng thái</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Đang hoạt động</span>
                        </div>
                      </div>

                      <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAddress && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md h-full bg-white shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={() => setSelectedAddress(null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <Plus size={20} />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-3xl mx-auto mb-4 flex items-center justify-center text-blue-600 text-3xl font-bold">
                    {selectedAddress.name.charAt(selectedAddress.name.length - 1)}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedAddress.name}</h2>
                  <p className="text-blue-600 font-mono text-sm mt-1">{selectedAddress.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Lớp</p>
                    <p className="text-sm font-bold">{selectedAddress.studentClass}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phân loại</p>
                    <p className="text-sm font-bold">{selectedAddress.category}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Trạng thái</p>
                    <StatusBadge status={selectedAddress.status} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Thông tin chi tiết</h4>
                  <DetailItem icon={<MapPin size={16} />} label="Địa chỉ" value={selectedAddress.address} />
                  <DetailItem icon={<Phone size={16} />} label="Liên hệ" value={selectedAddress.contact} />
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                      <Package size={16} /> Nhu cầu hỗ trợ
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedAddress.needs.map((n, i) => (
                        <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-xs font-bold">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-3">Lịch sử hỗ trợ</h4>
                  {selectedAddress.supporter ? (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        S
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-900">{selectedAddress.supporter}</p>
                        <p className="text-xs text-blue-700">Đang thực hiện hỗ trợ</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-blue-600 italic">Chưa có nhà hảo tâm kết nối.</p>
                  )}
                </div>

                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
                  Cập nhật hồ sơ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active, collapsed, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  collapsed?: boolean,
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
        active ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      )}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
      {active && !collapsed && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
    </button>
  );
}

function StatCard({ label, value, icon, trend }: { label: string, value: number | string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trend}</span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: HumanitarianAddress['status'] }) {
  return (
    <span className={cn(
      "px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 w-fit",
      status === 'Đã hoàn thành' ? "bg-emerald-100 text-emerald-700" :
      status === 'Đang hỗ trợ' ? "bg-blue-100 text-blue-700" :
      "bg-amber-100 text-amber-700"
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === 'Đã hoàn thành' ? "bg-emerald-500" :
        status === 'Đang hỗ trợ' ? "bg-blue-500" :
        "bg-amber-500"
      )} />
      {status}
    </span>
  );
}

function FilterDropdown({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="text-slate-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{label}</p>
        <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
