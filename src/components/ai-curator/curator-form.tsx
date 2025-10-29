"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { getCuratedPortfolio } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Upload } from "lucide-react";

export function CuratorForm() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [customerFeedback, setCustomerFeedback] = useState<string>("");
  const [seasonalTrend, setSeasonalTrend] = useState<string>("");
  const [selectedPhotos, setSelectedPhotos] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileReadPromises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReadPromises)
        .then(base64Photos => {
          setPhotos(prev => [...prev, ...base64Photos]);
        })
        .catch(error => {
          console.error("Error reading files:", error);
          toast({
            variant: "destructive",
            title: "File Read Error",
            description: "There was an issue uploading your photos.",
          });
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (photos.length === 0) {
      toast({
        variant: "destructive",
        title: "No Photos",
        description: "Please upload at least one photo.",
      });
      return;
    }
    
    setSelectedPhotos(null);

    startTransition(async () => {
      const feedbackArray = customerFeedback.split('\n').filter(line => line.trim() !== '');
      const result = await getCuratedPortfolio({ photos, customerFeedback: feedbackArray, seasonalTrend });
      if (result.success && result.data) {
        setSelectedPhotos(result.data.selectedPhotos);
        toast({
          title: "Curation Complete!",
          description: "Your portfolio has been curated by the AI.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Curation Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    });
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Curation Inputs</CardTitle>
          <CardDescription>Provide the data for the AI to analyze.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photos">Upload Photos</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="photos" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
                    </div>
                    <Input id="photos" type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*" />
                </label>
            </div>
              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image src={photo} alt={`Uploaded photo ${index + 1}`} fill className="rounded-md object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-feedback">Customer Feedback (one per line)</Label>
              <Textarea
                id="customer-feedback"
                placeholder="e.g., 'Loved the candid shots!'\n'The lighting was perfect.'"
                value={customerFeedback}
                onChange={(e) => setCustomerFeedback(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seasonal-trend">Seasonal Trend</Label>
              <Input
                id="seasonal-trend"
                placeholder="e.g., 'Autumn weddings', 'Summer fashion'"
                value={seasonalTrend}
                onChange={(e) => setSeasonalTrend(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Curating...
                </>
              ) : (
                <>
                 <Sparkles className="mr-2 h-4 w-4" />
                  Curate My Portfolio
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Curated Selection</CardTitle>
          <CardDescription>The best photos for your portfolio, as selected by the AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p>AI is analyzing your photos...</p>
            </div>
          )}
          
          {!isPending && selectedPhotos === null && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground p-8">
              <p>Your curated portfolio will appear here once you submit your inputs.</p>
            </div>
          )}

          {selectedPhotos && selectedPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <Image src={photo} alt={`Selected photo ${index + 1}`} fill className="rounded-md object-cover" />
                </div>
              ))}
            </div>
          )}

          {selectedPhotos && selectedPhotos.length === 0 && (
             <Alert>
                <AlertTitle>No Photos Selected</AlertTitle>
                <AlertDescription>
                    The AI did not select any photos based on the current criteria. Try adjusting your inputs.
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
