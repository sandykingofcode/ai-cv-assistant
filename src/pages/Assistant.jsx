import React, { useState } from "react";
import RichTextEditor from "../components/RichTextEditor";
import ToggleSection from "../components/ToggleSection";
import DOMPurify from 'dompurify';

const Assistant = () => {
  const [mode, setMode] = useState("cv");
  const [selectedTemplate, setSelectedTemplate] = useState("cv");
  
  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    professionalSummary: '', 
  });



  const [experience, setExperience] = useState([{
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);
  

  const [education, setEducation] = useState([{
    degree: '',
    university: '',
    years: ''
  }]);


  // Existing states
  const [socialLinks, setSocialLinks] = useState([{ type: "", url: "" }]);
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);

    // Estado para foto de perfil
    const [personalPhoto, setPersonalPhoto] = useState(null);

    // Handler para subir la imagen
    const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => setPersonalPhoto(reader.result);
      reader.readAsDataURL(file);
    };
  

  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
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
    setExperience([...experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
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

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
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
      description: 
      "Enfoque visual único con elementos destacados, ideal para diseñadores o artistas.",
    },
  ];

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
  };

  const allSkills = [
    "Comunicación efectiva", "Resolución de problemas", 
    "Trabajo en equipo",
    "Pensamiento crítico", "Gestión del tiempo", 
    "Adaptabilidad", "Creatividad", "Liderazgo",
    "Inglés", "Español", "Francés", "Alemán", 
    "Portugués", "Italiano", "Otros",
    "Microsoft Office", "Google Workspace", 
    "Figma", "Adobe Creative Suite",
    "Trello / Jira", "Slack", "Notion", 
    "Canva",
    "JavaScript", "HTML/CSS", "React", 
    "Node.js", "Python", "SQL / NoSQL",
    "Git / GitHub", "Tailwind CSS", "Docker", 
    "APIs RESTful", "Firebase", "TypeScript",
  ];

  const allHobbies = [
    "Voluntariado", "Lectura", "Viajar", "Deportes", "Idiomas", 
    "Pintura", "Bloquear", "Música", "Escribir"
  ];

  return (
  <div className="min-h-screen bg-gray-100 text-gray-800">
  <header className="bg-white shadow p-6 text-center">
  <h1 className="text-3xl font-bold">AI CV Assistant</h1>
  <p className="text-sm text-gray-500">
    Tu asistente inteligente para crear el currículum perfecto</p>
  </header>
  
  <main className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-1/5 p-0 bg-white">
  <div className="mb-5 px-4">
  <div className="relative flex w-full bg-gray-200
   rounded border-2 border-gray-300">
  <div
  className="absolute top-0 left-0 h-full w-1/2 bg-white 
  rounded transition-transform duration-500 ease-in-out"
  style={{ transform: mode === "cv" ? "translateX(0)" : 
    "translateX(100%)" }}
  />
  <button
  onClick={() => setMode("cv")}
  className={`relative z-10 flex-1 py-2 text-center
     rounded-2xl ${mode === "cv" ? "text-black" : "text-gray-500"}`}
  >
  Crear CV
  </button>
  <button
  onClick={() => setMode("templates")}
  className={`relative z-10 flex-1 py-2 text-center
     rounded-2xl ${mode === "templates" ? "text-black" :
       "text-gray-500"}`}
  >
  Plantillas
  </button>
  </div>
  </div>
        
  <aside>
<nav className="space-y-1">
<ToggleSection title="Datos Personales">
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
</ToggleSection>

<ToggleSection title="Resumen Profesional">
<label className="block text-sm">Resumen</label>
<textarea
name="professionalSummary"
rows="4"
value={personalInfo.professionalSummary}
onChange={handlePersonalInfoChange}
className="w-full border rounded px-2 py-1"
placeholder="Describe tu perfil profesional en pocas líneas..."
/>
</ToggleSection>

<ToggleSection title="Historial Laboral" defaultOpen>
{experience.map((exp, index) => (
<div key={index} className="mt-2 space-y-2">
<input
type="text"
placeholder="Cargo"
value={exp.title}
onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
className="w-full border rounded px-2 py-1"
/>
<input
type="text"
placeholder="Empresa"
value={exp.company}
onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
className="w-full border rounded px-2 py-1"
/>
<div className="flex gap-4">
<div className="w-1/2">
<input
type="date"
value={exp.startDate}
onChange={(e) => handleExperienceChange(index, 'startDate', 
  e.target.value)}
className="w-full border rounded px-2 py-1"
/>
</div>
<div className="w-1/2">
<input
type="date"
value={exp.endDate}
onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
className="w-full border rounded px-2 py-1"
/>
</div>
</div>
<RichTextEditor
value={exp.description}
onChange={(html) => handleExperienceChange(index, 'description', html)}
/>
<button
onClick={() => handleRemoveExperience(index)}
className="text-gray-400 font-bold hover:text-red-800"
>
x
</button>
</div>
))}
<button
onClick={addExperience}
className="mt-2 text-sm text-blue-600 hover:underline"
>
+ Añadir experiencia
</button>
</ToggleSection>

<ToggleSection title="Educación">
{education.map((edu, index) => (
<div key={index} className="mt-2 space-y-2">
<label className="block text-sm">Título</label>
<input
type="text"
value={edu.degree}
onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
className="w-full border rounded px-2 py-1"
/>
<label className="block text-sm">Nombre de la Institución</label>
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
<button
onClick={() => handleRemoveEducation(index)}
className="text-gray-400 font-bold hover:text-red-800"
>
x
</button>
</div>
))}
<button
onClick={addEducation}
className="mt-2 text-sm text-blue-600 hover:underline"
>
+ Añadir educación
</button>
</ToggleSection>

<ToggleSection title="Sitios Web y Redes Sociales">
{socialLinks.map((entry, index) => (
<div key={index} className="flex gap-2 items-center">
<select
value={entry.type}
onChange={(e) => handleSocialLinkChange(index, "type", e.target.value)}
className="w-1/3 border rounded px-2 py-1">
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
</ToggleSection>

<ToggleSection title="Habilidades">
{skills.map((skill, index) => (
<div key={index} className="flex gap-2 items-center">
<select
value={skill}
onChange={(e) => handleSkillChange(index, e.target.value)}
className="w-full border rounded px-2 py-1"
>
<option value="" disabled hidden>Seleccionar habilidad</option>
{allSkills.map((option) => (
<option key={option} value={option}>{option}</option>
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
</ToggleSection>

<ToggleSection title="Pasa Tiempos">
{hobbies.map((hobbie, index) => (
<div key={index} className="flex gap-2 items-center">
<select
value={hobbie}
onChange={(e) => handleHobbieChange(index, e.target.value)}
className="w-full border rounded px-2 py-1"
>
<option value="" disabled hidden>Seleccionar Hobbie</option>
{allHobbies.map((option) => (
<option key={option} value={option}>{option}</option>
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
</ToggleSection>
</nav>
</aside>
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
 className={`relative group bg-white rounded-2xl shadow
   p-4 text-center cursor-pointer transform transition-transform 
   duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 ${
 selectedTemplate === template.id ? 'ring-2 ring-blue-600' : ''
 }`}>
 <h3 className="font-semibold mb-2">{template.title}</h3>
 <span className="absolute bottom-full left-1/2 transform
  -translate-x-1/2 mb-2 w-48 px-3 py-2 text-sm bg-gray-700
   text-white rounded opacity-0 group-hover:opacity-100 
   transition-opacity duration-200 pointer-events-none">
 {template.description}
 </span>
 </div>
 ))}
 </div>
 </div>
 )}

 <div className="ml-16">
 <h2 className="text-xl
  font-bold mb-4">{/*Vista previa del CV*/}</h2>
 <div className="bg-white border p-6 
 rounded shadow ml-4" style={{ 
  width: '794px', height: '1123px', 
  overflowY: 'auto' }}
>
  
 {mode === "cv" ? (
  <div className="max-w-4xl mx-auto">
 {/* Header: foto y datos */}
 <div className="flex items-center gap-6 mb-8">
 {/* Bloque interactivo de foto */}
 <div className="relative w-32 h-32 rounded-full 
 overflow-hidden bg-gray-200 flex items-center 
 justify-center group cursor-pointer">
 {personalPhoto ? (
 <img
 src={personalPhoto}
 alt="Foto de perfil"
 className="w-full h-full object-cover"
 />
 ) : (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-10 w-10 text-gray-500
  group-hover:text-gray-700"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M3 7h4l3-3h4l3 3h4v12H3V7z"
 />
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M12 11v6m3-3H9"
 />
 </svg>
 )}
 <div className="absolute inset-0
  bg-black bg-opacity-25 flex items-center 
  justify-center opacity-0 group-hover:opacity-100 
  transition-opacity duration-200">
 <svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-8 w-8 text-white"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M3 8l4-4h10l4 4v12H3V8z"
 />
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M12 11a4 4 0 100 8 4 4 0 000-8z"
 />
 </svg>
</div>
<input
type="file"
accept="image/*"
className="absolute inset-0 opacity-0 cursor-pointer"
onClick={(e) => { e.target.value = null }}
onChange={handlePhotoUpload}
/>
</div>

{/* Nombre y Título */}
<div>
<h1 className="text-4xl font-bold">
{personalInfo.fullName || "Tu Nombre"}
</h1>
 <p className="text-wrap text-gray-700">
{personalInfo.title || "Tu Título Profesional"}
</p>
</div>
</div>

{/* Grid principal reorder */}
<div className="grid grid-cols-3 gap-8">
{/* 1. Educación */}
<div className="col-span-1">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-9">
Educación
</h2>
{education.map((edu, index) => (
<div key={index} className="mb-4">
<p className="font-medium">{edu.degree}</p>
<p className="text-gray-600">{edu.university}</p>
<p className="text-sm text-gray-500">{edu.years}</p>
</div>
))}
</div>

{/* 2. Perfil */}
<div className="col-span-2">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-8">
Perfil
</h2>
{personalInfo.professionalSummary && (
<p className="text-gray-700 whitespace-pre-line">
{DOMPurify.sanitize(personalInfo.professionalSummary)}
</p>
)}
</div>

{/* 3. Contacto */}
<div className="col-span-1">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-9">
Contacto
</h2>
<div className="space-y-1">
<p>{personalInfo.email}</p>
<p>{personalInfo.phone}</p>
</div>
</div>

{/* 4. Experiencia */}
<div className="col-span-2">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-10">
Experiencia
</h2>
{experience.map((exp, index) => (
<div key={index} className="mb-6">
<h3 className="font-semibold">{exp.title}</h3>
<p className="text-gray-600">{exp.company}</p>
<p className="text-sm text-gray-500">
{exp.startDate} - {exp.endDate || "Presente"}
</p>
<div
className="text-sm"
dangerouslySetInnerHTML={{
__html: DOMPurify.sanitize(exp.description),
}}
/>
</div>
))}
</div>

{/* 5. Habilidades */}
<div className="col-span-1">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-8">
Habilidades
</h2>
<div className="space-y-1">
{skills.map((skill, index) => (
<p key={index}>{skill}</p>
))}
</div>
</div>

{/* 6. Pasatiempos */}
<div className="col-span-2">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-12">
Pasatiempos
</h2>
<div className="space-y-1">
{hobbies.map((hobby, index) => (
<p key={index}>{hobby}</p>
))}
</div>
</div>

{/* 7. Enlaces */}
<div className="col-span-3">
<h2 className="text-lg font-semibold border-b-2
 border-blue-600 pb-2 mb-3 w-9">
Enlaces
</h2>
<div className="space-y-2">
{socialLinks.map((link, index) =>
link.type && link.url ? (
<p key={index}>
<span className="font-medium">{link.type}:</span> {link.url}
</p>
) : null
)}
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
  <p className="text-gray-500">
    Selecciona una plantilla para ver la vista previa
  </p>
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