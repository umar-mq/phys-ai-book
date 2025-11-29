import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import PersonalizationBar from '@site/src/components/PersonalizationBar';

export default function LayoutWrapper(props: any): JSX.Element {
  return (
    <>
      <PersonalizationBar />
      <Layout {...props} />
    </>
  );
}
