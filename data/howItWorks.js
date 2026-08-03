import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Create Your Profile",
    description:
      "Build your profile with your skills and career interests.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Build Your Resume",
    description:
      "Create ATS-friendly resumes and professional cover letters.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Practice Interviews",
    description:
      "Prepare with mock interviews and personalized feedback.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your growth with career insights and analytics.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];