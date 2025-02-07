import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              With over 5 years of experience in web development, I specialize in creating
              responsive and user-friendly applications. My passion lies in solving complex
              problems and turning ideas into reality through clean and efficient code.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me exploring new technologies, contributing
              to open-source projects, or sharing my knowledge through technical writing
              and mentoring.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}