import { FileText, Mail, BarChart, Zap, Users, Clock } from "lucide-react";
import type { FeatureCardProps } from "./components/feature-card";
import type { StepCardProps } from "./components/step-card";
import type { PricingCardProps } from "./components/pricing-card";
import type { TestimonialCardProps } from "./components/testimonial-card";

export const FEATURE_CARD_EN: FeatureCardProps[] = [
  {
    title: "AI-Powered CV Generator",
    desc: "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    icon: <Mail className="h-10 w-10 text-primary" />,
    title: "Cover Letter Generator",
    desc: "Craft compelling cover letters that complement your CV and address key job requirements.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "CV Scoring",
    desc: "Analyze your CV against job descriptions to get a match score and suggestions for improvement.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Instant Optimization",
    desc: "Get real-time suggestions to improve your application materials and increase your chances.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Industry-Specific Templates",
    desc: "Access templates designed for different industries and career levels for better results.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Time-Saving Tools",
    desc: "Create professional application materials in minutes instead of hours with our intuitive tools.",
  },
];

export const FEATURE_CARD_ID: FeatureCardProps[] = [
  {
    title: "AI-Powered CV Generator",
    desc: "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang canggih.",
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    icon: <Mail className="h-10 w-10 text-primary" />,
    title: "Cover Letter Generator",
    desc: "Buat surat lamaran yang menarik dan sesuai dengan CV Anda untuk memenuhi persyaratan pekerjaan.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "CV Scoring",
    desc: "Analisis CV Anda terhadap deskripsi pekerjaan untuk mendapatkan skor cocok dan saran untuk peningkatan.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Optimasi Instant",
    desc: "Dapatkan saran langsung untuk meningkatkan material aplikasi Anda dan meningkatkan peluang Anda.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Template Industri Spesifik",
    desc: "Akses template yang telah disesuaikan untuk industri dan tingkat karir untuk hasil yang lebih baik.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Alat Penyederhanaan Waktu",
    desc: "Buat material aplikasi profesional dalam menit bukan dalam jam dengan alat yang intuitif kami.",
  },
];

export const STEP_CARD_EN: StepCardProps[] = [
  {
    number: 1,
    title: "Input Your Information",
    description:
      "Paste your existing CV (optional) and the job description you're applying for.",
  },
  {
    number: 2,
    title: "AI Optimization",
    description:
      "Our AI analyzes the job requirements and tailors your application materials accordingly.",
  },
  {
    number: 3,
    title: "Download & Apply",
    description:
      "Review, edit if needed, and download your optimized CV and cover letter.",
  },
];

export const STEP_CARD_ID: StepCardProps[] = [
  {
    number: 1,
    title: "Masukkan Informasi Anda",
    description:
      "Copas CV Anda (opsional) dan deskripsi pekerjaan yang Anda lamar.",
  },
  {
    number: 2,
    title: "Optimasi AI",
    description:
      "AI kami menganalisis persyaratan pekerjaan dan menyesuaikan material aplikasi Anda sesuai.",
  },
  {
    number: 3,
    title: "Unduh & Lamar",
    description:
      "Tinjau, ubah jika diperlukan, dan unduh CV dan surat lamaran Anda yang telah disesuaikan.",
  },
];

export const PRICING_CARD_EN: PricingCardProps[] = [
  {
    title: "Free Trial",
    price: "$0",
    description: "Perfect for trying out our tools",
    features: [
      "3 CV generations",
      "1 Cover letter generation",
      "Basic CV scoring",
      "Standard templates",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    title: "Pro",
    price: "$19.99",
    period: "per month",
    description: "Most popular for active job seekers",
    features: [
      "Unlimited CV generations",
      "Unlimited Cover letters",
      "Advanced CV scoring",
      "All premium templates",
      "Priority support",
    ],
    buttonText: "Get Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    title: "Pay As You Go",
    price: "$1.99",
    period: "per generation",
    description: "Perfect for occasional use",
    features: [
      "Pay only when you need it",
      "All premium templates",
      "Advanced CV scoring",
      "No subscription required",
      "Results within minutes",
    ],
    buttonText: "Choose Plan",
    buttonVariant: "outline",
    popular: false,
  },
];

export const PRICING_CARD_ID: PricingCardProps[] = [
  {
    title: "Gratis",
    price: "Rp 0",
    description: "Ideal untuk mencoba alat kami",
    features: [
      "3 CV pembuatan",
      "1 surat lamaran pembuatan",
      "Skoring CV dasar",
      "Template standar",
    ],
    buttonText: "Mulai",
    buttonVariant: "outline",
    popular: false,
  },
  {
    title: "Pro",
    price: "Rp 19.999",
    period: "per bulan",
    description: "Paling populer untuk pencari pekerja aktif",
    features: [
      "CV pembuatan tidak terbatas",
      "Surat lamaran pembuatan tidak terbatas",
      "Skoring CV lanjutan",
      "Semua template premium",
      "Dukungan prioritas",
    ],
    buttonText: "Pilih Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    title: "Pay As You Go",
    price: "Rp 1.999",
    period: "per pembuatan",
    description: "Ideal untuk penggunaan sementara",
    features: [
      "Bayar hanya ketika Anda membutuhkan",
      "Semua template premium",
      "Skoring CV lanjutan",
      "Tidak perlu berlangganan",
      "Hasil dalam menit",
    ],
    buttonText: "Pilih Plan",
    buttonVariant: "outline",
    popular: false,
  },
];

export const TESTIMONIAL_CARDS: TestimonialCardProps[] = [
  {
    quote:
      "I was struggling to get interviews until I used this tool. After optimizing my CV, I got calls from 3 companies in the first week!",
    author: "Sarah Johnson",
    role: "Marketing Specialist",
  },
  {
    quote:
      "The cover letter generator saved me hours of work and helped me craft a compelling story that landed me my dream job in tech.",
    author: "Michael Chen",
    role: "Software Engineer",
  },
  {
    quote:
      "The CV scoring feature showed me exactly what I was missing. After making the suggested changes, my match score went from 65% to 92%!",
    author: "Emma Rodriguez",
    role: "Financial Analyst",
  },
];

export const FAQ_CARD_EN = [
  {
    question: "What is CV Generator?",
    answer:
      "CV Generator is a tool that helps you create a professional CV tailored to specific job descriptions using advanced AI technology.",
  },
  {
    question: "How does the AI CV generator work?",
    answer:
      "Our AI analyzes job descriptions to identify key requirements and skills, then tailors your CV to highlight relevant experiences and qualifications. This increases your match rate with Applicant Tracking Systems (ATS) used by employers.",
  },
  {
    question: "Can I edit the generated CV and cover letter?",
    answer:
      "Yes, absolutely! After generation, you can edit any part of your CV or cover letter using our intuitive editor. You have full control over the final content before downloading.",
  },
  {
    question: "How many credits do I get with the free trial?",
    answer:
      "The free trial includes 3 CV generations and 1 cover letter generation. Each generation costs 1 credit. You can purchase additional credits or subscribe to our Pro plan for unlimited generations.",
  },
];

export const FAQ_CARD_ID = [
  {
    question: "Apa itu CV Generator?",
    answer:
      "CV Generator adalah alat yang membantu Anda membuat CV profesional yang sesuai dengan deskripsi pekerjaan tertentu menggunakan teknologi AI yang berkembang.",
  },
  {
    question: "Bagaimana CV Generator AI bekerja?",
    answer:
      "AI kami menganalisa deskripsi pekerjaan untuk menentukan kebutuhan dan kemampuan, lalu memanfaatkan CV Anda untuk menarik perhatian penggunaan ATS yang digunakan oleh perusahaan.",
  },
  {
    question:
      "Apakah saya dapat mengedit CV dan surat lamaran yang telah dibuat?",
    answer:
      "Ya, dengan sempurna! Setelah pembuatan, Anda dapat mengedit bagian mana pun CV atau surat lamaran Anda menggunakan editor yang intuitif. Anda memiliki kontrol penuh atas konten sebelum mengunduhnya.",
  },
  {
    question: "Berapa kredit saya dapat dengan trial gratis?",
    answer:
      "Trial gratis mencakup 3 pembuatan CV dan 1 pembuatan surat lamaran. Setiap pembuatan membutuhkan 1 kredit. Anda dapat membeli kredit tambahan atau berlangganan untuk pembuatan terbatas.",
  },
];
