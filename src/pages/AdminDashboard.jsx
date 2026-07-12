import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { 
  Users, UserCheck, Clock, CreditCard, Award, 
  Search, Filter, LogOut, Check, X, ShieldAlert,
  ArrowUpDown, ExternalLink, Download, Edit2, Eye, Trash2, CheckCircle, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('alami_admin_authenticated') === 'true';

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  
  // Sort state
  const [sortField, setSortField] = useState('Registration ID');
  const [sortAsc, setSortAsc] = useState(false);

  // Fetch registrations from Google Sheets API
  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.listRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError(err.message || 'Failed to retrieve registrations from Google Sheets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Statistics calculations
  const total = registrations.length;
  const selectedCount = registrations.filter(r => r["Selected"] === 'Yes').length;
  const pendingCount = registrations.filter(r => r["Selected"] === 'Pending').length;
  const paidCount = registrations.filter(r => r["Payment Status"] === 'Paid').length;
  const unpaidCount = registrations.filter(r => r["Payment Status"] !== 'Paid').length;
  const maleCount = registrations.filter(r => r["Gender"] === 'Male').length;
  const femaleCount = registrations.filter(r => r["Gender"] === 'Female').length;
  
  // Average Score of graded participants
  const gradedRecords = registrations.filter(r => r["Selection Score"] && Number(r["Selection Score"]) > 0);
  const avgScore = gradedRecords.length > 0 
    ? (gradedRecords.reduce((sum, r) => sum + Number(r["Selection Score"]), 0) / gradedRecords.length).toFixed(1)
    : 'N/A';

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('alami_admin_authenticated');
    navigate('/login');
  };

  // Quick Action: Select / Approve candidate
  const handleQuickSelect = async (recordId, value) => {
    try {
      await apiService.updateRegistration({
        "Registration ID": recordId,
        "Selected": value
      });
      await fetchRegistrations();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Quick Action: Mark Paid
  const handleQuickMarkPaid = async (recordId, status) => {
    try {
      await apiService.updateRegistration({
        "Registration ID": recordId,
        "Payment Status": status
      });
      await fetchRegistrations();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Action: Delete registration
  const handleDelete = async (recordId) => {
    if (window.confirm(`Are you sure you want to permanently delete registration ${recordId}?`)) {
      try {
        await apiService.deleteRegistration(recordId);
        await fetchRegistrations();
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert("No data available to export.");
      return;
    }
    
    // Headers
    const headers = Object.keys(registrations[0]);
    
    // Rows
    const rows = registrations.map(reg => 
      headers.map(header => {
        let value = reg[header];
        if (value === null || value === undefined) value = '';
        // Escape quotes and wrap in quotes if commas exist
        let stringVal = String(value).replace(/"/g, '""');
        if (stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('"')) {
          stringVal = `"${stringVal}"`;
        }
        return stringVal;
      }).join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "AL_AMI_Spark_Registrations_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering & Sorting
  const filteredRecords = registrations.filter(r => {
    const matchesSearch = 
      r["Full Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      r["Registration ID"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      r["Phone Number"].includes(searchTerm) ||
      r["Email Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      r["Current City"].toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPayment = paymentFilter === 'All' || r["Payment Status"] === paymentFilter;
    const matchesSelected = selectedFilter === 'All' || r["Selected"] === selectedFilter;
    const matchesTeam = teamFilter === 'All' || r["Preferred Team"] === teamFilter || r["Assigned Team"] === teamFilter;

    return matchesSearch && matchesPayment && matchesSelected && matchesTeam;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    } else {
      valA = Number(valA || 0);
      valB = Number(valB || 0);
    }
    
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-2 text-sm">
            <ShieldAlert className="h-5 w-5 text-rose-700 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dashboard Title & Actions Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">Admin Dashboard</h2>
            <p className="text-gray-500 text-xs mt-1 font-semibold text-accent">Active Google Sheets Database Connection</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchRegistrations}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-primary p-2.5 rounded-xl shadow-sm hover:shadow transition-all"
              title="Refresh database"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-accent hover:bg-accent-light text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase">Total Applicants</span>
              <span className="text-2xl font-black text-primary">{total}</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Male: {maleCount} | Female: {femaleCount}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-accent shrink-0">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase">Selected</span>
              <span className="text-2xl font-black text-primary">{selectedCount}</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Pending approval: {pendingCount}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-secondary-dark shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase">Paid Participants</span>
              <span className="text-2xl font-black text-primary">{paidCount}</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Unpaid / Pending: {unpaidCount}</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-700 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase">Average Score</span>
              <span className="text-2xl font-black text-primary">{avgScore}</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Graded candidates: {gradedRecords.length}</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <input
                type="text"
                placeholder="Search by ID, name, city, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:bg-white focus:border-primary transition-all"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Selection status filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs shrink-0 font-medium">Selected:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Yes">Selected</option>
                <option value="Pending">Pending</option>
                <option value="No">Rejected/Not Selected</option>
              </select>
            </div>

            {/* Payment status filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs shrink-0 font-medium">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending Review</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* Team filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs shrink-0 font-medium">Team:</span>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Community Service">Community Service</option>
                <option value="Media">Media</option>
                <option value="Technology">Technology</option>
                <option value="Event Management">Event Management</option>
                <option value="Research">Research</option>
                <option value="Education">Education</option>
                <option value="Innovation">Innovation</option>
                <option value="Any Team">Any Team</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Data Table */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-20 text-center text-slate-500 font-medium">
              Loading participant records...
            </div>
          ) : sortedRecords.length === 0 ? (
            <div className="p-20 text-center text-slate-500 font-medium">
              No matching records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-slate-50 text-slate-400 font-bold text-[11px] uppercase tracking-wider text-left">
                  <tr>
                    <th className="px-6 py-4 cursor-pointer hover:text-primary" onClick={() => handleSort('Registration ID')}>
                      <div className="flex items-center gap-1">
                        ID
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 cursor-pointer hover:text-primary" onClick={() => handleSort('Full Name')}>
                      <div className="flex items-center gap-1">
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Preferred Team</th>
                    <th className="px-6 py-4 cursor-pointer hover:text-primary" onClick={() => handleSort('Selection Score')}>
                      <div className="flex items-center gap-1">
                        Score
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4">Selected</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {sortedRecords.map((record) => (
                    <tr key={record["Registration ID"]} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-primary text-xs">
                        {record["Registration ID"]}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {record["Full Name"]}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{record["Phone Number"]}</td>
                      <td className="px-6 py-4 text-xs">{record["Current City"]}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-primary">{record["Preferred Team"]}</td>
                      <td className="px-6 py-4 text-xs font-bold text-center">
                        {record["Selection Score"] || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold ${
                          record["Selected"] === 'Yes' 
                            ? 'bg-emerald-50 text-accent' 
                            : record["Selected"] === 'Pending' 
                              ? 'bg-amber-50 text-secondary-dark' 
                              : 'bg-rose-50 text-rose-750'
                        }`}>
                          {record["Selected"]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold ${
                          record["Payment Status"] === 'Paid' 
                            ? 'bg-emerald-50 text-accent' 
                            : record["Payment Status"] === 'Pending' 
                              ? 'bg-amber-50 text-secondary-dark' 
                              : 'bg-rose-50 text-rose-750'
                        }`}>
                          {record["Payment Status"]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Navigation redirects instead of modal pops */}
                          <Link
                            to={`/admin/registration/${record["Registration ID"]}`}
                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-slate-100 rounded-lg flex items-center"
                            title="View Registration Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/registration/${record["Registration ID"]}`}
                            className="p-1.5 text-gray-400 hover:text-accent hover:bg-slate-100 rounded-lg flex items-center"
                            title="Edit & Grade"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          
                          {/* Quick selection approvals */}
                          {record["Selected"] === 'Pending' && (
                            <button
                              onClick={() => handleQuickSelect(record["Registration ID"], 'Yes')}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 border border-emerald-100 rounded"
                              title="Select applicant"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          )}
                          
                          {/* Quick Payment Mark */}
                          {record["Payment Status"] !== 'Paid' && (
                            <button
                              onClick={() => handleQuickMarkPaid(record["Registration ID"], 'Paid')}
                              className="p-1 text-amber-600 hover:bg-amber-50 border border-amber-100 rounded"
                              title="Mark as Paid"
                            >
                              <CreditCard className="h-3.5 w-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(record["Registration ID"])}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
