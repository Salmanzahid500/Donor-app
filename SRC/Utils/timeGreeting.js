/**
 * Returns a time-appropriate greeting based on the current hour
 * @returns {string} A greeting message like "Good Morning", "Good Afternoon", etc.
 */
export const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 5) {
    return "Good Night";
  } else if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

/**
 * Returns a more detailed greeting with emoji
 * @returns {object} An object with greeting text and emoji
 */
export const getDetailedGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 5) {
    return {
      greeting: "Good Night",
      emoji: "🌙",
      message: "Still up? Take care of yourself!"
    };
  } else if (currentHour >= 5 && currentHour < 12) {
    return {
      greeting: "Good Morning",
      emoji: "☀️",
      message: "Ready to make a difference today?"
    };
  } else if (currentHour >= 12 && currentHour < 17) {
    return {
      greeting: "Good Afternoon",
      emoji: "🌤️",
      message: "Hope you're having a great day!"
    };
  } else if (currentHour >= 17 && currentHour < 21) {
    return {
      greeting: "Good Evening",
      emoji: "🌆",
      message: "Your kindness can save lives!"
    };
  } else {
    return {
      greeting: "Good Night",
      emoji: "🌙",
      message: "Rest well, hero!"
    };
  }
};
