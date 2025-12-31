export type Language = 'en' | 'sw';

export interface Translations {
  // Navigation
  home: string;
  about: string;
  services: string;
  contact: string;
  login: string;
  register: string;
  dashboard: string;
  logout: string;
  
  // Common
  welcome: string;
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  submit: string;
  back: string;
  next: string;
  previous: string;
  
  // Auth
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  forgotPassword: string;
  rememberMe: string;
  signIn: string;
  signUp: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  
  // Admin
  adminPanel: string;
  admin: string;
  users: string;
  content: string;
  totalUsers: string;
  activeContent: string;
  reportsGenerated: string;
  systemStatus: string;
  online: string;
  quickActions: string;
  viewReports: string;
  addNewUser: string;
  searchUsers: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
  actions: string;
  active: string;
  inactive: string;
  suspended: string;
  moderator: string;
  noUsersFound: string;
  page: string;
  of: string;
  
  // Dashboard
  userDashboard: string;
  adminDashboard: string;
  manageUsers: string;
  manageContent: string;
  reports: string;
  myProfile: string;
  availableServices: string;
  activity: string;
  personalInformation: string;
  editProfile: string;
  saveChanges: string;
  profileUpdated: string;
  profileUpdatedDesc: string;
  viewDetails: string;
  recentActivity: string;
  
  // Messages
  loginSuccess: string;
  loginError: string;
  registrationSuccess: string;
  registrationError: string;
  
  // Agriculture specific
  agriculture: string;
  farming: string;
  crops: string;
  livestock: string;
  irrigation: string;
  harvest: string;
  seeds: string;
  fertilizer: string;
  pesticides: string;
  weather: string;
  
  // Footer/Contact
  phone: string;
  address: string;
  followUs: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStartedFree: string;
  learnMore: string;
  activeUsers: string;
  regionsCovered: string;
  verifiedInputs: string;
  tanzaniaNetwork: string;
  
  // Services
  ourServices: string;
  extensionServices: string;
  extensionServicesDesc: string;
  inputSupply: string;
  inputSupplyDesc: string;
  marketAccess: string;
  marketAccessDesc: string;
  comprehensiveAgriSolutions: string;
  servicesHeroDesc: string;
  agriculturalCalculations: string;
  realTimeInformation: string;
  expertAdvice: string;
  verifiedSuppliers: string;
  networkConnection: string;
  analyticsDashboard: string;
  readyToGetStarted: string;
  joinAdinasToday: string;
  createYourAccount: string;
  
  // About
  aboutUs: string;
  ourMission: string;
  ourVision: string;
  ourStory: string;
  ourValues: string;
  mission: string;
  vision: string;
  community: string;
  excellence: string;
  missionDesc: string;
  visionDesc: string;
  communityDesc: string;
  excellenceDesc: string;
  aboutHeroTitle: string;
  aboutHeroDesc: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  aboutStoryP3: string;
  
  // Contact
  getInTouch: string;
  sendMessage: string;
  fullName: string;
  message: string;
  contactUs: string;
  contactInformation: string;
  reachOutToUs: string;
  businessHours: string;
  sendUsAMessage: string;
  messageSent: string;
  getBackToYou: string;
  sending: string;
  
  // Footer
  quickLinks: string;
  contactInfo: string;
  socialMedia: string;
  allRightsReserved: string;
  
  // CTA Section
  joinAgriculturalRevolution: string;
  readyToTransform: string;
  joinThousands: string;
  createFreeAccount: string;
  contactSales: string;
  
  // About Preview
  aboutAdinas: string;
  transformingTanzaniaAgriculture: string;
  adinasDescription: string;
  connectWithVerifiedSuppliers: string;
  accessExpertAdvice: string;
  realTimeMarketPrices: string;
  comprehensiveFarmTools: string;
  learnMoreAboutUs: string;
  
  // Errors
  pageNotFound: string;
  somethingWentWrong: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    
    // Common
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Admin
    adminPanel: 'Admin Panel',
    admin: 'Admin',
    users: 'Users',
    content: 'Content',
    totalUsers: 'Total Users',
    activeContent: 'Active Content',
    reportsGenerated: 'Reports Generated',
    systemStatus: 'System Status',
    online: 'Online',
    quickActions: 'Quick Actions',
    viewReports: 'View Reports',
    addNewUser: 'Add New User',
    searchUsers: 'Search users...',
    name: 'Name',
    role: 'Role',
    status: 'Status',
    lastLogin: 'Last Login',
    actions: 'Actions',
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    moderator: 'Moderator',
    noUsersFound: 'No users found',
    page: 'Page',
    of: 'of',
    
    // Dashboard
    userDashboard: 'User Dashboard',
    adminDashboard: 'Admin Dashboard',
    manageUsers: 'Manage Users',
    manageContent: 'Manage Content',
    reports: 'Reports',
    myProfile: 'My Profile',
    availableServices: 'Available Services',
    activity: 'Activity',
    personalInformation: 'Personal Information',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile updated',
    profileUpdatedDesc: 'Your profile has been updated successfully.',
    viewDetails: 'View Details',
    recentActivity: 'Recent Activity',
    
    // Messages
    loginSuccess: 'Login successful!',
    loginError: 'Login failed. Please check your credentials.',
    registrationSuccess: 'Registration successful!',
    registrationError: 'Registration failed. Please try again.',
    
    // Agriculture specific
    agriculture: 'Agriculture',
    farming: 'Farming',
    crops: 'Crops',
    livestock: 'Livestock',
    irrigation: 'Irrigation',
    harvest: 'Harvest',
    seeds: 'Seeds',
    fertilizer: 'Fertilizer',
    pesticides: 'Pesticides',
    weather: 'Weather',
    
    // Footer/Contact
    phone: 'Phone',
    address: 'Address',
    followUs: 'Follow Us',
    
    // Hero Section
    heroTitle: 'Connecting',
    heroSubtitle: 'Agriculture',
    heroDescription: 'ADINAS connects extension officers, agri dealers, and agri companies in one powerful system. Access real-time information, expert advice, and verified agricultural inputs to boost productivity.',
    getStartedFree: 'Get Started Free',
    learnMore: 'Learn More',
    activeUsers: 'Active Users',
    regionsCovered: 'Regions Covered',
    verifiedInputs: 'Verified Inputs',
    tanzaniaNetwork: "Tanzania's Agricultural Network",
    
    // Services
    ourServices: 'Our Services',
    extensionServices: 'Extension Services',
    extensionServicesDesc: 'Connect with certified extension officers for expert agricultural advice and guidance.',
    inputSupply: 'Input Supply',
    inputSupplyDesc: 'Access verified agricultural inputs from trusted dealers and suppliers.',
    marketAccess: 'Market Access',
    marketAccessDesc: 'Connect directly with buyers and access market information for better prices.',
    comprehensiveAgriSolutions: 'Comprehensive Agricultural Solutions',
    servicesHeroDesc: 'Discover the tools and resources designed to help you succeed in Tanzania\'s agricultural sector.',
    agriculturalCalculations: 'Agricultural Calculations',
    realTimeInformation: 'Real-time Information',
    expertAdvice: 'Expert Advice',
    verifiedSuppliers: 'Verified Suppliers',
    networkConnection: 'Network Connection',
    analyticsDashboard: 'Analytics Dashboard',
    readyToGetStarted: 'Ready to Get Started?',
    joinAdinasToday: 'Join ADINAS today and access all these powerful features to grow your agricultural business.',
    createYourAccount: 'Create Your Account',
    
    // About
    aboutUs: 'About Us',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourStory: 'Our Story',
    ourValues: 'Our Values',
    mission: 'Mission',
    vision: 'Vision',
    community: 'Community',
    excellence: 'Excellence',
    missionDesc: 'To empower Tanzania\'s agricultural community with digital tools that improve productivity, enhance access to information, and foster meaningful connections across the value chain.',
    visionDesc: 'To be the leading agricultural digital platform in East Africa, driving innovation and sustainability in farming practices while creating prosperity for all stakeholders.',
    communityDesc: 'Building a network of farmers, extension officers, dealers, and companies who collaborate, share knowledge, and grow together for mutual benefit.',
    excellenceDesc: 'Committed to delivering high-quality services, verified products, and expert advice that our users can trust and rely upon for their agricultural success.',
    aboutHeroTitle: 'Building the Future of Agriculture in Tanzania',
    aboutHeroDesc: 'ADINAS connects extension officers, agri dealers, and agri companies in one unified system, revolutionizing how agricultural information flows and business is conducted.',
    aboutStoryP1: 'ADINAS was born from a simple observation: Tanzania\'s agricultural sector, despite its immense potential, faced significant challenges in information access, collaboration, and connecting with verified suppliers.',
    aboutStoryP2: 'Farmers struggled to get timely advice, dealers found it hard to reach their customers, and extension officers lacked the tools to effectively serve their communities. We saw an opportunity to create a digital bridge that would unite these stakeholders.',
    aboutStoryP3: 'Today, ADINAS serves thousands of users across Tanzania, providing real-time agricultural information, expert advice, calculation tools, and direct connections to verified suppliers of agricultural inputs.',
    
    // Contact
    getInTouch: 'Get in Touch',
    sendMessage: 'Send Message',
    fullName: 'Full Name',
    message: 'Message',
    contactUs: 'Contact Us',
    contactInformation: 'Contact Information',
    reachOutToUs: 'Reach out to us through any of these channels. We typically respond within 24 hours.',
    businessHours: 'Business Hours',
    sendUsAMessage: 'Send Us a Message',
    messageSent: 'Message Sent!',
    getBackToYou: 'We\'ll get back to you as soon as possible.',
    sending: 'Sending...',
    
    // Footer
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    socialMedia: 'Social Media',
    allRightsReserved: 'All rights reserved',
    
    // CTA Section
    joinAgriculturalRevolution: 'Join the Agricultural Revolution',
    readyToTransform: 'Ready to Transform Your Agricultural Business?',
    joinThousands: 'Join thousands of farmers, dealers, and companies already using ADINAS to improve their productivity and connect with the right partners.',
    createFreeAccount: 'Create Free Account',
    contactSales: 'Contact Sales',
    
    // About Preview
    aboutAdinas: 'About ADINAS',
    transformingTanzaniaAgriculture: 'Transforming Tanzania\'s Agricultural Ecosystem',
    adinasDescription: 'ADINAS is a comprehensive digital platform designed to bridge the gap between farmers, extension officers, agri dealers, and agricultural companies across Tanzania. Our mission is to improve productivity, enhance information access, and foster collaboration throughout the agricultural value chain.',
    connectWithVerifiedSuppliers: 'Connect with verified agricultural suppliers',
    accessExpertAdvice: 'Access expert advice from extension officers',
    realTimeMarketPrices: 'Real-time market prices and weather updates',
    comprehensiveFarmTools: 'Comprehensive farm management tools',
    learnMoreAboutUs: 'Learn More About Us',
    
    // Errors
    pageNotFound: 'Page Not Found',
    somethingWentWrong: 'Something went wrong',
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    about: 'Kuhusu',
    services: 'Huduma',
    contact: 'Mawasiliano',
    login: 'Ingia',
    register: 'Jisajili',
    dashboard: 'Dashibodi',
    logout: 'Toka',
    
    // Common
    welcome: 'Karibu',
    loading: 'Inapakia...',
    error: 'Hitilafu',
    success: 'Mafanikio',
    cancel: 'Ghairi',
    save: 'Hifadhi',
    delete: 'Futa',
    edit: 'Hariri',
    submit: 'Wasilisha',
    back: 'Rudi',
    next: 'Ifuatayo',
    previous: 'Iliyotangulia',
    
    // Auth
    email: 'Barua Pepe',
    password: 'Nenosiri',
    confirmPassword: 'Thibitisha Nenosiri',
    firstName: 'Jina la Kwanza',
    lastName: 'Jina la Mwisho',
    forgotPassword: 'Umesahau Nenosiri?',
    rememberMe: 'Nikumbuke',
    signIn: 'Ingia',
    signUp: 'Jisajili',
    createAccount: 'Unda Akaunti',
    alreadyHaveAccount: 'Una akaunti tayari?',
    dontHaveAccount: 'Huna akaunti?',
    
    // Admin
    adminPanel: 'Paneli ya Msimamizi',
    admin: 'Msimamizi',
    users: 'Watumiaji',
    content: 'Maudhui',
    totalUsers: 'Jumla ya Watumiaji',
    activeContent: 'Maudhui Yanayotumika',
    reportsGenerated: 'Ripoti Zilizoundwa',
    systemStatus: 'Hali ya Mfumo',
    online: 'Mtandaoni',
    quickActions: 'Vitendo vya Haraka',
    viewReports: 'Ona Ripoti',
    addNewUser: 'Ongeza Mtumiaji Mpya',
    searchUsers: 'Tafuta watumiaji...',
    name: 'Jina',
    role: 'Jukumu',
    status: 'Hali',
    lastLogin: 'Kuingia Mwisho',
    actions: 'Vitendo',
    active: 'Hai',
    inactive: 'Haijafanya kazi',
    suspended: 'Imesimamishwa',
    moderator: 'Msimamizi',
    noUsersFound: 'Hakuna watumiaji waliopatikana',
    page: 'Ukurasa',
    of: 'wa',
    
    // Dashboard
    userDashboard: 'Dashibodi ya Mtumiaji',
    adminDashboard: 'Dashibodi ya Msimamizi',
    manageUsers: 'Simamia Watumiaji',
    manageContent: 'Simamia Maudhui',
    reports: 'Ripoti',
    myProfile: 'Wasifu Wangu',
    availableServices: 'Huduma Zinazopatikana',
    activity: 'Shughuli',
    personalInformation: 'Maelezo ya Kibinafsi',
    editProfile: 'Hariri Wasifu',
    saveChanges: 'Hifadhi Mabadiliko',
    profileUpdated: 'Wasifu umesasishwa',
    profileUpdatedDesc: 'Wasifu wako umesasishwa kwa mafanikio.',
    viewDetails: 'Ona Maelezo',
    recentActivity: 'Shughuli za Hivi Karibuni',
    
    // Messages
    loginSuccess: 'Umeingia kwa mafanikio!',
    loginError: 'Kuingia kumeshindikana. Tafadhali angalia taarifa zako.',
    registrationSuccess: 'Usajili umefanikiwa!',
    registrationError: 'Usajili umeshindikana. Tafadhali jaribu tena.',
    
    // Agriculture specific
    agriculture: 'Kilimo',
    farming: 'Ukulima',
    crops: 'Mazao',
    livestock: 'Mifugo',
    irrigation: 'Umwagiliaji',
    harvest: 'Mavuno',
    seeds: 'Mbegu',
    fertilizer: 'Mbolea',
    pesticides: 'Dawa za Wadudu',
    weather: 'Hali ya Hewa',
    
    // Footer/Contact
    phone: 'Simu',
    address: 'Anwani',
    followUs: 'Tufuate',
    
    // Hero Section
    heroTitle: 'Kuunganisha',
    heroSubtitle: 'Kilimo',
    heroDescription: 'ADINAS inaunganisha maafisa wa ugani, wachuuzi wa kilimo, na makampuni ya kilimo katika mfumo mmoja wenye nguvu. Pata habari za wakati halisi, ushauri wa kitaalamu, na pembejeo za kilimo zilizothibitishwa ili kuongeza uzalishaji.',
    getStartedFree: 'Anza Bure',
    learnMore: 'Jifunze Zaidi',
    activeUsers: 'Watumiaji Hai',
    regionsCovered: 'Mikoa Iliyofunikwa',
    verifiedInputs: 'Pembejeo Zilizothibitishwa',
    tanzaniaNetwork: 'Mtandao wa Kilimo wa Tanzania',
    
    // Services
    ourServices: 'Huduma Zetu',
    extensionServices: 'Huduma za Ugani',
    extensionServicesDesc: 'Unganisha na maafisa wa ugani waliothibitishwa kwa ushauri wa kitaalamu wa kilimo.',
    inputSupply: 'Usambazaji wa Pembejeo',
    inputSupplyDesc: 'Pata pembejeo za kilimo zilizothibitishwa kutoka kwa wachuuzi na wasambazaji wanaoaminika.',
    marketAccess: 'Upatikanaji wa Soko',
    marketAccessDesc: 'Unganisha moja kwa moja na wanunuzi na upate habari za soko kwa bei bora.',
    comprehensiveAgriSolutions: 'Suluhisho Kamili za Kilimo',
    servicesHeroDesc: 'Gundua zana na rasilimali zilizoundwa kukusaidia kufanikiwa katika sekta ya kilimo ya Tanzania.',
    agriculturalCalculations: 'Mahesabu ya Kilimo',
    realTimeInformation: 'Habari za Wakati Halisi',
    expertAdvice: 'Ushauri wa Kitaalamu',
    verifiedSuppliers: 'Wasambazaji Waliothibitishwa',
    networkConnection: 'Muunganisho wa Mtandao',
    analyticsDashboard: 'Dashibodi ya Uchanganuzi',
    readyToGetStarted: 'Uko Tayari Kuanza?',
    joinAdinasToday: 'Jiunge na ADINAS leo na upate ufikiaji wa vipengele hivi vyote vyenye nguvu ili kukuza biashara yako ya kilimo.',
    createYourAccount: 'Unda Akaunti Yako',
    
    // About
    aboutUs: 'Kuhusu Sisi',
    ourMission: 'Dhamira Yetu',
    ourVision: 'Maono Yetu',
    ourStory: 'Hadithi Yetu',
    ourValues: 'Maadili Yetu',
    mission: 'Dhamira',
    vision: 'Maono',
    community: 'Jumuiya',
    excellence: 'Ubora',
    missionDesc: 'Kuwezesha jumuiya ya kilimo ya Tanzania kwa zana za kidijitali zinazoboresha uzalishaji, kuongeza upatikanaji wa habari, na kukuza uhusiano wenye maana katika mlolongo wa thamani.',
    visionDesc: 'Kuwa jukwaa kuu la kidijitali la kilimo Afrika Mashariki, kuendesha uvumbuzi na uendelevu katika mbinu za kilimo huku tukiunda ustawi kwa wadau wote.',
    communityDesc: 'Kujenga mtandao wa wakulima, maafisa wa ugani, wachuuzi, na makampuni ambao wanashirikiana, kushiriki maarifa, na kukua pamoja kwa faida ya pamoja.',
    excellenceDesc: 'Kujitolea kutoa huduma za hali ya juu, bidhaa zilizothibitishwa, na ushauri wa kitaalamu ambao watumiaji wetu wanaweza kuuamini na kutegemea kwa mafanikio yao ya kilimo.',
    aboutHeroTitle: 'Kujenga Mustakabali wa Kilimo Tanzania',
    aboutHeroDesc: 'ADINAS inaunganisha maafisa wa ugani, wachuuzi wa kilimo, na makampuni ya kilimo katika mfumo mmoja uliounganishwa, kubadilisha jinsi habari za kilimo zinavyotiririka na biashara inavyofanywa.',
    aboutStoryP1: 'ADINAS ilizaliwa kutokana na uchunguzi rahisi: sekta ya kilimo ya Tanzania, licha ya uwezo wake mkubwa, ilikabiliwa na changamoto kubwa katika upatikanaji wa habari, ushirikiano, na kuunganisha na wasambazaji waliothibitishwa.',
    aboutStoryP2: 'Wakulima walipambana kupata ushauri wa wakati, wachuuzi walikuwa na ugumu kuwafikia wateja wao, na maafisa wa ugani walipungukiwa na zana za kuwahudumia jamii zao kwa ufanisi. Tuliona fursa ya kuunda daraja la kidijitali ambalo lingeunganisha wadau hawa.',
    aboutStoryP3: 'Leo, ADINAS inahudumia maelfu ya watumiaji kote Tanzania, ikitoa habari za kilimo za wakati halisi, ushauri wa kitaalamu, zana za kukokotoa, na miunganisho ya moja kwa moja na wasambazaji waliothibitishwa wa pembejeo za kilimo.',
    
    // Contact
    getInTouch: 'Wasiliana Nasi',
    sendMessage: 'Tuma Ujumbe',
    fullName: 'Jina Kamili',
    message: 'Ujumbe',
    contactUs: 'Wasiliana Nasi',
    contactInformation: 'Maelezo ya Mawasiliano',
    reachOutToUs: 'Tufikie kupitia njia yoyote kati ya hizi. Kwa kawaida tunajibu ndani ya masaa 24.',
    businessHours: 'Masaa ya Biashara',
    sendUsAMessage: 'Tutumie Ujumbe',
    messageSent: 'Ujumbe Umetumwa!',
    getBackToYou: 'Tutakujibu haraka iwezekanavyo.',
    sending: 'Inatuma...',
    
    // Footer
    quickLinks: 'Viungo vya Haraka',
    contactInfo: 'Maelezo ya Mawasiliano',
    socialMedia: 'Mitandao ya Kijamii',
    allRightsReserved: 'Haki zote zimehifadhiwa',
    
    // CTA Section
    joinAgriculturalRevolution: 'Jiunge na Mapinduzi ya Kilimo',
    readyToTransform: 'Uko Tayari Kubadilisha Biashara Yako ya Kilimo?',
    joinThousands: 'Jiunge na maelfu ya wakulima, wachuuzi, na makampuni ambayo tayari yanatumia ADINAS kuboresha uzalishaji wao na kuunganisha na washirika sahihi.',
    createFreeAccount: 'Unda Akaunti ya Bure',
    contactSales: 'Wasiliana na Mauzo',
    
    // About Preview
    aboutAdinas: 'Kuhusu ADINAS',
    transformingTanzaniaAgriculture: 'Kubadilisha Mazingira ya Kilimo ya Tanzania',
    adinasDescription: 'ADINAS ni jukwaa kamili la kidijitali lililobuniwa kuunganisha pengo kati ya wakulima, maafisa wa ugani, wachuuzi wa kilimo, na makampuni ya kilimo kote Tanzania. Dhamira yetu ni kuboresha uzalishaji, kuongeza upatikanaji wa habari, na kukuza ushirikiano katika mlolongo wote wa thamani ya kilimo.',
    connectWithVerifiedSuppliers: 'Unganisha na wasambazaji wa kilimo waliothibitishwa',
    accessExpertAdvice: 'Pata ushauri wa kitaalamu kutoka kwa maafisa wa ugani',
    realTimeMarketPrices: 'Bei za soko za wakati halisi na masasisho ya hali ya hewa',
    comprehensiveFarmTools: 'Zana kamili za usimamizi wa shamba',
    learnMoreAboutUs: 'Jifunze Zaidi Kuhusu Sisi',
    
    // Errors
    pageNotFound: 'Ukurasa Haujapatikana',
    somethingWentWrong: 'Kuna tatizo lililotokea',
  },
};