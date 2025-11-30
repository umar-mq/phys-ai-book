import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-white dark:bg-[#0f172a]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] animate-bounce-slow" />

      <div className="container relative z-10 text-center px-4">
        <div className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
          <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm tracking-wide uppercase">
            The Future of Learning
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          {siteConfig.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          An adaptive, AI-native textbook that evolves with you. 
          Experience personalized content, interactive chat, and a new way to master Physical AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="button button--primary button--lg px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
            to="/signup">
            Start Your Journey
          </Link>
          <Link
            className="button button--lg px-8 py-4 text-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
            to="/phys-ai-book/docs/module-1/intro-physical-ai-setup">
            Explore Content
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
          <FeatureCard 
            icon="🧠" 
            title="Adaptive Learning" 
            description="Content that adjusts to your expertise level, from Novice to Professional." 
          />
          <FeatureCard 
            icon="💬" 
            title="AI Tutor" 
            description="An integrated RAG chatbot that answers your questions instantly using course material." 
          />
          <FeatureCard 
            icon="🌍" 
            title="Bilingual Support" 
            description="Seamlessly switch between English and Urdu to learn in your preferred language." 
          />
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="AI-Native Textbook for Physical AI">
      <HomepageHeader />
    </Layout>
  );
}
