
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, MessageSquare, Mail, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Photographs</CardTitle>
                <CardDescription>Manage portfolio images</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit, or remove photographs from your portfolio. Organize by category.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/photographs">
                Manage Photos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Testimonials</CardTitle>
                <CardDescription>Manage client reviews</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit, or remove client testimonials and reviews.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/testimonials">
                Manage Reviews <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>View inquiries</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage contact form submissions from potential clients.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/contacts">
                View Messages <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}