import { useToast } from "vue-toastification";

const toast = useToast();

export const errorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("Unauthorized");
    } else if (error.response.status === 403) {
      toast.error("Forbidden");
    } else if (error.response.status === 422) {
      toast.error("Validation error. Please check your input.");
    } else if (error.response.status === 404) {
      toast.error("Resource not found");
    } else if (error.response.status === 500) {
      toast.error("Server error");
    } else {
      toast.error(error.response.data.message);
    }
  } else if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
  } else {
    toast.error("An unexpected error occurred");
  }
};

