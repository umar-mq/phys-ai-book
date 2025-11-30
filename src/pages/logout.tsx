import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

export default function Logout() {
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      history.push('/phys-ai-book/');
    };
    doLogout();
  }, [logout, history]);

  return (
    <Layout title="Logging out...">
      <div className="container margin-vert--lg text-center">
        <p>Signing you out...</p>
      </div>
    </Layout>
  );
}
