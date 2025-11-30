import React, { useContext } from 'react';
import Layout from '@theme/Layout';
import { PersonalizationContext } from '../contexts/PersonalizationProvider';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from '@docusaurus/router';

function ProfilePage() {
  const { experienceLevel, setExperienceLevel, language, setLanguage } = useContext(PersonalizationContext);
  const { user, loading, logout } = useAuth();
  const history = useHistory();

  if (loading) {
    return (
      <Layout title="User Profile">
        <div className="container margin-vert--lg">
          <div className="flex justify-center items-center h-64">
             <div className="text-xl font-bold animate-pulse">Loading Profile...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    // Redirect to login or show message
    return (
      <Layout title="Access Denied">
        <div className="container margin-vert--lg text-center">
          <h1>Please Log In</h1>
          <p>You need to be logged in to view your profile.</p>
          <button 
            className="button button--primary button--lg"
            onClick={() => history.push('/login')}
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="User Profile">
      <div className="container margin-vert--lg max-w-4xl mx-auto">
        <div className="card shadow--md p-8 bg-white dark:bg-gray-800 rounded-lg">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <h2 className="text-2xl font-bold mb-6 text-primary">Learning Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience Level */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Experience Level</h3>
              <p className="text-sm text-gray-500 mb-4">Adjusts the complexity of technical explanations.</p>
              <div className="button-group button-group--block">
                <button
                  className={`button ${experienceLevel === 'Novice' ? 'button--primary' : 'button--outline button--secondary'}`}
                  onClick={() => setExperienceLevel('Novice')}
                >
                  Novice
                </button>
                <button
                  className={`button ${experienceLevel === 'Professional' ? 'button--primary' : 'button--outline button--secondary'}`}
                  onClick={() => setExperienceLevel('Professional')}
                >
                  Professional
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Language</h3>
              <p className="text-sm text-gray-500 mb-4">Preferred language for content delivery.</p>
              <div className="button-group button-group--block">
                <button
                  className={`button ${language === 'English' ? 'button--primary' : 'button--outline button--secondary'}`}
                  onClick={() => setLanguage('English')}
                >
                  English
                </button>
                <button
                  className={`button ${language === 'Urdu' ? 'button--primary' : 'button--outline button--secondary'}`}
                  onClick={() => setLanguage('Urdu')}
                >
                  Urdu
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-right">
            <button className="button button--danger button--outline" onClick={logout}>
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;