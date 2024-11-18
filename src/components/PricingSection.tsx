// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "../components/ui/button";
// import { MovingBorder } from "../components/ui/moving-border";
// import { Check, X } from "lucide-react";

// interface PricingSectionProps {
//   onGetStarted: () => void;
// }

// const pricingPlans = [
//   {
//     name: "Starter",
//     price: 29,
//     description: "Perfect for small businesses just getting started with Reddit marketing.",
//     features: [
//       { text: "5 Active Campaigns", included: true },
//       { text: "100 AI-Generated Comments/mo", included: true },
//       { text: "Basic Analytics", included: true },
//       { text: "Email Support", included: true },
//       { text: "Custom Response Templates", included: false },
//       { text: "Advanced Analytics", included: false },
//     ],
//   },
//   {
//     name: "Pro",
//     price: 79,
//     description: "Ideal for growing businesses seeking more engagement.",
//     features: [
//       { text: "15 Active Campaigns", included: true },
//       { text: "500 AI-Generated Comments/mo", included: true },
//       { text: "Advanced Analytics", included: true },
//       { text: "Priority Support", included: true },
//       { text: "Custom Response Templates", included: true },
//       { text: "API Access", included: false },
//     ],
//   },
//   {
//     name: "Enterprise",
//     price: 199,
//     description: "For large organizations requiring maximum reach.",
//     features: [
//       { text: "Unlimited Campaigns", included: true },
//       { text: "Unlimited Comments", included: true },
//       { text: "Advanced Analytics", included: true },
//       { text: "24/7 Priority Support", included: true },
//       { text: "Custom Response Templates", included: true },
//       { text: "API Access", included: true },
//     ],
//   },
// ];

// export const PricingSection: React.FC<PricingSectionProps> = ({ onGetStarted }) => {
//   return (
//     <section className="pricing-section py-24">
//       <div className="container max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
//         <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
//           Choose the perfect plan for your marketing needs. All plans include our core features.
//         </p>
//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {pricingPlans.map((plan, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//             >
//               <MovingBorder containerClassName="h-full">
//                 <div className="p-6 h-full flex flex-col">
//                   <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
//                   <div className="mb-4">
//                     <span className="text-4xl font-bold">${plan.price}</span>
//                     <span className="text-muted-foreground">/month</span>
//                   </div>
//                   <p className="text-muted-foreground mb-6">{plan.description}</p>
//                   <ul className="space-y-3 mb-8 flex-grow">
//                     {plan.features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         {feature.included ? (
//                           <Check className="h-5 w-5 text-green-500" />
//                         ) : (
//                           <X className="h-5 w-5 text-red-500" />
//                         )}
//                         <span className={!feature.included ? "text-muted-foreground" : ""}>
//                           {feature.text}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                   <Button
//                     className="w-full"
//                     variant={plan.name === "Pro" ? "default" : "outline"}
//                     onClick={onGetStarted}
//                   >
//                     Get Started
//                   </Button>
//                 </div>
//               </MovingBorder>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };