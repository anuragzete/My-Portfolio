import React from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form>
            <div className="grid gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
              <textarea
                placeholder="Message"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}