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
          <p><strong>Experience Level:</strong> {personalization.experienceLevel}</p>
          <p><strong>Language:</strong> {personalization.language}</p>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
