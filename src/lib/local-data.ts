// Local data storage - replaces Firebase
export interface Photograph {
  id: string;
  category: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  featured?: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  role: string;
  avatar: string;
  rating: number;
  createdAt: string;
}

// In-memory data store
let photographs: Photograph[] = [];
let testimonials: Testimonial[] = [];

// Initialize with placeholder data
export function initializeLocalData() {
  // This will be populated from placeholder-images
  photographs = [];
  testimonials = [
    {
      id: '1',
      author: "Jessica & Tom",
      text: "Hardik didn't just take photos; he captured the soul of our wedding day. We look at our album and relive every laugh, tear, and dance. Truly magical.",
      role: "Wedding Client",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      author: "Amina Yusuf",
      text: "The portrait session was so relaxed and professional. Hardik made me feel completely at ease, and the final shots are the best photos I've ever had taken.",
      role: "Portrait Client",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      author: "David Chen",
      text: "His eye for street photography is unmatched. The photos he took for our magazine feature were raw, powerful, and told an incredible story.",
      role: "Magazine Editor",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      author: "Sarah Jenkins",
      text: "The fashion shoot was a dream. The creativity and direction were top-notch, resulting in a stunning lookbook that exceeded all our expectations.",
      role: "Fashion Designer",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      author: "Michael B.",
      text: "Incredible ability to capture the energy of a live event. The photos from our conference are dynamic and professional. Highly recommended.",
      role: "Event Organizer",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      createdAt: new Date().toISOString(),
    }
  ];
}

// Data access functions
export function getPhotographs(filter?: { category?: string }): Photograph[] {
  if (!filter?.category) return photographs;
  return photographs.filter(p => p.category === filter.category);
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function addPhotograph(photo: Omit<Photograph, 'id' | 'createdAt'>): Photograph {
  const newPhoto: Photograph = {
    ...photo,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  photographs.push(newPhoto);
  return newPhoto;
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  return newTestimonial;
}
