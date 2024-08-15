import { Loader } from "lucide-react";

import { Button } from "./ui/button";

export const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader className="animate-spin h-4 w-4 mr-2" />
          Loading...
        </>
      ) : (
        <>Submit</>
      )}
    </Button>
  );
};
