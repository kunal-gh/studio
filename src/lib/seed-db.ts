
'use client';

import { collection, writeBatch, getDocs, Firestore, doc } from 'firebase/firestore';

// Data from placeholder-images.json, mapped to the Photograph entity structure
const photographs = [
    // Weddings
    { "id": "wedding-1", "title": "First Look", "description": "A newly married couple smiling at each other during their wedding ceremony.", "imageUrl": "https://images.unsplash.com/photo-1688422763790-93430fabf0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d2VkZGluZyUyMGNvdXBsZXxlbnwwfHx8fDE3NjE2NDg0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 1, "imageHint": "wedding couple" },
    { "id": "wedding-2", "title": "The Cake", "description": "A beautiful wedding cake with intricate flower decorations.", "imageUrl": "https://images.unsplash.com/photo-1574538860416-baadc5d4ec57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3ZWRkaW5nJTIwY2FrZXxlbnwwfHx8fDE3NjE2NzY4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 2, "imageHint": "wedding cake" },
    { "id": "wedding-3", "title": "The Ceremony", "description": "A bride and groom walking down the aisle after their wedding ceremony.", "imageUrl": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3ZWRkaW5nJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzYxNjQ1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080", "category": "weddings", "order": 3, "imageHint": "wedding ceremony" },
    
    // Portraits
    { "id": "portrait-1", "title": "Striking Gaze", "description": "A close-up portrait of a woman with striking eyes.", "imageUrl": "https://images.unsplash.com/photo-1634595477722-7bc68dd410fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMHdvbWFufGVufDB8fHx8MTc2MTcxODIzMHww&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 1, "imageHint": "portrait woman" },
    { "id": "portrait-2", "title": "Thoughtful", "description": "A man looking thoughtfully out of a window.", "imageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3NjE2NDExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 2, "imageHint": "portrait man" },
    { "id": "portrait-3", "title": "City Vibe", "description": "A street style portrait of a person in a vibrant city.", "imageUrl": "https://images.unsplash.com/photo-1684824473141-b086f8cbe18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHN0cmVldHxlbnwwfHx8fDE3NjE2NzYxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "portraits", "order": 3, "imageHint": "portrait street" },
    
    // Live Events
    { "id": "event-1", "title": "Crowd Fun", "description": "A crowd of people enjoying a public event.", "imageUrl": "https://images.unsplash.com/photo-1580688027085-8220709e3d84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxldmVudCUyMGNyb3dkfGVufDB8fHx8MTc2MTYxODQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 1, "imageHint": "event crowd" },
    { "id": "event-2", "title": "Conference Speaker", "description": "A speaker on stage at a conference.", "imageUrl": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxldmVudCUyMGNvbmZlcmVuY2V8ZW58MHx8fHwxNzYxNjQzODAxfDA&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 2, "imageHint": "event conference" },
    { "id": "event-3", "title": "Night Fireworks", "description": "Colorful fireworks at a night event.", "imageUrl": "https://images.unsplash.com/photo-1626314096024-ad9bcfb3a58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxldmVudCUyMGZpcmV3b3Jrc3xlbnwwfHx8fDE3NjE3MjQxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "live-events", "order": 3, "imageHint": "event fireworks" },
    
    // Fashion
    { "id": "fashion-1", "title": "High Fashion", "description": "A model posing in a high-fashion outfit.", "imageUrl": "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fHx8MTc2MTY2MDgxMHww&ixlib=rb-4.1.0&q=80&w=1080", "category": "fashion", "order": 1, "imageHint": "fashion model" },
    { "id": "fashion-2", "title": "Designer Accessories", "description": "A close-up of a designer handbag and shoes.", "imageUrl": "https://images.unsplash.com/photo-1665702860632-4dfcd4b2d869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmFzaGlvbiUyMGFjY2Vzc29yeXxlbnwwfHx8fDE3NjE2OTcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "fashion", "order": 2, "imageHint": "fashion accessory" },
    { "id": "fashion-3", "title": "Runway", "description": "A runway show with models walking down the catwalk.", "imageUrl": "https://images.unsplash.com/photo-1571924848943-25c2c95bbb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmYXNoaW9uJTIwcnVud2F5fGVufDB8fHx8MTc2MTY2Mzk2Mnww&ixlib=rb-4.1.0&q=80&w=1080", "category": "fashion", "order": 3, "imageHint": "fashion runway" },
    
    // Street
    { "id": "street-1", "title": "City Night", "description": "A busy street scene in a city at night.", "imageUrl": "https://images.unsplash.com/photo-1662877717397-361d8bce48d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdHJlZXQlMjBjaXR5fGVufDB8fHx8MTc2MTYzNTA0OXww&ixlib=rb-4.1.0&q=80&w=1080", "category": "street", "order": 1, "imageHint": "street city" },
    { "id": "street-2", "title": "Alley Walk", "description": "A person walking down a colorful alleyway.", "imageUrl": "https://images.unsplash.com/photo-1711921730562-bb8f4fab7e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzdHJlZXQlMjBhbGxleXxlbnwwfHx8fDE3NjE3MjQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "street", "order": 2, "imageHint": "street alley" },
    { "id": "street-3", "title": "Classic Car", "description": "A black and white photo of a classic car on the street.", "imageUrl": "https://images.unsplash.com/photo-1711125174987-645d1a9d6466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdHJlZXQlMjBjYXJ8ZW58MHx8fHwxNzYxNzI0NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080", "category": "street", "order": 3, "imageHint": "street car" },
    
    // AI Generated
    { "id": "ai-1", "title": "Futuristic City", "description": "A futuristic city skyline generated by AI.", "imageUrl": "https://images.unsplash.com/photo-1688511922474-1282213d298f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhaSUyMGFydHxlbnwwfHx8fDE3NjE3MjQ4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 1, "imageHint": "ai art" },
    { "id": "ai-2", "title": "Abstract Digital", "description": "An abstract digital painting created by an AI.", "imageUrl": "https://images.unsplash.com/photo-1696232130384-a1b7a69b7677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhYnN0cmFjdCUyMGFpJTIwYXJ0fGVufDB8fHx8MTc2MTcyNDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 2, "imageHint": "abstract ai" },
    { "id": "ai-new-1", "title": "Surreal Swirls", "description": "A surreal, abstract image generated by AI, showing vibrant, swirling colors.", "imageUrl": "https://images.unsplash.com/photo-1729671009317-fa1776f2165e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWJzdHJhY3QlMjBzdXJyZWFsfGVufDB8fHx8MTc2MjE4NDQ3OHww&ixlib=rb-4.1.0&q=80&w=1080", "category": "ai-generated", "order": 3, "imageHint": "abstract surreal" },
];

export async function seedPhotographs(db: Firestore) {
  const photographsRef = collection(db, 'photographs');
  
  // Check if data already exists to prevent re-seeding
  const snapshot = await getDocs(photographsRef);
  if (!snapshot.empty) {
    console.log("Photographs collection already contains data. Seeding skipped.");
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

    