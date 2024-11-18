import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap } from 'lucide-react';

interface PromotionBoostDialogProps {
  promotionId: string;
}

export function PromotionBoostDialog({ promotionId }: PromotionBoostDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Zap className="h-4 w-4" />
          Super Boost
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Super Boost Promotion</DialogTitle>
          <DialogDescription>
            Enhance your promotion's reach with additional targeting options.
            This will consume credits from your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Boost Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select boost type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geographic">Geographic Expansion (50 credits)</SelectItem>
                <SelectItem value="dm">DM Campaign (100 credits)</SelectItem>
                <SelectItem value="both">Combined Boost (140 credits)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Target Regions</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>DM Message Template</Label>
            <Textarea 
              placeholder="Hi! Saw that you might be interested in our product..."
              className="h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Daily Message Limit</Label>
            <Input type="number" placeholder="50" />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Credits required: 50</p>
          <Button>Start Boost</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}