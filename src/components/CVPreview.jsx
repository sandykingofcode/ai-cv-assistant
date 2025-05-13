
import React from "react";

const CVPreview = ({
  personalInfo,
  experience,
  education,
  skills,
  hobbies,
  socialLinks,
  personalPhoto,
  selectedTemplate,
}) => {
const TemplateWrapper = ({ children }) => {
switch (selectedTemplate) {
case 1:
return (
<div className="bg-white text-black p-6 border border-gray-300 rounded-md shadow-sm font-serif">
{children}
</div>
);
case 2:
return (
<div className="bg-gray-100 text-gray-800 p-6 rounded-xl shadow-lg font-sans">
{children}
</div>
);
case 3:
return (
<div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-0 rounded-2xl shadow-2xl font-mono">
{children}
</div>
);
default:
return <div className="p-6">{children}</div>;
}
};

const Title = ({ children }) => (
<h2 className="text-lg font-bold border-b border-current mt-4 mb-2">{children}</h2>
);

const renderHeader = () => {
switch (selectedTemplate) {
case 1:
return (
<div className="flex flex-col items-center mb-4">
{personalPhoto && (
<img src={personalPhoto} alt="Foto" className="w-24 h-24 rounded-full mb-2 object-cover" />
)}
<h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
<p>{personalInfo.title}</p>
<p className="text-sm">{personalInfo.email} | {personalInfo.phone}</p>
</div>
);
case 2:
return (
<div className="flex items-center gap-4 mb-4">
{personalPhoto && (
<img src={personalPhoto} alt="Foto" className="w-28 h-28 rounded-full object-cover" />
)}
<div>
<h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
<p>{personalInfo.title}</p>
<p className="text-sm">{personalInfo.email} | {personalInfo.phone}</p>
</div>
</div>
);
case 3:
return (
<div className="flex items-center bg-black/30 px-8 py-6 rounded-t-2xl gap-6">
{personalPhoto && (
<img src={personalPhoto} alt="Foto" className="w-32 h-32 rounded-full border-4 border-white object-cover" />
)}
<div>
<h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
<p className="text-lg">{personalInfo.title}</p>
<p className="text-sm">{personalInfo.email} | {personalInfo.phone}</p>
</div>
</div>
);
default:
return null;
}
};

return (
<TemplateWrapper>
{renderHeader()}

{personalInfo.professionalSummary && (
<div className={selectedTemplate === 3 ? "px-8 pt-4" : ""}>
<Title>Resumen Profesional</Title>
<p>{personalInfo.professionalSummary}</p>
</div>
)}

{experience.length > 0 && (
<div className={selectedTemplate === 3 ? "px-8 pt-4" : ""}>
<Title>Experiencia</Title>
{experience.map((exp, i) => (
<div key={i} className="mb-2">
<p className="font-semibold">{exp.title} - {exp.company}</p>
<p className="text-sm italic">{exp.startDate} a {exp.endDate}</p>
<p>{exp.description}</p>
</div>
))}
</div>
)}

{education.length > 0 && (
<div className={selectedTemplate === 3 ? "px-8 pt-4" : ""}>
<Title>Educación</Title>
{education.map((edu, i) => (
<div key={i} className="mb-2">
<p className="font-semibold">
{edu.degree} – {edu.university}
</p>
<p className="text-sm italic">{edu.years}</p>
</div>
))}
</div>
)}

{skills.length > 0 && (
<div className={selectedTemplate === 3 ? "px-8 pt-4" : ""}>
<Title>Habilidades</Title>
<ul className="list-disc list-inside grid grid-cols-2 gap-1">
{skills.map((skill, i) => (
<li key={i}>{skill}</li>
))}
</ul>
</div>
)}

{hobbies.length > 0 && (
<div className={selectedTemplate === 3 ? "px-8 pt-4" : ""}>
<Title>Pasatiempos</Title>
<p>{hobbies.join(", ")}</p>
</div>
)}

{socialLinks.length > 0 && (
<div className={selectedTemplate === 3 ? "px-8 pt-4 pb-6" : ""}>
<Title>Redes y Sitios Web</Title>
<ul className="list-inside">
{socialLinks.map((link, i) =>
 link.type && link.url ? (
<li key={i}>
<a
href={link.url}
target="_blank"
rel="noopener noreferrer"
className="underline"
>
{link.type}
</a>
</li>
) : null
)}
</ul>
</div>
)}
</TemplateWrapper>
);
};

export default CVPreview;
