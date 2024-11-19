import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createCampaign } from '@/lib/api';

interface FormData {
  title: string;
  description: string;
  subreddits: string;
}

export function CampaignForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [tone, setTone] = useState(50);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const addKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keyword.trim()) {
      e.preventDefault();
      setKeywords([...keywords, keyword.trim()]);
      setKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData: FormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a campaign",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await createCampaign({
        title: formData.title,
        description: formData.description,
        keywords: keywords,
        tone: tone,
        subreddits: formData.subreddits.split('\n').filter(s => s.trim()),
        userId: user.id
      });

      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Promotion Campaign</CardTitle>
          <CardDescription>
            Set up your Reddit marketing campaign with natural, human-like responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter your campaign title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Describe your campaign's key features and benefits"
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Target Keywords</Label>
            <div className="flex gap-2 flex-wrap mb-2">
              {keywords.map((kw, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeKeyword(i)}
                >
                  {kw} ×
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add keywords (press Enter)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={addKeyword}
            />
          </div>

          <div className="space-y-4">
            <Label>Response Tone</Label>
            <div className="space-y-2">
              <Slider
                value={[tone]}
                onValueChange={(value) => setTone(value[0])}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Professional</span>
                <span>Casual</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subreddits">Target Subreddits</Label>
            <Textarea
              id="subreddits"
              {...register("subreddits", { required: "At least one subreddit is required" })}
              placeholder="Enter target subreddits (one per line)"
              className="min-h-[100px]"
            />
            {errors.subreddits && (
              <p className="text-sm text-destructive">{errors.subreddits.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}