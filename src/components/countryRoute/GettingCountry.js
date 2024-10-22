import { useEffect, useCallback } from 'react';
import { getName } from 'country-list';

const GettingCountry = ({ setCountry, setCountryName, country }) => {
  
  // Update country function
  const updateCountry = useCallback((countryCode) => {
    setCountry(countryCode);
    setCountryName(getName(countryCode)); // Convert country code to name

    // Set flag URL as background image
    const flagImageUrl = `https://flagcdn.com/w1600/${countryCode.toLowerCase()}.jpg`;
    document.body.style.backgroundImage = `url(${flagImageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, [setCountry, setCountryName]);

  // Fetch country based on user's location
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const countryCode = data.country.toUpperCase(); // Ensure the country code is uppercase

        updateCountry(countryCode); // Use the update function here
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    
    fetchCountry();
  }, [updateCountry]); 

  /// Handle country change from the dropdown
  useEffect(() => {
    if (country) {
      updateCountry(country);
    }
  }, [country, updateCountry]); // Watch for changes to country

  return null; // This component does not render anything by itself
};

export default GettingCountry;