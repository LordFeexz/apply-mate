import { FEATURE } from "@/enums/global";
import { BarChart, FileText, Mail, Zap } from "lucide-react";
import type { ReactNode } from "react";

export interface FeatureTab {
  url: FEATURE | "";
  label: string;
  icon: ReactNode;
}

export interface FeatureExplain {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FEATURE_TABS: FeatureTab[] = [
  {
    url: "",
    label: "Feature",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    url: FEATURE.SCORING_CV,
    label: "CV Scoring",
    icon: <BarChart className="w-4 h-4" />,
  },
  {
    url: FEATURE.GENERATE_OPTIMIZE_CV,
    label: "CV Generator",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    url: FEATURE.GENERATE_COVER_LETTER,
    label: "Cover Letter",
    icon: <Mail className="w-4 h-4" />,
  },
];

export const FEATURE_EXPLANATION_EN: FeatureExplain[] = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "CV Generator",
    description:
      "Create a professional CV tailored to specific job descriptions using AI-powered content generation.",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Cover Letter Generator",
    description:
      "Craft compelling cover letters that complement your CV and address key job requirements.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "CV Scoring",
    description:
      "Analyze your CV against job descriptions to get a match score and suggestions for improvement.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "AI-Powered Optimization",
    description:
      "Leverage advanced AI models to optimize your application materials for better results.",
  },
];

export const FEATURE_EXPLANATION_ID: FeatureExplain[] = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "CV Generator",
    description:
      "Buat CV profesional yang sesuai dengan deskripsi pekerjaan tertentu menggunakan AI-powered content generation.",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Cover Letter Generator",
    description:
      "Buat surat lamaran yang menarik untuk melengkapi CV Anda dan memenuhi persyaratan pekerjaan.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "CV Scoring",
    description:
      "Analisa CV Anda terhadap deskripsi pekerjaan untuk mendapatkan skor cocok dan saran untuk peningkatan.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Optimasi AI",
    description:
      "Menggunakan model AI yang berkembang untuk meningkatkan hasil lamaran pekerjaan Anda.",
  },
];
