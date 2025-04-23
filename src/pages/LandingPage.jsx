import React from "react";
import template1 from "../assets/template1.png";
import template2 from "../assets/template2.png";
import template3 from "../assets/template3.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-[#182848] to-[#4b6cb7] text-white text-center py-10 mt-5">
        <h1 className="text-4xl font-bold">AI CV Assistant</h1>
        <p className="mt-2 text-lg">Tu asistente inteligente para crear el currículum perfecto</p>
      </header>

      <main className="p-8">
        <section className="cta text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2">¿Necesitas ayuda con tu currículum?</h2>
          <p className="mb-4">Usa nuestra IA para generar, revisar y mejorar tu CV en minutos.</p>
          <a href="/asistente">
            <button className="bg-[#4b6cb7] text-white px-6 py-3 rounded-lg hover:bg-[#3553a5] transition">
              Probar el Asistente
            </button>
          </a>
        </section>

        <section className="templates text-center mb-12 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Plantillas Profesionales</h2>
          <div className="template-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[{
              img: template1,
              title: "Clásico Profesional",
              link: "/plantilla-clasica"
            }, {
              img: template2,
              title: "Moderno Elegante",
              link: "/plantilla-moderna"
            }, {
              img: template3,
              title: "Creativo Minimalista",
              link: "/plantilla-minimalista"
            }].map((template, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-2 transition cursor-pointer text-center">
                <img src={template.img} alt={template.title} className="mx-auto mb-4" />
                <p className="mb-2">{template.title}</p>
                <a href={template.link}>
                  <button className="bg-[#182848] text-white px-5 py-2 rounded-md hover:bg-[#0f1730] transition">
                    Ver Plantilla
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        <p>&copy; 2025 AI CV Assistant. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
