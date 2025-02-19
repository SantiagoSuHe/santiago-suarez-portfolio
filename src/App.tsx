import React, { useState } from 'react';
import { Calendar, Linkedin, Mail, Phone, ExternalLink, User, Briefcase, FolderGit2, MessageSquareQuote, HelpCircle, TrendingUp, Target, Lightbulb, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Import content
import { profile } from './content/profile';
import { questions } from './content/questions';
import { caseStudies } from './content/case-studies';
import { experience } from './content/experience';

function App() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Introduction */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1"></div>
        <div className="container mx-auto px-6 py-16 text-center relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-32 h-32 rounded-full mx-auto mb-8 object-cover shadow-lg"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{profile.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{profile.role}</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">{profile.intro}</p>
          
          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396] transition-colors"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
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
              href={`https://wa.me/${profile.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp
            </a>

            <a
              href={profile.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Meeting
            </a>
          </div>

          {/* Q&A Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Quick Questions</h2>
            </div>
            <div className="space-y-4">
              {questions.map((item, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                    {openQuestions.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openQuestions.includes(index) && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white" id="portfolio">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-12">
            <FolderGit2 className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Case Studies</h2>
          </div>
          <div className="space-y-8">
            {caseStudies.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{project.title}</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 text-red-500 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">Objective</h4>
                    </div>
                    <p className="text-gray-600 ml-7">{project.objective}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">Approach</h4>
                    </div>
                    <p className="text-gray-600 ml-7 whitespace-pre-line">{project.approach}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section 
      <section className="py-20 bg-white" id="experience">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-12">
            <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                <p className="text-indigo-600 mb-4">{job.company} • {job.period}</p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Contact Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-12">
            <Mail className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0077B5] text-white p-4 rounded-lg hover:bg-[#006396] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
              
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-900 transition-colors"
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
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-4 rounded-lg hover:bg-[#128C7E] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={profile.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2025 {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;