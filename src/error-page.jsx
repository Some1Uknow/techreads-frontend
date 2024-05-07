import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Oops!</h1>
        <p className="text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="italic">{error.statusText || error.message}</p>
      </div>
    </div>
  );
}
