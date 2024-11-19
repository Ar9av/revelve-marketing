import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { Coins, Lock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserCredits, deductCampaignCredits } from '@/lib/api';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BOOST_COST = 50;

interface PromotionBoostDialogProps {
  promotionId: string;
  onBoostComplete?: () => void;
}

export function PromotionBoostDialog({ promotionId, onBoostComplete }: PromotionBoostDialogProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boostType, setBoostType] = useState('');
  const [regions, setRegions] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [dailyLimit, setDailyLimit] = useState('50');

  const loadCredits = async () => {
    if (!user) return;
    try {
      const response = await getUserCredits(user.id);
      setCredits(response.totalCredits);
    } catch (error) {
      console.error('Failed to load credits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCredits();
  }, [user]);

  const hasEnoughCredits = credits >= BOOST_COST;

  const handleBoost = async () => {
    if (!user || !hasEnoughCredits) {
      toast({
        title: "Insufficient credits",
        description: `You need ${BOOST_COST} credits to boost this campaign. Please top up your credits.`,
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Deduct credits through API
      await deductCampaignCredits(user.id, promotionId, BOOST_COST, 'superboost');
      
      toast({
        title: "Boost activated",
        description: "Your campaign boost has been activated successfully"
      });
      
      // Refresh credits in sidebar
      loadCredits();
      
      // Notify parent component
      if (onBoostComplete) {
        onBoostComplete();
      }
      
      setOpen(false);
    } catch (error) {
      console.error('Failed to boost campaign:', error);
      toast({
        title: "Error",
        description: "Failed to boost campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Zap className="h-4 w-4" />
        Loading...
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            This will consume {BOOST_COST} credits from your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Boost Type</Label>
            <Select value={boostType} onValueChange={setBoostType}>
              <SelectTrigger>
                <SelectValue placeholder="Select boost type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geographic">Geographic Expansion</SelectItem>
                <SelectItem value="dm">DM Campaign</SelectItem>
                <SelectItem value="both">Combined Boost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Target Regions</Label>
            <Select value={regions} onValueChange={setRegions}>
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
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Daily Message Limit</Label>
            <Input 
              type="number" 
              placeholder="50" 
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
            />
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-primary" />
                <span className="font-medium">Available Credits</span>
              </div>
              <span className="font-medium">{credits}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Boost cost: {BOOST_COST} credits
            </p>
          </div>
        </div>
        <DialogFooter>
          {!hasEnoughCredits ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
                navigate('/credits');
              }}
            >
              <Lock className="mr-2 h-4 w-4" />
              Get More Credits to Boost
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleBoost}
              disabled={isSubmitting || !boostType || !regions}
            >
              {isSubmitting ? "Activating Boost..." : "Activate Boost"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}