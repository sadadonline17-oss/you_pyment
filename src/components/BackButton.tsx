import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  label?: string;
}

const BackButton = ({ className, label = "رجوع" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className={cn("gap-2 hover:bg-accent transition-colors", className)}
    >
      <ArrowRight className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
