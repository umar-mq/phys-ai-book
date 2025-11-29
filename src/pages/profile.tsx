import React, { useContext } from 'react';
import Layout from '@theme/Layout';
import { PersonalizationContext } from '../contexts/PersonalizationProvider';

function ProfilePage() {
  const { experienceLevel, setExperienceLevel, language, setLanguage } = useContext(PersonalizationContext);

  // TODO: Replace with actual user data from better-auth context
  const user = {
    name: 'Test User',
    email: 'test@example.com',
  };

  return (
    <Layout title="User Profile">
      <div className="container margin-vert--lg">
        <h1>User Profile</h1>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <hr />
        <h2>Preferences</h2>
        <div>
          <h3>Experience Level: {experienceLevel}</h3>
          <div>
            <button
              className={`button ${experienceLevel === 'Novice' ? 'button--primary' : 'button--secondary'} margin-right--sm`}
              onClick={() => setExperienceLevel('Novice')}
            >
              Novice
            </button>
            <button
              className={`button ${experienceLevel === 'Professional' ? 'button--primary' : 'button--secondary'}`}
              onClick={() => setExperienceLevel('Professional')}
            >
              Professional
            </button>
          </div>
        </div>
        <div className="margin-top--lg">
          <h3>Language: {language}</h3>
          <div>
            <button
              className={`button ${language === 'English' ? 'button--primary' : 'button--secondary'} margin-right--sm`}
              onClick={() => setLanguage('English')}
            >
              English
            </button>
            <button
              className={`button ${language === 'Urdu' ? 'button--primary' : 'button--secondary'}`}
              onClick={() => setLanguage('Urdu')}
            >
              Urdu
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
