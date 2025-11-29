import React from 'react';
import Layout from '@theme/Layout';

function ProfilePage() {
  // TODO: Replace with actual user data from better-auth context
  const user = {
    name: 'Test User',
    email: 'test@example.com',
  };

  // TODO: Replace with actual personalization data from PersonalizationContext
  const personalization = {
    experienceLevel: 'Novice',
    language: 'English',
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
          <h3>Experience Level</h3>
          <div>
            <button className="button button--primary margin-right--sm">Novice</button>
            <button className="button button--secondary">Professional</button>
          </div>
        </div>
        <div className="margin-top--lg">
          <h3>Language</h3>
          <div>
            <button className="button button--primary margin-right--sm">English</button>
            <button className="button button--secondary">Urdu</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
