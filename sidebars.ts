import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System',
      items: [
        'module-1/intro-physical-ai-setup',
        'module-1/ros2-architecture-nodes',
        'module-1/communication-topics',
        'module-1/services-and-actions',
        'module-1/python-packages-rclpy',
        'module-1/launch-files-parameters',
        'module-1/urdf-robot-description',
        'module-1/tf2-transforms-kinematics',
        'module-1/module-1-capstone',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin',
      items: [
        'module-2/gazebo-fundamentals',
        'module-2/physics-properties-collisions',
        'module-2/simulating-sensors-lidar-imu',
        'module-2/visual-rendering-unity',
        'module-2/unity-ros2-bridge',
        'module-2/creating-environments',
        'module-2/sdf-format-mastery',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain',
      items: [
        'module-3/isaac-sim-overview',
        'module-3/usd-file-format',
        'module-3/isaac-ros-vslam',
        'module-3/nav2-navigation-stack',
        'module-3/synthetic-data-generation',
        'module-3/sim-to-real-transfer',
        'module-3/reinforcement-learning-basics',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action',
      items: [
        'module-4/vla-introduction',
        'module-4/whisper-voice-integration',
        'module-4/llm-cognitive-planning',
        'module-4/langchain-for-robotics',
        'module-4/multimodal-inputs',
        'module-4/final-capstone-autonomous-humanoid',
      ],
    },
    {
      type: 'category',
      label: 'Course Capstone',
      items: ['capstone/intro'],
    },
    {
      type: 'doc',
      label: 'Final Assessment',
      id: 'capstone/quiz', 
    },
  ],
};

export default sidebars;