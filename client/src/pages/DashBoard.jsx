// File: pages/Dashboard.jsx
import { 
  List, 
  CreditCard, 
  RefreshCw, 
  Search, 
  Calendar 
} from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const menuItems = [
    { key: 'view-registration-list', icon: List, label: 'Registration List', color: 'from-green-400 to-green-600' },
    { key: 'payment', icon: CreditCard, label: 'Payment', color: 'from-purple-400 to-purple-600' },
    { key: 'renewal-check', icon: RefreshCw, label: 'Renewal Check', color: 'from-orange-400 to-orange-600' },
    { key: 'certificate-search', icon: Search, label: 'Certificate Search', color: 'from-teal-400 to-teal-600' },
    { key: 'exam-schedule', icon: Calendar, label: 'Exam Schedule', color: 'from-indigo-400 to-indigo-600' }
  ];

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#f1f4f9' }}>
      <h1 className="text-4xl font-bold text-[#033060] mb-12 text-center tracking-wide">
        📘 Exam Management System
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`bg-gradient-to-br ${item.color} text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 flex flex-col items-center justify-center text-center min-h-[160px]`}
            >
              <Icon className="w-14 h-14 mb-4" />
              <span className="text-xl font-semibold tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
// #add the following line to the end of the file
