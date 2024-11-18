import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, Zap } from 'lucide-react';

const creditPackages = [
  {
    name: 'Starter',
    credits: 100,
    price: 9.99,
    features: ['Basic promotion boost', 'Standard targeting']
  },
  {
    name: 'Pro',
    credits: 500,
    price: 39.99,
    features: ['Advanced promotion boost', 'Geographic targeting', 'DM campaigns']
  },
  {
    name: 'Enterprise',
    credits: 2000,
    price: 149.99,
    features: ['Maximum promotion boost', 'Global targeting', 'Priority DM campaigns', 'Custom targeting']
  }
];

export function CreditsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Credits Management</h2>

      {/* Credits Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <p className="text-3xl font-bold">245</p>
                <p className="text-sm text-muted-foreground">credits remaining</p>
              </div>
            </div>
            <Progress value={45} className="mt-4" />
            <p className="text-sm text-muted-foreground mt-2">45% of credits used this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Promotion Boost</span>
                </div>
                <span>-50 credits</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span>DM Campaign</span>
                </div>
                <span>-30 credits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Packages */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Top Up Credits</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {creditPackages.map((pkg) => (
          <Card key={pkg.name}>
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold">{pkg.credits}</p>
                <p className="text-sm text-muted-foreground">credits</p>
              </div>
              <div>
                <p className="text-2xl font-bold">${pkg.price}</p>
                <p className="text-sm text-muted-foreground">one-time payment</p>
              </div>
              <ul className="space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="text-sm flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Purchase</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}