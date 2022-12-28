import { Button, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateProfileMutation } from "../graphql/generated/generated";

export const CreateProfileForm = () => {
  const [handle, setHandle] = useState<string>();
  const [createProfile, { loading }] = useCreateProfileMutation({});

  return (
    <>
      <FormControl>
        <Input value={handle} onChange={(e) => setHandle(e.target.value)} />
      </FormControl>
      <Button
        onClick={async () => {
          await createProfile({
            variables: {
              request: {
                handle,
              },
            },
          });
        }}
      >
        Create
      </Button>
    </>
  );
};
