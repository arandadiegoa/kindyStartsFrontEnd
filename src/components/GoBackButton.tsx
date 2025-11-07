import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function GoBackButton() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
      <Button variant="link" size="sm" onClick={handleGoBack} className="md:hidden self-end">
        Volver
      </Button>
  )
}