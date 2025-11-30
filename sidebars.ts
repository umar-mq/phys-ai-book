import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Module 1',
      items: ['module-1/intro'],
    },
    {
      type: 'category',
      label: 'Module 2',
      items: ['module-2/intro'],
    },
    {
      type: 'category',
      label: 'Module 3',
      items: ['module-3/intro'],
    },
    {
      type: 'category',
      label: 'Module 4',
      items: ['module-4/intro'],
    },
    {
      type: 'category',
      label: 'Capstone',
      items: ['capstone/intro'],
    },
  ],
};

export default sidebars;
