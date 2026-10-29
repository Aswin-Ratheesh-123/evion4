export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Charging' | 'Business' | 'Technical';
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is EVION?',
    answer: 'EVION is an electric vehicle charging network and charging technology company. We specialize exclusively in EV charging solutions, high-power charging hub infrastructure, station discovery platforms, and turnkey commercial charging systems for businesses and property owners. We do not manufacture or sell electric vehicles.',
  },
  {
    id: 'faq-2',
    category: 'Charging',
    question: 'How can I find an EV charging station near me?',
    answer: 'You can discover nearby EVION charging hubs directly through our interactive "Find Chargers" locator on this website or via our mobile platform. The map displays real-time operational status, connector compatibility (CCS2, NACS, CHAdeMO, Type 2), maximum power output (up to 350 kW), and station amenities.',
  },
  {
    id: 'faq-3',
    category: 'Technical',
    question: 'What is the difference between AC and DC fast charging?',
    answer: 'AC (Alternating Current) charging, typically 7 kW to 22 kW, uses your electric car’s onboard converter and is ideal for destinations, workplaces, and extended parking. DC (Direct Current) fast charging (50 kW to 350 kW) bypasses the onboard converter and feeds power directly to the battery pack, delivering rapid charging speeds—often adding 150–250 miles of range in just 15 to 20 minutes.',
  },
  {
    id: 'faq-4',
    category: 'Technical',
    question: 'How do I check connector compatibility for my electric vehicle?',
    answer: 'Most modern European, UK, and international electric vehicles use CCS2 (Combined Charging System 2) for DC rapid charging and Type 2 (Mennekes) for AC charging. North American vehicles typically use NACS or CCS1. EVION hubs feature multi-standard connectors including CCS2, NACS, and Type 2. You can filter the station map by your vehicle’s specific connector.',
  },
  {
    id: 'faq-5',
    category: 'Charging',
    question: 'How long does EV charging actually take?',
    answer: 'Charging duration depends on five key factors: your vehicle’s maximum DC intake limit, the charger’s peak power rating (e.g., 150 kW vs 350 kW), current battery state of charge (charging slows down after 80% to protect battery health), ambient battery temperature, and total battery pack capacity. On an EVION 350 kW charger, compatible vehicles can charge from 10% to 80% in approximately 15 to 20 minutes.',
  },
  {
    id: 'faq-6',
    category: 'Business',
    question: 'Can businesses and property owners install EVION charging infrastructure?',
    answer: 'Yes! EVION provides comprehensive turnkey commercial charging solutions for corporate workplaces, retail parks, fleet depots, and hospitality venues. Our solutions include grid capacity feasibility analysis, hardware provisioning, smart dynamic load management, automated billing, and 24/7 remote monitoring.',
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'How can I contact EVION for support or enquiries?',
    answer: 'Our dedicated customer and technical support team is accessible 24/7 via phone (+44 800 384 6600), email (support@evioncharge.com), our website contact form, and official WhatsApp live support. Help is always at hand whether you are at a charging bay or planning an enterprise installation.',
  },
];

