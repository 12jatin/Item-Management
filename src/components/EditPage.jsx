import React, { useState } from 'react';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
import Navbar from './Navbar';
import { exportToWord } from '../utils/exportWord';


const API_BASE_URL = "https://resume-backend-production.up.railway.app";


// Enhance section using mock AI backend
const enhanceWithAI = async (section, content) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, content }),
    });

    if (!response.ok) throw new Error('Failed to enhance content');

    const result = await response.json();
    return result.enhanced_content;
  } catch (error) {
    console.error('Enhancement error:', error);
    alert('AI enhancement failed.');
    return content;
  }
};

const EditPage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    location: 'New York, USA',
  });

  const [professionalSummary, setProfessionalSummary] = useState(
    'Results-oriented software engineer with 5+ years of experience in full-stack development.'
  );

  const [workExperience, setWorkExperience] = useState([
    {
      id: Date.now(),
      title: 'Software Developer',
      company: 'TechCorp',
      duration: '2020 - Present',
      description: 'Built scalable web applications using React and Node.js.',
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: Date.now() + 1,
      degree: 'B.Tech in Computer Science',
      institution: 'ABC University',
      year: '2019',
      description: 'Graduated with distinction.',
    },
  ]);

  const [skills, setSkills] = useState([
    { id: Date.now() + 2, name: 'React', level: 'Advanced' },
    { id: Date.now() + 3, name: 'Node.js', level: 'Intermediate' },
  ]);

  const saveResume = async () => {
    try {
      const resumeData = {
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        user_id: 'default_user',
      };

      const response = await fetch(`${API_BASE_URL}/save-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error('Save failed');
      const result = await response.json();
      alert(`Resume saved! ID: ${result.resume_id}`);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save resume.');
    }
  };

  const handlePersonalInfoChange = (field, value) =>
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));

  const addWorkExperience = () =>
    setWorkExperience((prev) => [
      ...prev,
      { id: Date.now(), title: '', company: '', duration: '', description: '' },
    ]);

  const updateWorkExperience = (id, field, value) =>
    setWorkExperience((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

  const removeWorkExperience = (id) =>
    setWorkExperience((prev) => prev.filter((item) => item.id !== id));

  const addEducation = () =>
    setEducation((prev) => [
      ...prev,
      { id: Date.now(), degree: '', institution: '', year: '', description: '' },
    ]);

  const updateEducation = (id, field, value) =>
    setEducation((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

  const removeEducation = (id) =>
    setEducation((prev) => prev.filter((item) => item.id !== id));

  const addSkill = () =>
    setSkills((prev) => [...prev, { id: Date.now(), name: '', level: '' }]);

  const updateSkill = (id, field, value) =>
    setSkills((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

  const removeSkill = (id) =>
    setSkills((prev) => prev.filter((item) => item.id !== id));

  const enhanceProfessionalSummary = async () => {
    if (!professionalSummary.trim()) return alert('Write something first');
    const enhanced = await enhanceWithAI('summary', professionalSummary);
    setProfessionalSummary(enhanced);
  };

  const enhanceWorkExperience = async (id) => {
    const experience = workExperience.find((e) => e.id === id);
    if (!experience || !experience.description.trim()) return;
    const enhanced = await enhanceWithAI('experience', experience.description);
    updateWorkExperience(id, 'description', enhanced);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-100 mt-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <Section title="Personal Information">
            {['fullName', 'email', 'phone', 'location'].map((field) => (
              <Input
                key={field}
                value={personalInfo[field]}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
              />
            ))}
          </Section>

          <Section
            title="Professional Summary"
            right={<ActionButton onClick={enhanceProfessionalSummary} label="Enhance with AI" />}
          >
            <Textarea
              value={professionalSummary}
              onChange={(e) => setProfessionalSummary(e.target.value)}
              placeholder="Professional summary..."
            />
          </Section>

          <Section
            title="Work Experience"
            right={<ActionButton icon={<Plus size={16} />} onClick={addWorkExperience} label="Add" />}
          >
            {workExperience.map((exp) => (
              <ItemCard
                key={exp.id}
                onDelete={() => removeWorkExperience(exp.id)}
                enhance={() => enhanceWorkExperience(exp.id)}
              >
                {['title', 'company', 'duration'].map((field) => (
                  <Input
                    key={field}
                    value={exp[field]}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={(e) => updateWorkExperience(exp.id, field, e.target.value)}
                  />
                ))}
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                  placeholder="Job description..."
                />
              </ItemCard>
            ))}
          </Section>

          <Section
            title="Education"
            right={<ActionButton icon={<Plus size={16} />} onClick={addEducation} label="Add" />}
          >
            {education.map((edu) => (
              <ItemCard key={edu.id} onDelete={() => removeEducation(edu.id)}>
                {['degree', 'institution', 'year'].map((field) => (
                  <Input
                    key={field}
                    value={edu[field]}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                  />
                ))}
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Description..."
                />
              </ItemCard>
            ))}
          </Section>

          <Section
            title="Skills"
            right={<ActionButton icon={<Plus size={16} />} onClick={addSkill} label="Add" />}
          >
            {skills.map((skill) => (
              <ItemCard key={skill.id} onDelete={() => removeSkill(skill.id)}>
                <Input
                  value={skill.name}
                  placeholder="Skill"
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300"
                >
                  <option value="">Select Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </ItemCard>
            ))}
          </Section>

          <div className="text-center py-6">
            <button
              onClick={saveResume}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg mr-4"
            >
              Save Resume
            </button>
            <button
              onClick={() => exportToWord({ personalInfo, professionalSummary, workExperience, education, skills })}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg"
            >
              Download as Word
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children, right }) => (
  <div className="bg-white p-6 rounded-xl shadow border">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {right}
    </div>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

const Textarea = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={4}
    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
  />
);

const ActionButton = ({ onClick, label, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
  >
    {icon}
    {label}
  </button>
);

const ItemCard = ({ children, onDelete, enhance }) => (
  <div className="relative border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
    {onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={16} />
      </button>
    )}
    {children}
    {enhance && (
      <div className="text-right">
        <button
          onClick={enhance}
          className="mt-2 text-sm text-purple-600 hover:underline flex items-center gap-1"
        >
          <Sparkles size={14} /> Enhance Description
        </button>
      </div>
    )}
  </div>
);

export default EditPage;
