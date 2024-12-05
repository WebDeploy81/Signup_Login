import react from "react"; // Import React to use JSX

export const App = () => {
  const name = "Suman"; // Declare a variable for the name
  const greeting = "Hello"; // Declare a variable for the greeting

  return (
    <div>
      {/* Display the greeting and name in the div */}
      {greeting}, {name}!
    </div>
  );
};
