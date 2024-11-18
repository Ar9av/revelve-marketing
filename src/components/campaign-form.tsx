import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

export function CampaignForm() {
  const [tone, setTone] = useState(50);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Promotion Campaign</CardTitle>
        <CardDescription>
          Set up your Reddit marketing campaign with natural, human-like responses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product">Product Name</Label>
          <Input id="product" placeholder="Enter your product name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your product's key features and benefits"
            className="min-h-[100px]"
          />
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
              onValueChange={(value: any) => setTone(value[0])}
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
            placeholder="Enter target subreddits (one per line)"
            className="min-h-[100px]"
          />
        </div>

        <Button className="w-full">Create Campaign</Button>
      </CardContent>
    </Card>
  );
}