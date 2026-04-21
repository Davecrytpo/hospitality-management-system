import { toast } from "sonner";

type ActionFeedbackOptions<T> = {
  actionLabel: string;
  run: () => Promise<T>;
  successMessage: string;
  errorMessage: string;
};

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  return fallback;
}

export async function runActionWithFeedback<T>({
  actionLabel,
  run,
  successMessage,
  errorMessage,
}: ActionFeedbackOptions<T>) {
  const toastId = toast.loading(actionLabel);
  try {
    const result = await run();
    toast.success(successMessage, { id: toastId });
    return result;
  } catch (error) {
    toast.error(getErrorMessage(error, errorMessage), { id: toastId });
    throw error;
  }
}
