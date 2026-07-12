import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { 
  User, Mail, Phone, MapPin, Building, Briefcase, 
  HelpCircle, Compass, Share2, ClipboardCheck, 
  FileText, Upload, AlertCircle, Loader2, ArrowLeft, ArrowRight
} from 'lucide-react';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [screenshotBase64, setScreenshotBase64] = useState('');
  const [fileName, setFileName] = useState('');
  
  const navigate = useNavigate();
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      gender: '',
      age: '',
      phone: '',
      email: '',
      city: '',
      school: '',
      occupation: '',
      training: '',
      experience: '',
      whyJoin: '',
      biggestChallenge: '',
      hopeToLearn: '',
      teamPreference: '',
      referralSource: '',
      participantCategory: 'Youth Leader',
      paymentReference: '',
      agreement: false
    }
  });

  // Watch values for conditional rendering if needed
  const formValues = watch();

  const normalizePhoneNumber = (value = '') => {
    const cleaned = String(value || '').trim().replace(/[\s-]/g, '');

    if (!cleaned) return '';

    if (/^\+?251\d{9}$/.test(cleaned)) {
      return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
    }

    if (/^0?9\d{8}$/.test(cleaned)) {
      return `+251${cleaned.replace(/^0/, '')}`;
    }

    return cleaned;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("File size is too large. Please select an image under 2MB.");
        return;
      }
      setFileName(file.name);
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
        setScreenshotBase64(reader.result); // Base64 representation (data:image/...)
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = async () => {
    // Validate current step fields
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'gender', 'age', 'phone', 'email', 'city'];
    } else if (step === 2) {
      fieldsToValidate = ['school', 'occupation', 'training', 'experience'];
    } else if (step === 3) {
      fieldsToValidate = ['whyJoin', 'biggestChallenge', 'hopeToLearn', 'teamPreference', 'referralSource'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const onSubmit = async (data) => {
    if (!data.agreement) {
      alert("You must agree to the commitment before registering.");
      return;
    }

    const hasPaymentProof = Boolean((data.paymentReference || '').trim() || screenshotBase64);
    if (!hasPaymentProof) {
      setSubmitError('Please provide either a Transaction Reference Code or upload a payment screenshot before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Append screenshot data
      const payload = {
        ...data,
        phone: normalizePhoneNumber(data.phone),
        screenshotBase64: screenshotBase64,
        screenshotName: fileName
      };

      const result = await apiService.submitRegistration(payload);
      
      if (result.success) {
        // Redirect to success page and pass registration details
        navigate('/success', { 
          state: { 
            regId: result.data["Registration ID"],
            fullName: data.fullName,
            email: data.email
          } 
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsHeader = [
    { title: 'Personal Info', desc: 'Who you are' },
    { title: 'Background', desc: 'Education & experience' },
    { title: 'Motivation', desc: 'Interests & goals' },
    { title: 'Payment', desc: 'Commitment fee' }
  ];

  return (
    <div className="w-full">
      {/* Steps Progress Header */}
      <div className="mb-8 hidden sm:flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
        {/* Active progress bar */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>

        {stepsHeader.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;

          return (
            <div key={idx} className="flex flex-col items-center z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary border-primary text-white scale-110 shadow-md shadow-primary/20' 
                    : isCompleted 
                      ? 'bg-accent border-accent text-white' 
                      : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {stepNum}
              </div>
              <div className="mt-2 text-center bg-brandBg px-2">
                <span className={`block text-xs font-bold ${isActive ? 'text-primary' : 'text-slate-500'}`}>{s.title}</span>
                <span className="block text-[10px] text-slate-400 font-light">{s.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Steps Counter */}
      <div className="sm:hidden mb-6 flex items-center justify-between bg-slate-100 p-4 rounded-xl">
        <span className="text-sm font-bold text-primary">Step {step} of 4: {stepsHeader[step - 1].title}</span>
        <span className="text-xs text-gray-500">{stepsHeader[step - 1].desc}</span>
      </div>

      {/* Error Alert Box */}
      {submitError && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start gap-2.5">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">{submitError}</p>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-100 p-6 md:p-10 rounded-3xl shadow-xl space-y-8">
        
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="h-5 w-5 text-accent" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-fullName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-fullName"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('fullName', { required: 'Full Name is required' })}
                  className={`w-full bg-slate-50 border ${errors.fullName ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-gender" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="reg-gender"
                  {...register('gender', { required: 'Gender is required' })}
                  className={`w-full bg-slate-50 border ${errors.gender ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-rose-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-age" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-age"
                  type="number"
                  placeholder="e.g. 21"
                  {...register('age', { 
                    required: 'Age is required', 
                    min: { value: 15, message: 'Must be at least 15' }, 
                    max: { value: 35, message: 'Must be 35 or under' } 
                  })}
                  className={`w-full bg-slate-50 border ${errors.age ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.age && <p className="text-rose-500 text-xs mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  placeholder="e.g. +251911223344 or 0911223344"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: { value: /^(?:\+?251|0)?9\d{8}$/, message: 'Use Ethiopian format, e.g. +251911223344 or 0911223344' }
                  })}
                  className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="e.g. abebe@gmail.com"
                  {...register('email', { 
                    required: 'Email address is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                  })}
                  className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-city" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Current City <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-city"
                  type="text"
                  placeholder="e.g. Addis Ababa"
                  {...register('city', { required: 'Current City is required' })}
                  className={`w-full bg-slate-50 border ${errors.city ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.city && <p className="text-rose-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Background Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building className="h-5 w-5 text-accent" />
              Educational & Professional Background
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-school" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  School / University / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-school"
                  type="text"
                  placeholder="Where do you study or work?"
                  {...register('school', { required: 'School/Org is required' })}
                  className={`w-full bg-slate-50 border ${errors.school ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.school && <p className="text-rose-500 text-xs mt-1">{errors.school.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-occupation" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-occupation"
                  type="text"
                  placeholder="e.g. Student, Software Developer"
                  {...register('occupation', { required: 'Occupation is required' })}
                  className={`w-full bg-slate-50 border ${errors.occupation ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                />
                {errors.occupation && <p className="text-rose-500 text-xs mt-1">{errors.occupation.message}</p>}
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                  Have you had any previous leadership training? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Yes"
                      {...register('training', { required: 'Please select an option' })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="No"
                      {...register('training', { required: 'Please select an option' })}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.training && <p className="text-rose-500 text-xs mt-1">{errors.training.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-experience" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Leadership Experience (Briefly describe) <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reg-experience"
                  rows="3"
                  placeholder="Share any roles, clubs, volunteer work, or initiatives you have led."
                  {...register('experience', { required: 'Leadership experience description is required' })}
                  className={`w-full bg-slate-50 border ${errors.experience ? 'border-rose-300' : 'border-gray-200'} rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                ></textarea>
                {errors.experience && <p className="text-rose-500 text-xs mt-1">{errors.experience.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Motivation & Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-gray-100 pb-3">
              <HelpCircle className="h-5 w-5 text-accent" />
              Motivation & Preferences
            </h3>

            <div>
              <label htmlFor="reg-whyJoin" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Why do you want to join AL-AMI Spark? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reg-whyJoin"
                rows="3"
                placeholder="What inspires you about leadership training?"
                {...register('whyJoin', { required: 'This field is required' })}
                className={`w-full bg-slate-50 border ${errors.whyJoin ? 'border-rose-300' : 'border-gray-200'} rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
              ></textarea>
              {errors.whyJoin && <p className="text-rose-500 text-xs mt-1">{errors.whyJoin.message}</p>}
            </div>

            <div>
              <label htmlFor="reg-biggestChallenge" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                What is the biggest challenge holding you back as a leader? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reg-biggestChallenge"
                rows="3"
                placeholder="e.g. fear of public speaking, organizing teams, resource limits..."
                {...register('biggestChallenge', { required: 'This field is required' })}
                className={`w-full bg-slate-50 border ${errors.biggestChallenge ? 'border-rose-300' : 'border-gray-200'} rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
              ></textarea>
              {errors.biggestChallenge && <p className="text-rose-500 text-xs mt-1">{errors.biggestChallenge.message}</p>}
            </div>

            <div>
              <label htmlFor="reg-hopeToLearn" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                What do you hope to learn? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reg-hopeToLearn"
                rows="2"
                placeholder="List skills, frameworks, or experiences you wish to acquire."
                {...register('hopeToLearn', { required: 'This field is required' })}
                className={`w-full bg-slate-50 border ${errors.hopeToLearn ? 'border-rose-300' : 'border-gray-200'} rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
              ></textarea>
              {errors.hopeToLearn && <p className="text-rose-500 text-xs mt-1">{errors.hopeToLearn.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label htmlFor="reg-teamPreference" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Team Preference <span className="text-red-500">*</span>
                </label>
                <select
                  id="reg-teamPreference"
                  {...register('teamPreference', { required: 'Team preference is required' })}
                  className={`w-full bg-slate-50 border ${errors.teamPreference ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                >
                  <option value="">Choose a Team</option>
                  <option value="Team Envision">Team Envision</option>
                  <option value="Team Ethics">Team Ethics</option>
                  <option value="Team Equip">Team Equip</option>
                  <option value="Team Endure">Team Endure</option>
                  <option value="Team Extend">Team Extend</option>
                </select>
                {errors.teamPreference && <p className="text-rose-500 text-xs mt-1">{errors.teamPreference.message}</p>}
              </div>

              <div>
                <label htmlFor="reg-referralSource" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  How did you hear about us? <span className="text-red-500">*</span>
                </label>
                <select
                  id="reg-referralSource"
                  {...register('referralSource', { required: 'Referral source is required' })}
                  className={`w-full bg-slate-50 border ${errors.referralSource ? 'border-rose-300' : 'border-gray-200'} rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all`}
                >
                  <option value="">Choose Source</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Friend">Friend</option>
                  <option value="School">School/University</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
                {errors.referralSource && <p className="text-rose-500 text-xs mt-1">{errors.referralSource.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Payment Verification & Commitment */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 border-b border-gray-100 pb-3">
              <ClipboardCheck className="h-5 w-5 text-accent" />
              Commitment & Payment Verification
            </h3>

            {/* Fee Info Callout */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 p-6 rounded-2xl text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Participant Category</span>
                <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full">{formValues.participantCategory}</span>
              </div>
              <div className="h-px bg-slate-200/50"></div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-sm font-bold text-primary">Required Commitment Fee</span>
                  <span className="block text-xs text-gray-500">Flat rate fee for program entry & materials</span>
                </div>
                <span className="text-2xl font-extrabold text-primary">500 ETB</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-left space-y-4">
              <span className="block text-xs font-bold text-primary uppercase tracking-wider">Payment Instructions</span>
              <p className="text-xs text-gray-500 leading-relaxed">
                Payment is required to complete your registration. Please transfer 500 ETB to our official banking account: <span className="font-bold">1000740213788 — Excellence Youth Leadership of Ethiopia, Commercial Bank of Ethiopia</span>.
                After payment, please provide either your Transaction Reference Number or upload a screenshot of the payment confirmation below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Reference Text Input */}
              <div>
                <label htmlFor="reg-paymentReference" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Transaction Reference Number
                </label>
                <input
                  id="reg-paymentReference"
                  type="text"
                  placeholder="e.g. FT2619283748"
                  {...register('paymentReference')}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1">Provide the transaction ID/reference from your banking receipt if you do not upload a screenshot.</p>
              </div>

              {/* Upload Screenshot File Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Upload Screenshot / Receipt
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-slate-50 border border-dashed border-gray-300 hover:border-primary rounded-xl px-4 py-3 text-sm flex items-center justify-between text-gray-500 transition-colors">
                    <span className="truncate max-w-[180px]">{fileName || 'Choose image receipt...'}</span>
                    <Upload className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Upload a screenshot/receipt image (JPEG or PNG, under 2MB) if you do not provide a transaction ID.</p>

                {/* Preview Thumbnail */}
                {screenshotPreview && (
                  <div className="mt-3 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                    <img src={screenshotPreview} alt="Receipt Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Commitment Agreement */}
            <div className="pt-6 border-t border-slate-100 text-left">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('agreement', { required: 'You must agree to the commitment requirement' })}
                  className="h-5 w-5 rounded text-primary focus:ring-primary border-gray-300 mt-0.5"
                />
                <span className="text-sm font-semibold text-gray-700 leading-normal select-none">
                  I agree to participate fully in the AL-AMI Spark Leadership Program and understand the commitment required.
                </span>
              </label>
              {errors.agreement && <p className="text-rose-500 text-xs mt-1">{errors.agreement.message}</p>}
            </div>
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-slate-200 text-primary hover:bg-slate-50 rounded-full font-bold text-sm flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div></div> // empty spacer
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-primary hover:bg-primary-light text-white font-bold px-8 py-3.5 rounded-full text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all ml-auto"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-light disabled:bg-primary-light text-white font-bold px-10 py-4 rounded-full text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all ml-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Registration...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
