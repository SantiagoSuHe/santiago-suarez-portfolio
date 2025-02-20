import React, { useState, useEffect } from 'react';
import { Calendar, Linkedin, Mail, Phone, ExternalLink, User, Briefcase, FolderGit2, MessageSquareQuote, HelpCircle, TrendingUp, Target, Lightbulb, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Import content
import { profile } from './content/profile';
import { questions } from './content/questions';
import { caseStudies } from './content/case-studies';

function App() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isQAVisible, setIsQAVisible] = useState(true);
  const [isCaseStudiesVisible, setIsCaseStudiesVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1 fixed"></div>
      
      {/* Hero Section with Introduction */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className={`container mx-auto px-6 py-16 text-center relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-10 blur-lg transform scale-110"></div>
            <img
              src={profile.image}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover shadow-xl relative z-10 border-4 border-white"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">{profile.name}</h1>
          <p className="text-xl text-indigo-600 font-medium mb-6">{profile.role}</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">{profile.intro}</p>
          
          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396] transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {emailCopied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Email
                </>
              )}
            </button>

            <a
              href={profile.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp
            </a>

            <a
              href={profile.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Meeting
            </a>
          </div>

          {/* Main Content Container */}
          <div className="max-w-6xl mx-auto space-y-20 text-left">
            {/* Q&A Section */}
            <div className="glass-effect rounded-xl shadow-lg p-8">
              <button 
                onClick={() => setIsQAVisible(!isQAVisible)}
                className="w-full flex items-center justify-between mb-8 group"
              >
                <div className="flex items-center">
                  <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Quick Questions</h2>
                </div>
                {isQAVisible ? (
                  <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                )}
              </button>
              <div className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden ${isQAVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {questions.map((item, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover-scale"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                      {openQuestions.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openQuestions.includes(index) && (
                      <div className="px-6 py-4 bg-gray-50">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies Section */}
            <div className="glass-effect rounded-xl shadow-lg p-8">
              <button 
                onClick={() => setIsCaseStudiesVisible(!isCaseStudiesVisible)}
                className="w-full flex items-center justify-between mb-8 group"
              >
                <div className="flex items-center">
                  <FolderGit2 className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Case Studies</h2>
                </div>
                {isCaseStudiesVisible ? (
                  <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                )}
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCaseStudiesVisible ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudies.map((project, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover-scale">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <Target className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-900">Objective</h4>
                          </div>
                          <p className="text-gray-600">{project.objective}</p>
                        </div>

                        <div>
                          <div className="flex items-center mb-2">
                            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-900">Approach</h4>
                          </div>
                          <p className="text-gray-600">{project.approach}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="glass-effect rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-8">
                <Mail className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#0077B5] text-white p-4 rounded-lg hover:bg-[#006396] transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                </a>
                
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-900 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={profile.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-4 rounded-lg hover:bg-[#128C7E] transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={profile.contact.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass-effect mt-20">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2025 {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;