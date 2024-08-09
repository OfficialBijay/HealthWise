// Return greeting message based on hour of the day
export const getGreetingMessage = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    if (currentHour < 12) {
      return "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  };