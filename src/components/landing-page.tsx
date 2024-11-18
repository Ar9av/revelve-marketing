import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { MovingBorder } from "@/components/ui/moving-border";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Target,
  Check,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4 relative">
        <div className="container mx-auto text-center relative z-10 py-20">
          <AnimatedText
            text="Automate Your Reddit Marketing"
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          />
          <AnimatedText
            text="Generate authentic, human-like responses for your product across relevant Reddit threads"
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          />
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="group" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <MovingBorder key={index} containerClassName="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 h-full"
                >
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </MovingBorder>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your marketing needs. All plans include our core features.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <MovingBorder containerClassName="h-full">
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                          <span className={!feature.included ? "text-muted-foreground" : ""}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.name === "Pro" ? "default" : "outline"}
                      onClick={onGetStarted}
                    >
                      Get Started
                    </Button>
                  </div>
                </MovingBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Everything you need to know about our Reddit marketing platform
          </p>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <MovingBorder className="max-w-3xl mx-auto" containerClassName="p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of marketers who are already using our platform to grow their Reddit presence.
            </p>
            <Button size="lg" className="group" onClick={onGetStarted}>
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MovingBorder>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Responses",
    description: "Generate contextually relevant, human-like responses that naturally promote your product.",
    icon: Bot,
  },
  {
    title: "Smart Thread Detection",
    description: "Automatically identify and target the most relevant Reddit threads for your product.",
    icon: Target,
  },
  {
    title: "Engagement Analytics",
    description: "Track your campaign performance with detailed analytics and engagement metrics.",
    icon: MessageSquare,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses just getting started with Reddit marketing.",
    features: [
      { text: "5 Active Campaigns", included: true },
      { text: "100 AI-Generated Comments/mo", included: true },
      { text: "Basic Analytics", included: true },
      { text: "Email Support", included: true },
      { text: "Custom Response Templates", included: false },
      { text: "Advanced Analytics", included: false },
    ],
  },
  {
    name: "Pro",
    price: 79,
    description: "Ideal for growing businesses seeking more engagement.",
    features: [
      { text: "15 Active Campaigns", included: true },
      { text: "500 AI-Generated Comments/mo", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Priority Support", included: true },
      { text: "Custom Response Templates", included: true },
      { text: "API Access", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large organizations requiring maximum reach.",
    features: [
      { text: "Unlimited Campaigns", included: true },
      { text: "Unlimited Comments", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "24/7 Priority Support", included: true },
      { text: "Custom Response Templates", included: true },
      { text: "API Access", included: true },
    ],
  },
];

const faqs = [
  {
    question: "How does the AI ensure human-like responses?",
    answer: "Our AI is trained on millions of authentic Reddit conversations to understand context, tone, and natural language patterns. It generates unique responses while maintaining authenticity and following Reddit's guidelines.",
  },
  {
    question: "Is this compliant with Reddit's terms of service?",
    answer: "Yes, our platform operates within Reddit's TOS. We ensure transparency and avoid spam-like behavior. Our AI generates genuine, valuable contributions to discussions while disclosing promotional content appropriately.",
  },
  {
    question: "How do you target relevant threads?",
    answer: "We use advanced algorithms to analyze subreddit content, user engagement patterns, and keyword relevance. This ensures your product is promoted in discussions where it adds genuine value to the conversation.",
  },
  {
    question: "Can I customize the AI's response tone?",
    answer: "Absolutely! You can adjust the tone from professional to casual, and set specific keywords, phrases, or topics to include or avoid in responses. This ensures alignment with your brand voice.",
  },
  {
    question: "What analytics do you provide?",
    answer: "Our analytics dashboard shows engagement rates, comment performance, user reactions, click-through rates, and sentiment analysis. Pro and Enterprise plans include advanced metrics and custom reporting.",
  },
];