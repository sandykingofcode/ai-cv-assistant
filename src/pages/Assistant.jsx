import React, { useState } from "react";

const Assistant = () => {
  const [mode, setMode] = useState("cv");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: ''
  });

  const [education, setEducation] = useState([{
    degree: '',
    university: '',
    years: ''
  }]);

  const [experience, setExperience] = useState([{
    title: '',
    company: '',
    period: '',
    description: ''
  }]);

  // Existing states
  const [socialLinks, setSocialLinks] = useState([{ type: "", url: "" }]);
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', university: '', years: '' }]);
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([...experience, { title: '', company: '', period: '', description: '' }]);
  };

  // Existing handlers
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { type: "", url: "" }]);
  };
  
  const handleRemoveSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };
  
  const handleSocialLinkChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };
  
  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };
  
  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addHobbie = () => {
    setHobbies([...hobbies, ""]);
  };
  
  const removeHobbie = (index) => {
    const updated = [...hobbies];
    updated.splice(index, 1);
    setHobbies(updated);
  };
  
  const handleHobbieChange = (index, value) => {
    const updated = [...hobbies];
    updated[index] = value;
    setHobbies(updated);
  };

  const templates = [
    {
      id: 1,
      title: "Plantilla clásica",
      description: "Diseño tradicional, ideal para entornos corporativos y profesionales formales.",
    },
    {
      id: 2,
      title: "Plantilla Moderna",
      description: "Estilo limpio y contemporáneo, perfecto para perfiles creativos y tecnológicos.",
    },
    {
      id: 3,
      title: "Plantilla Creativa",
      description: "Enfoque visual único con elementos destacados, ideal para diseñadores o artistas.",
    },
  ];

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
  };

  const allSkills = [
    "Comunicación efectiva", "Resolución de problemas", "Trabajo en equipo",
    "Pensamiento crítico", "Gestión del tiempo", "Adaptabilidad", "Creatividad", "Liderazgo",
    "Inglés", "Español", "Francés", "Alemán", "Portugués", "Italiano", "Otros",
    "Microsoft Office", "Google Workspace", "Figma", "Adobe Creative Suite",
    "Trello / Jira", "Slack", "Notion", "Canva",
    "JavaScript", "HTML/CSS", "React", "Node.js", "Python", "SQL / NoSQL",
    "Git / GitHub", "Tailwind CSS", "Docker", "APIs RESTful", "Firebase", "TypeScript",
  ];

  const allHobbies = [
    "Voluntariado", "Lectura", "Viajar", "Deportes", "Idiomas", 
    "Pintura", "Bloquear", "Música", "Escribir"
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold">AI CV Assistant</h1>
        <p className="text-sm text-gray-500">Tu asistente inteligente para crear el currículum perfecto</p>
      </header>

      <main className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 bg-white border-r p-4">
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setMode("cv")}
              className={`w-1/2 py-2 rounded-2xl ${mode === "cv" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Crear CV
            </button>
            <button
              onClick={() => setMode("templates")}
              className={`w-1/2 py-2 rounded-2xl ${mode === "templates" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Plantillas
            </button>
          </div>

          <nav className="space-y-4">
            <details className="bg-gray-50 p-4 rounded shadow" open>
              <summary className="cursor-pointer font-semibold">Datos Personales</summary>
              <div className="mt-2 space-y-2">
                <label className="block text-sm">Nombre completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  className="w-full border rounded px-2 py-1"
                />
                <label className="block text-sm">Título Profesional</label>
                <input
                  type="text"
                  name="title"
                  value={personalInfo.title}
                  onChange={handlePersonalInfoChange}
                  className="w-full border rounded px-2 py-1"
                />
                <label className="block text-sm">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full border rounded px-2 py-1"
                />
                <label className="block text-sm">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </details>

            <details className="bg-gray-50 p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">Educación</summary>
              {education.map((edu, index) => (
                <div key={index} className="mt-2 space-y-2">
                  <label className="block text-sm">Título</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <label className="block text-sm">Universidad</label>
                  <input
                    type="text"
                    value={edu.university}
                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <label className="block text-sm">Años</label>
                  <input
                    type="text"
                    value={edu.years}
                    onChange={(e) => handleEducationChange(index, 'years', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ))}
              <button
                onClick={addEducation}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                + Añadir educación
              </button>
            </details>

            <details className="bg-gray-50 p-4 rounded shadow">
              <summary className="cursor-pointer font-semibold">Experiencia</summary>
              {experience.map((exp, index) => (
                <div key={index} className="mt-2 space-y-2">
                  <label className="block text-sm">Cargo</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <label className="block text-sm">Empresa</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <label className="block text-sm">Periodo</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <label className="block text-sm">Descripción</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ))}
              <button
                onClick={addExperience}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                + Añadir experiencia
              </button>
            </details>

            <details className="bg-gray-50 p-4 rounded-xl shadow">
              <summary className="cursor-pointer font-semibold">Sitios Web y Redes Sociales</summary>
              <div className="mt-4 space-y-4">
                {socialLinks.map((entry, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={entry.type}
                      onChange={(e) => handleSocialLinkChange(index, "type", e.target.value)}
                      className="w-1/3 border rounded px-2 py-1"
                    >
                      <option value="" disabled hidden>Seleccionar...</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Website">Website</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={entry.url}
                      onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                      className="w-2/3 border rounded px-2 py-1"
                    />
                    <button
                      onClick={() => handleRemoveSocialLink(index)}
                      className="text-gray-400 font-bold hover:text-red-800"
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Añadir otro
                </button>
              </div>
            </details>

            <details className="bg-gray-50 p-4 rounded-2xl shadow">
              <summary className="cursor-pointer font-semibold">Habilidades</summary>
              <div className="mt-4 space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="" disabled hidden>Seleccionar habilidad</option>
                      {allSkills.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-gray-400 font-bold hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Añadir
                </button>
              </div>
            </details>

            <details className="bg-gray-50 p-4 rounded-2xl shadow">
              <summary className="cursor-pointer font-semibold">Pasa Tiempos</summary>
              <div className="mt-4 space-y-2">
                {hobbies.map((hobbie, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={hobbie}
                      onChange={(e) => handleHobbieChange(index, e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="" disabled hidden>Seleccionar Hobbie</option>
                      {allHobbies.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeHobbie(index)}
                      className="text-gray-400 font-bold hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHobbie}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Añadir
                </button>
              </div>
            </details>
          </nav>
        </aside>

        <section className="w-full lg:w-3/4 p-6 space-y-6">
          {mode === "templates" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Elige una plantilla</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`relative group bg-white rounded-2xl shadow p-4 text-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 ${
                      selectedTemplate === template.id ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{template.title}</h3>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {template.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-4">Vista previa del CV</h2>
            <div className="bg-white border p-6 rounded shadow">
              {mode === "cv" ? (
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                      {/* Placeholder for profile photo */}
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold">{personalInfo.fullName || "Tu Nombre"}</h1>
                      <p className="text-xl text-gray-600">{personalInfo.title || "Tu Título Profesional"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-1">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Contacto</h2>
                        <div className="space-y-2">
                          <p>{personalInfo.email}</p>
                          <p>{personalInfo.phone}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Educación</h2>
                        {education.map((edu, index) => (
                          <div key={index} className="mb-4">
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-gray-600">{edu.university}</p>
                            <p className="text-sm text-gray-500">{edu.years}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6">
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Habilidades</h2>
                        <div className="space-y-1">
                          {skills.map((skill, index) => (
                            <p key={index}>{skill}</p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Pasa Tiempos</h2>
                        <div className="space-y-1">
                          {hobbies.map((hobby, index) => (
                            <p key={index}>{hobby}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="mb-8">
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Experiencia</h2>
                        {experience.map((exp, index) => (
                          <div key={index} className="mb-6">
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.period}</p>
                            <p className="mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Enlaces</h2>
                        <div className="space-y-2">
                          {socialLinks.map((link, index) => (
                            link.type && link.url && (
                              <p key={index}>
                                <span className="font-medium">{link.type}:</span> {link.url}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedTemplate ? (
                <img
                  src={`template${selectedTemplate}.jpg`}
                  alt={`Vista previa Plantilla ${selectedTemplate}`}
                  className="mx-auto"
                />
              ) : (
                <p className="text-gray-500">Selecciona una plantilla para ver la vista previa</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 text-center text-sm py-4 mt-6">
        &copy; 2025 AI CV Assistant. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Assistant;