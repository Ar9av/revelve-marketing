import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              Revelve helps businesses grow their presence on Reddit through AI-powered, authentic engagement.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
            <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:support@revelve.io"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  support@revelve.io
                </a>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      <div className="mt-8 border-t pt-8 flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Revelve. All rights reserved.
          </p>
        </div>
    </footer>
  );
}