
'use client';

import { collection, writeBatch, getDocs, Firestore, doc } from 'firebase/firestore';

// Data from placeholder-images.json, mapped to the Photograph entity structure
const photographs = [
    // Weddings
    { "id": "wedding-1", "title": "First Look", "description": "A newly married couple smiling at each other during their wedding ceremony.", "imageUrl": "https://images.unsplash.com/photo-1688422763790-93430fabf0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2VkZGluZyUyMGNvdXBsZXxlbnwwfHx8fDE3NjE2NDg0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 1, "imageHint": "wedding couple" },
    { "id": "wedding-2", "title": "The Cake", "description": "A beautiful wedding cake with intricate flower decorations.", "imageUrl": "https://images.unsplash.com/photo-1574538860416-baadc5d4ec57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3ZWRkaW5nJTIwY2FrZXxlbnwwfHx8fDE3NjE2NzY4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 2, "imageHint": "wedding cake" },
    { "id": "wedding-3", "title": "The Ceremony", "description": "A bride and groom walking down the aisle after their wedding ceremony.", "imageUrl": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3ZWRkaW5nJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzYxNjQ1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 3, "imageHint": "wedding ceremony" },
    { "id": "wedding-4", "title": "Quiet Moment", "description": "Bride and groom share a quiet moment.", "imageUrl": "https://picsum.photos/seed/wd4/800/1200", "category": "weddings", "order": 4, "imageHint": "bride groom" },
    { "id": "wedding-5", "title": "First Dance", "description": "The couple's first dance.", "imageUrl": "https://picsum.photos/seed/wd5/1200/800", "category": "weddings", "order": 5, "imageHint": "wedding dance" },
    { "id": "wedding-6", "title": "Details", "description": "Close up of wedding rings.", "imageUrl": "https://picsum.photos/seed/wd6/800/800", "category": "weddings", "order": 6, "imageHint": "wedding rings" },
    
    // Portraits
    { "id": "portrait-1", "title": "Striking Gaze", "description": "A close-up portrait of a woman with striking eyes.", "imageUrl": "https://images.unsplash.com/photo-1634595477722-7bc68dd410fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMHdvbWFufGVufDB8fHx8MTc2MTcxODIzMHww&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 1, "imageHint": "portrait woman" },
    { "id": "portrait-2", "title": "Thoughtful", "description": "A man looking thoughtfully out of a window.", "imageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3NjE2NDExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 2, "imageHint": "portrait man" },
    { "id": "portrait-3", "title": "City Vibe", "description": "A street style portrait of a person in a vibrant city.", "imageUrl": "https://images.unsplash.com/photo-1684824473141-b086f8cbe18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHN0cmVldHxlbnwwfHx8fDE3NjE2NzYxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 3, "imageHint": "portrait street" },
    { "id": "portrait-4", "title": "Elder Wisdom", "description": "Portrait of an elderly person with character.", "imageUrl": "https://picsum.photos/seed/p4/900/1200", "category": "portraits", "order": 4, "imageHint": "elderly portrait" },
    { "id": "portrait-5", "title": "Playful Child", "description": "A child laughing.", "imageUrl": "https://picsum.photos/seed/p5/1000/800", "category": "portraits", "order": 5, "imageHint": "laughing child" },
    { "id": "portrait-6", "title": "Corporate Headshot", "description": "Professional headshot for business.", "imageUrl": "https://picsum.photos/seed/p6/800/800", "category": "portraits", "order": 6, "imageHint": "corporate headshot" },
    
    // Live Events
    { "id": "event-1", "title": "Crowd Fun", "description": "A crowd of people enjoying a public event.", "imageUrl": "https://images.unsplash.com/photo-1580688027085-8220709e3d84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxldmVudCUyMGNyb3dkfGVufDB8fHx8MTc2MTYxODQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 1, "imageHint": "event crowd" },
    { "id": "event-2", "title": "Conference Speaker", "description": "A speaker on stage at a conference.", "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxldmVudCUyMGNvbmZlcmVuY2V8ZW58MHx8fHwxNzYxNjQzODAxfDA&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 2, "imageHint": "event conference" },
    { "id": "event-3", "title": "Night Fireworks", "description": "Colorful fireworks at a night event.", "imageUrl": "https://images.unsplash.com/photo-1626314096024-ad9bcfb3a58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxldmVudCUyMGZpcmV3b3Jrc3xlbnwwfHx8fDE3NjE3MjQxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 3, "imageHint": "event fireworks" },
    { "id": "event-4", "title": "Concert Lights", "description": "A band playing on stage at a concert.", "imageUrl": "https://picsum.photos/seed/ev4/1200/800", "category": "live-events", "order": 4, "imageHint": "concert lights" },
    { "id": "event-5", "title": "Marketplace", "description": "A bustling outdoor market.", "imageUrl": "https://picsum.photos/seed/ev5/1000/1200", "category": "live-events", "order": 5, "imageHint": "outdoor market" },
    { "id": "event-6", "title": "Celebration", "description": "People celebrating at a festival.", "imageUrl": "https://picsum.photos/seed/ev6/1200/900", "category": "live-events", "order": 6, "imageHint": "festival celebration" },

    // Fashion
    { "id": "fashion-1", "title": "High Fashion", "description": "A model posing in a high-fashion outfit.", "imageUrl": "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fHx8MTc2MTY2MDgxMHww&ixlib=rb-4.1.0&q=80&w=1080", "category": "fashion", "order": 1, "imageHint": "fashion model" },
    { "id": "fashion-2", "title": "Designer Accessories", "description": "A close-up of a designer handbag and shoes.", "imageUrl": "https://images.unsplash.com/photo-1665702860632-4dfcd4b2d869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmFzaGlvbiUyMGFjY2Vzc29yeXxlbnwwfHx8fDE3NjE2OTcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "fashion", "order": 2, "imageHint": "fashion accessory" },
    { "id": "fashion-3", "title": "Runway", "description": "A runway show with models walking down the catwalk.", "imageUrl": "https://images.unsplash.com/photo-1571924848943-25c2c95bbb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmYXNoaW9uJTIwcnVud2F5fGVufDB8fHx8MTc2MTY2Mzk2Mnww&ixlibrb-4.1.0&q=80&w=1080", "category": "fashion", "order": 3, "imageHint": "fashion runway" },
    { "id": "fashion-4", "title": "Street Style", "description": "A model in a fashionable outfit on the street.", "imageUrl": "https://picsum.photos/seed/fa4/800/1200", "category": "fashion", "order": 4, "imageHint": "street style" },
    { "id": "fashion-5", "title": "Editorial Shot", "description": "Creative editorial fashion photo.", "imageUrl": "https://picsum.photos/seed/fa5/1200/800", "category": "fashion", "order": 5, "imageHint": "editorial fashion" },
    { "id": "fashion-6", "title": "Bold Colors", "description": "A model in a brightly colored outfit.", "imageUrl": "https://picsum.photos/seed/fa6/900/900", "category": "fashion", "order": 6, "imageHint": "fashion colors" },

    // Street
    { "id": "street-1", "title": "City Night", "description": "A busy street scene in a city at night.", "imageUrl": "https://images.unsplash.com/photo-1662877717397-361d8bce48d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdHJlZXQlMjBjaXR5fGVufDB8fHx8MTc2MTYzNTA0OXww&ixlib=rb-4.1.0&q=80&w=1080", "category": "street", "order": 1, "imageHint": "street city" },
    { "id": "street-2", "title": "Alley Walk", "description": "A person walking down a colorful alleyway.", "imageUrl": "https://images.unsplash.com/photo-1711921730562-bb8f4fab7e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzdHJlZXQlMjBhbGxleXxlbnwwfHx8fDE3NjE3MjQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "street", "order": 2, "imageHint": "street alley" },
    { "id": "street-3", "title": "Classic Car", "description": "A black and white photo of a classic car on the street.", "imageUrl": "https://images.unsplash.com/photo-1711125174987-645d1a9d6466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdHJlZXQlMjBjYXJ8ZW58MHx8fHwxNzYxNzI0NTM2fDA&ixlib-rb-4.1.0&q=80&w=1080", "category": "street", "order": 3, "imageHint": "street car" },
    { "id": "street-4", "title": "Rainy Day", "description": "Reflections on a wet city street.", "imageUrl": "https://picsum.photos/seed/st4/1200/800", "category": "street", "order": 4, "imageHint": "rainy street" },
    { "id": "street-5", "title": "Market Life", "description": "A vendor at a street market.", "imageUrl": "https://picsum.photos/seed/st5/900/1200", "category": "street", "order": 5, "imageHint": "street market" },
    { "id": "street-6", "title": "Commute", "description": "People commuting on public transport.", "imageUrl": "https://picsum.photos/seed/st6/1200/900", "category": "street", "order": 6, "imageHint": "public transport" },
    
    // AI Generated
    { "id": "ai-1", "title": "Futuristic City", "description": "A futuristic city skyline generated by AI.", "imageUrl": "https://images.unsplash.com/photo-1688511922474-1282213d298f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhaSUyMGFydHxlbnwwfHx8fDE3NjE3MjQ4ODN8MA&ixlib-rb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 1, "imageHint": "ai art" },
    { "id": "ai-2", "title": "Abstract Digital", "description": "An abstract digital painting created by an AI.", "imageUrl": "https://images.unsplash.com/photo-1696232130384-a1b7a69b7677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhYnN0cmFjdCUyMGFpJTIwYXJ0fGVufDB8fHx8MTc2MTcyNDg4M3ww&ixlib-rb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 2, "imageHint": "abstract ai" },
    { "id": "ai-new-1", "title": "Surreal Swirls", "description": "A surreal, abstract image generated by AI, showing vibrant, swirling colors.", "imageUrl": "https://images.unsplash.com/photo-1729671009317-fa1776f2165e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWJzdHJhY3QlMjBzdXJyZWFsfGVufDB8fHx8MTc2MjE4NDQ3OHww&ixlibrb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 3, "imageHint": "abstract surreal" },
    { "id": "ai-4", "title": "Cybernetic Forest", "description": "An AI-generated image of a forest with glowing, cybernetic trees.", "imageUrl": "https://picsum.photos/seed/ai4/1200/800", "category": "ai-generated", "order": 4, "imageHint": "cybernetic forest" },
    { "id": "ai-5", "title": "Dreamscape", "description": "A surreal dreamscape created by AI.", "imageUrl": "https://picsum.photos/seed/ai5/900/1200", "category": "ai-generated", "order": 5, "imageHint": "surreal dreamscape" },
    { "id": "ai-6", "title": "Impossible Architecture", "description": "AI-generated impossible architecture.", "imageUrl": "https://picsum.photos/seed/ai6/1000/1000", "category": "ai-generated", "order": 6, "imageHint": "impossible architecture" }
];

export async function seedPhotographs(db: Firestore) {
  const photographsRef = collection(db, 'photographs');
  
  // Check if data already exists to prevent re-seeding
  const snapshot = await getDocs(photographsRef);
  if (!snapshot.empty && snapshot.docs.length >= photographs.length) {
    console.log("Photographs collection already contains enough data. Seeding skipped.");
    return;
  }

  const batch = writeBatch(db);

  photographs.forEach(photo => {
    // The document ID will be the photo.id
    const docRef = doc(photographsRef, photo.id); 
    
    // We can remove the 'id' from the data being written to Firestore
    const { id, ...dataToWrite } = photo;
    
    batch.set(docRef, dataToWrite);
  });

  try {
    await batch.commit();
    console.log("Successfully seeded photographs collection.");
  } catch (error) {
    console.error("Error seeding photographs collection: ", error);
  }
}
