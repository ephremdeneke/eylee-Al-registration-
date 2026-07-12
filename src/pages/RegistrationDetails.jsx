import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { 
  ArrowLeft, FileText, CheckCircle, Clock, CreditCard, Award, 
  User, ShieldAlert, BookOpen, Compass, Share2, ClipboardCheck,
  ExternalLink, Trash2, Save, AlertCircle, Loader2
} from 'lucide-react';

export default function RegistrationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('alami_admin_authenticated') === 'true';

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit states
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('Pending');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [remarks, setRemarks] = useState('');

  const fetchDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getRegistration(id);
      setRecord(data);
      
      // Seed edit states
      setScore(data["Selection Score"] || 0);
      setSelected(data["Selected"] || 'Pending');
      setAssignedTeam(data["Assigned Team"] || '');
      setPaymentStatus(data["Payment Status"] || 'Pending');
      setRemarks(data["Remarks"] || '');
    } catch (err) {
      setError(err.message || 'Failed to retrieve participant details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDetails();
    }
  }, [id, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);
    setError('');

    try {
      await apiService.updateRegistration({
        "Registration ID": id,
        "Selection Score": Number(score),
        "Selected": selected,
        "Assigned Team": assignedTeam,
        "Payment Status": paymentStatus,
        "Remarks": remarks
      });
      setSaveSuccess(true);
      // Reload details to ensure syncing
      await fetchDetails();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update record details.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you absolutely sure you want to permanently delete registration ${id}?`)) {
      try {
        await apiService.deleteRegistration(id);
        navigate('/admin');
      } catch (err) {
        alert("Error deleting record: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-slate-500 font-semibold text-sm">Retrieving application details from Google Sheets...</p>
        </div>
      </div>
    );
  }

  if (error && !record) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 px-4 flex items-center justify-center text-left">
        <div className="max-w-md w-full bg-white border border-gray-100 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center shadow-sm">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-primary">Error Loading Record</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{error}</p>
          </div>
          <Link
            to="/admin"
            className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-full text-sm flex items-center justify-center gap-2 shadow"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-primary font-bold text-xs tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2 text-sm">
            <CheckCircle className="h-5 w-5 text-accent shrink-0" />
            <span>Record updated and synced successfully with Google Sheets!</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-2 text-sm">
            <AlertCircle className="h-5 w-5 text-rose-700 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold text-gray-400 block mb-1">Registration Details Page</span>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight flex items-center gap-2">
              {record["Full Name"]}
              <span className="font-mono text-sm bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
                {record["Registration ID"]}
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Submitted on {new Date(record["Registration Date"]).toLocaleString()}</p>
          </div>
          <button
            onClick={handleDelete}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
          >
            <Trash2 className="h-4 w-4" />
            Delete Applicant
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Grade & Selection Action Board */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-primary border-b border-slate-100 pb-2 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-accent" />
                Grade & Evaluation
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">These settings sync directly with columns in Google Sheets.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Score */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Selection Score (0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                />
              </div>

              {/* Selected Status */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Selection Status
                </label>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Yes">Selected</option>
                  <option value="No">Rejected</option>
                </select>
              </div>

              {/* Assigned Team */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Assigned Team Domain
                </label>
                <select
                  value={assignedTeam}
                  onChange={(e) => setAssignedTeam(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                >
                  <option value="">Not Assigned</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Media">Media</option>
                  <option value="Technology">Technology</option>
                  <option value="Event Management">Event Management</option>
                  <option value="Research">Research</option>
                  <option value="Education">Education</option>
                  <option value="Innovation">Innovation</option>
                </select>
              </div>

              {/* Payment status */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Payment Verification Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Remarks / Evaluation Notes
                </label>
                <textarea
                  rows="4"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Insert review notes, evaluation comments..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={saveLoading}
                className="w-full bg-primary hover:bg-primary-light disabled:bg-primary-light text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow shadow-primary/20 transition-all mt-4"
              >
                {saveLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save & Sync Sheet
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Full details panels (displays all fields) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Row 1: Profile & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Profile Details */}
              <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase border-b pb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><span className="font-semibold block text-[10px] text-gray-400">Gender</span> {record["Gender"]}</div>
                  <div><span className="font-semibold block text-[10px] text-gray-400">Age</span> {record["Age"]}</div>
                  <div className="col-span-2"><span className="font-semibold block text-[10px] text-gray-400">Phone Number</span> {record["Phone Number"]}</div>
                  <div className="col-span-2"><span className="font-semibold block text-[10px] text-gray-400">Email Address</span> {record["Email Address"]}</div>
                  <div><span className="font-semibold block text-[10px] text-gray-400">Current City</span> {record["Current City"]}</div>
                  <div><span className="font-semibold block text-[10px] text-gray-400">Referral Source</span> {record["Referral Source"]}</div>
                  <div className="col-span-2"><span className="font-semibold block text-[10px] text-gray-400">Participant Category</span> {record["Participant Category"]}</div>
                </div>
              </div>

              {/* Education & Background */}
              <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase border-b pb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  Education & Background
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">School / University / Organization</span>
                    {record["School/University/Organization"]}
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Occupation</span>
                    {record["Occupation"]}
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Previous Leadership Training?</span>
                    {record["Previous Leadership Training"]}
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Leadership Experience Details</span>
                    <p className="mt-1 text-gray-500 leading-relaxed font-light italic">{record["Leadership Experience"] || 'No experience details specified.'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 2: Essays */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-6">
              <h3 className="font-bold text-sm text-primary uppercase border-b pb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-accent" />
                Motivation & Short Answer Questions
              </h3>
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold block text-primary mb-1">Why do you want to join AL-AMI Spark?</span>
                  <p className="text-gray-600 leading-relaxed font-light">{record["Why Join AL-AMI Spark"]}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold block text-primary mb-1">What is the biggest challenge holding you back as a leader?</span>
                  <p className="text-gray-600 leading-relaxed font-light">{record["Biggest Challenge"]}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold block text-primary mb-1">What do you hope to learn from the program?</span>
                  <p className="text-gray-600 leading-relaxed font-light">{record["Hope to Learn"]}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold block text-primary mb-1">Preferred Team Preference</span>
                  <p className="text-gray-600 leading-relaxed font-bold">{record["Preferred Team"]}</p>
                </div>
              </div>
            </div>

            {/* Row 3: Payment details & Screenshot */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Payment Details */}
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-primary uppercase border-b pb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-accent" />
                  Commitment & Payment
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Payment Verification Status</span>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold mt-1 ${
                      record["Payment Status"] === 'Paid' 
                        ? 'bg-emerald-50 text-accent' 
                        : record["Payment Status"] === 'Pending' 
                          ? 'bg-amber-50 text-secondary-dark' 
                          : 'bg-rose-50 text-rose-700'
                    }`}>
                      {record["Payment Status"]}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Commitment Fee Required</span>
                    500 ETB
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Transaction Reference Code</span>
                    <span className="font-mono text-sm font-bold text-primary">{record["Payment Reference"] || 'None Provided'}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-400">Commitment Agreement Checked?</span>
                    {record["Commitment Agreement"]}
                  </div>
                </div>
              </div>

              {/* Image Receipt */}
              <div className="space-y-3 text-left">
                <h3 className="font-bold text-sm text-primary uppercase border-b pb-2">
                  Receipt Image File
                </h3>
                {record["Payment Screenshot"] ? (
                  <div className="relative mt-2 border border-slate-200 rounded-xl overflow-hidden bg-white max-w-[280px]">
                    <img 
                      src={record["Payment Screenshot"]} 
                      alt="Payment Receipt Screenshot" 
                      className="w-full h-auto object-contain max-h-[160px]"
                    />
                    <a 
                      href={record["Payment Screenshot"]} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute bottom-2 right-2 bg-primary hover:bg-primary-light text-white text-[10px] font-bold px-2 py-1.5 rounded shadow flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Image Receipt
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-400 italic block mt-4 text-xs">No screenshot image receipt uploaded for this registration.</span>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
