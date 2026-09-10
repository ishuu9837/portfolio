export interface ProjectLink {
  type: 'github' | 'live' | 'paper' | 'demo';
  url: string;
}

export interface Project {
  id: string;
  number: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  technologies: string[];
  status: 'COMPLETED' | 'ACTIVE' | 'RESEARCH' | 'PUBLISHED';
  image?: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 'multimodal',
    number: '00',
    titleKey: 'items.multimodal.title',
    categoryKey: 'items.multimodal.category',
    descriptionKey: 'items.multimodal.description',
    technologies: ['Multimodal AI', 'Cross-Domain', 'Research'],
    status: 'ACTIVE',
  },
  {
    id: 'image-colorization',
    number: '01',
    titleKey: 'items.imageColorization.title',
    categoryKey: 'items.imageColorization.category',
    descriptionKey: 'items.imageColorization.description',
    technologies: ['U-Net', 'LAB Color Space', 'Perceptual Loss', 'CIFAR-10', 'TensorFlow', 'Python'],
    status: 'RESEARCH',
    links: [
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'abnormal-learning',
    number: '02',
    titleKey: 'items.abnormalLearning.title',
    categoryKey: 'items.abnormalLearning.category',
    descriptionKey: 'items.abnormalLearning.description',
    technologies: ['Autoencoders', 'Anomaly Detection', 'Deep Learning', 'Python'],
    status: 'RESEARCH',
    links: [
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'smart-energy',
    number: '03',
    titleKey: 'items.smartEnergy.title',
    categoryKey: 'items.smartEnergy.category',
    descriptionKey: 'items.smartEnergy.description',
    technologies: ['LSTM-Transformer', 'MARL', 'IoT', 'Time Series', 'Power Systems'],
    status: 'RESEARCH',
    links: [
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'heart-disease',
    number: '04',
    titleKey: 'items.heartDisease.title',
    categoryKey: 'items.heartDisease.category',
    descriptionKey: 'items.heartDisease.description',
    technologies: ['DNN', 'Dropout Regularization', 'SHAP', 'Medical AI', 'Scikit-learn'],
    status: 'COMPLETED',
    links: [
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'face-detection',
    number: '05',
    titleKey: 'items.faceDetection.title',
    categoryKey: 'items.faceDetection.category',
    descriptionKey: 'items.faceDetection.description',
    technologies: ['OpenCV', 'Computer Vision', 'Python', 'ResearchGate Published'],
    status: 'PUBLISHED',
    links: [
      { type: 'paper', url: 'https://www.researchgate.net' },
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'netflix',
    number: '06',
    titleKey: 'items.netflix.title',
    categoryKey: 'items.netflix.category',
    descriptionKey: 'items.netflix.description',
    technologies: ['Cosine Similarity', 'Recommendation Systems', 'JavaScript', 'Vercel'],
    status: 'COMPLETED',
    links: [
      { type: 'live', url: 'https://netflix-clone.vercel.app' },
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'galaxy-glide',
    number: '07',
    titleKey: 'items.galaxyGlide.title',
    categoryKey: 'items.galaxyGlide.category',
    descriptionKey: 'items.galaxyGlide.description',
    technologies: ['TypeScript', 'HTML', 'CSS', '3D Graphics'],
    status: 'COMPLETED',
    links: [
      { type: 'live', url: 'https://galaxy-glide.vercel.app' },
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
  {
    id: 'ann-digit',
    number: '08',
    titleKey: 'items.annDigit.title',
    categoryKey: 'items.annDigit.category',
    descriptionKey: 'items.annDigit.description',
    technologies: ['TensorFlow', 'Keras', 'MNIST', 'BatchNorm', 'Regularization'],
    status: 'COMPLETED',
    links: [
      { type: 'github', url: 'https://github.com/ishuu9837' }
    ]
  },
];

export const activeProject = projects[0];
export const completedProjects = projects.slice(1);
