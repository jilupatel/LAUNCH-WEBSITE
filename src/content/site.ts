/**
 * Centralized Site Content & Configuration
 * 
 * Every piece of copy, branding text, contact detail, social link,
 * accent color, and navigation item is defined here.
 * Re-skinning this demo for any industry takes minutes.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoText: string;
  foundedYear: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
  };
  socialLinks: {
    label: string;
    href: string;
    platform: "twitter" | "linkedin" | "facebook" | "instagram";
  }[];
  navigation: {
    label: string;
    href: string;
  }[];
  home: {
    hero: {
      badge: string;
      title: string;
      description: string;
      ctaPrimary: { text: string; href: string };
      ctaSecondary: { text: string; href: string };
    };
    trustPoints: string[];
    features: {
      title: string;
      description: string;
      badge: string;
    }[];
    aboutTeaser: {
      badge: string;
      title: string;
      paragraphs: string[];
      stats: { value: string; label: string }[];
      cta: { text: string; href: string };
    };
    ctaStrip: {
      title: string;
      description: string;
      cta: { text: string; href: string };
    };
  };
  about: {
    header: {
      title: string;
      subtitle: string;
    };
    story: {
      title: string;
      paragraphs: string[];
    };
    values: {
      title: string;
      description: string;
    }[];
    services: {
      title: string;
      description: string;
      deliverables: string[];
    }[];
    process: {
      step: string;
      title: string;
      description: string;
    }[];
    ctaBanner: {
      title: string;
      description: string;
      cta: { text: string; href: string };
    };
  };
  contactPage: {
    header: {
      title: string;
      subtitle: string;
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      submittingButton: string;
      successTitle: string;
      successMessage: string;
      autoReplyNotice: string;
    };
    mapPlaceholder: {
      title: string;
      label: string;
      details: string;
      coordinates: string;
    };
  };
  footer: {
    copyright: string;
    disclaimer: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Your Business Name",
  shortName: "Your Business",
  tagline: "Reliable, modern solutions designed to help your business grow",
  description: "Official demo website showcasing professional services, transparent workflows, and responsive customer care.",
  logoText: "BUSINESS",
  foundedYear: "2024",
  colors: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryLight: "#eff6ff",
  },
  contact: {
    email: "contact@yourbusiness.com",
    phone: "+91 98765 43210",
    address: "Suite 100, Commercial Avenue, Business District, City 400001, State",
    hours: "Monday – Saturday: 9:00 AM – 6:00 PM",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    whatsappDefaultMessage: "Hello, I would like to inquire about your services.",
  },
  socialLinks: [
    { label: "Twitter / X", href: "https://twitter.com", platform: "twitter" },
    { label: "LinkedIn", href: "https://linkedin.com", platform: "linkedin" },
    { label: "Facebook", href: "https://facebook.com", platform: "facebook" },
    { label: "Instagram", href: "https://instagram.com", platform: "instagram" },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About & Services", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  home: {
    hero: {
      badge: "Industry-Neutral Demo • ₹7,499 Package",
      title: "Reliable & Professional Services for Your Growing Business",
      description: "We help individuals and businesses achieve their goals through proven workflows, exceptional attention to detail, and responsive customer care.",
      ctaPrimary: { text: "Request a Consultation", href: "/contact" },
      ctaSecondary: { text: "Explore Services", href: "/about" },
    },
    trustPoints: [
      "100% Client Focused",
      "Transparent Pricing",
      "Fast Turnaround",
      "Dedicated Support",
    ],
    features: [
      {
        badge: "Service 01",
        title: "Tailored Consultation",
        description: "We analyze your specific requirements and design customized strategies that fit your timeline and budget.",
      },
      {
        badge: "Service 02",
        title: "Quality Delivery",
        description: "Every deliverable is crafted to the highest standard with meticulous quality checks before handover.",
      },
      {
        badge: "Service 03",
        title: "Ongoing Assistance",
        description: "We stay by your side with responsive customer support and practical guidance after project completion.",
      },
      {
        badge: "Service 04",
        title: "Transparent Communication",
        description: "Clear milestones, regular status updates, and no hidden surprises throughout the entire engagement.",
      },
    ],
    aboutTeaser: {
      badge: "About Us",
      title: "A Committed Partner Dedicated to Your Success",
      paragraphs: [
        "Founded on principles of integrity, craftsmanship, and reliability, we work closely with clients across industries to deliver tangible results.",
        "Whether you are launching a new venture or refining an established operation, our structured methods ensure your vision is realized seamlessly.",
      ],
      stats: [
        { value: "100%", label: "Client Dedication" },
        { value: "5+ Years", label: "Industry Experience" },
        { value: "24-48h", label: "Response Window" },
      ],
      cta: { text: "Learn More About Us", href: "/about" },
    },
    ctaStrip: {
      title: "Ready to Discuss Your Next Project?",
      description: "Reach out to our team today for a free consultation and project estimate.",
      cta: { text: "Contact Us Today", href: "/contact" },
    },
  },
  about: {
    header: {
      title: "About Our Business & Services",
      subtitle: "Discover our mission, our core capabilities, and our straightforward 3-step execution process.",
    },
    story: {
      title: "Our Story & Commitment",
      paragraphs: [
        "We started with a simple belief: professional services should be straightforward, reliable, and accessible. Over the years, we have helped dozens of clients achieve clarity and momentum in their initiatives.",
        "Our team combines deep domain expertise with a disciplined approach to project management. We take pride in building long-term relationships based on mutual trust, transparency, and consistent results.",
      ],
    },
    values: [
      {
        title: "Integrity First",
        description: "Honest communication and clear expectations at every step of our engagement.",
      },
      {
        title: "Excellence in Execution",
        description: "Delivering polished, high-standard outcomes without cutting corners or taking shortcuts.",
      },
      {
        title: "Client Partnership",
        description: "Your priorities are our priorities throughout our collaboration, from kickoff to completion.",
      },
    ],
    services: [
      {
        title: "Strategic Planning",
        description: "Comprehensive roadmaps and practical action plans tailored to your specific goals and timeline.",
        deliverables: ["Initial audit & requirements gathering", "Actionable roadmap document", "Milestone scheduling"],
      },
      {
        title: "Service Implementation",
        description: "Turnkey execution using proven methodologies to ensure smooth delivery without downtime.",
        deliverables: ["End-to-end execution", "Rigorous quality checklist", "Weekly progress check-in"],
      },
      {
        title: "Process Optimization",
        description: "Streamlining workflows and operations to eliminate bottlenecks and boost day-to-day productivity.",
        deliverables: ["Workflow mapping", "Efficiency recommendations", "Standard operating procedures"],
      },
      {
        title: "Quality Assurance",
        description: "Rigorous reviews, audits, and checks to guarantee consistent quality across all deliverables.",
        deliverables: ["Comprehensive audit report", "Compliance & standards validation", "Feedback implementation"],
      },
      {
        title: "Maintenance & Support",
        description: "Reliable ongoing support and rapid resolution for routine updates, questions, and inquiries.",
        deliverables: ["Priority response channel", "Routine maintenance checks", "Monthly health summary"],
      },
      {
        title: "Client Advisory",
        description: "Regular check-ins and expert guidance to help you navigate changes and seize new opportunities.",
        deliverables: ["Quarterly review calls", "Strategic advisory notes", "On-demand expert advice"],
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Planning",
        description: "We listen to your requirements, define project goals, and outline a clear scope and timeline.",
      },
      {
        step: "02",
        title: "Execution & Review",
        description: "We carry out the work with periodic check-ins, incorporating your input at key milestones.",
      },
      {
        step: "03",
        title: "Delivery & Support",
        description: "We finalize and hand over the completed work with documentation and 1-month included post-launch support.",
      },
    ],
    ctaBanner: {
      title: "Let's Build Something Great Together",
      description: "Have questions about our services or need a customized quote? We are ready to help.",
      cta: { text: "Get in Touch", href: "/contact" },
    },
  },
  contactPage: {
    header: {
      title: "Contact Us",
      subtitle: "Have a question or looking to start a project? Send us a message or reach out directly.",
    },
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "e.g. John Doe",
      emailLabel: "Email Address",
      emailPlaceholder: "e.g. john@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "e.g. +91 98765 43210",
      messageLabel: "Your Message",
      messagePlaceholder: "Tell us about your requirements, project timeline, or questions...",
      submitButton: "Send Inquiry",
      submittingButton: "Submitting...",
      successTitle: "Inquiry Sent Successfully!",
      successMessage: "Thank you for reaching out. We have received your inquiry and our team will get back to you within 24 hours.",
      autoReplyNotice: "A confirmation email has been dispatched to your inbox.",
    },
    mapPlaceholder: {
      title: "Office Location Placeholder",
      label: "Centrally Located in Downtown Commercial District",
      details: "Suite 100, Commercial Avenue, Business District, City 400001, State",
      coordinates: "Coordinates: 19.0760° N, 72.8777° E (Demo Static Map Box — No Third-Party Map Scripts)",
    },
  },
  footer: {
    copyright: "© 2026 Your Business Name. All rights reserved.",
    disclaimer: "This website is an industry-neutral demonstration of the ₹7,499 Launch Website package. Zero external branding is used.",
  },
};
