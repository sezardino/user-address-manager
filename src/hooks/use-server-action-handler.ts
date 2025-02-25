import { ServerActionResponse } from "@/types/base";
import { ZodFormatError } from "@/utils/zod-validation";
import { useCallback } from "react";

type Args<Response, Arguments = undefined> = {
  action: (args: Arguments) => Promise<ServerActionResponse<Response>>;
  onSuccess?: (result: Response) => void;
  onError?: (errorMessage: string, zodErrors?: ZodFormatError[]) => void;
  onFinally?: () => void;
};

export const useServerActionHandler = <T = void, A = undefined>(
  args: Args<T, A>
) => {
  const { action, onError, onSuccess, onFinally } = args;

  const handler = useCallback(
    async (actionArgs: A): Promise<void> => {
      try {
        const result = await action(actionArgs);

        if (
          typeof result === "object" &&
          result !== null &&
          "message" in result
        ) {
          onError?.(result.message, result.errors);
        } else {
          onSuccess?.(result as T);
        }
      } catch (error) {
        console.log(error);
        onError?.(error instanceof Error ? error.message : "Unexpected error");
      } finally {
        onFinally?.();
      }
    },
    [action, onError, onFinally, onSuccess]
  );

  return handler;
};
