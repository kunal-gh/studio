'use client';

import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';

const categoryTitle = "Street";
const categoryDescription = "Finding beauty and narrative in the everyday. Our street photography captures the candid, fleeting moments of life in the city with an authentic, documentary style.";

export default function StreetPage() {
  const firestore = useFirestore();

  const photographsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'photographs'), where('category', '==', 'street'), orderBy('order'));
  }, [firestore]);

  const { data: images, isLoading } = useCollection(photographsQuery);

  return (
    <div className="py-20 md:py-28 lg:py-32 bg-background animate-in fade-in-50 duration-500">
        <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
                <h1 className="font-headline text-5xl md:text-6xl lg