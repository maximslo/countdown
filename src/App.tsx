import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';

function App() {
  const schoolStartDate = new Date('2024-09-03T08:00:00'); // Start date: September 3, 2024, at 8:00 AM
  const schoolEndDate = new Date('2025-05-01T12:00:00'); // End date: May 1, 2025, at noon

  const calculateSchoolStats = () => {
    const now = new Date();
    const totalDays = Math.ceil(
      (schoolEndDate.getTime() - schoolStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const elapsedDays = Math.floor(
      (now.getTime() - schoolStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = Math.max(0, totalDays - elapsedDays);

    // Calculate weeks and hours
    const fullWeeksLeft = Math.floor(remainingDays / 5); // Assuming school is 5 days a week
    const totalHoursLeft = Math.max(0, Math.ceil((schoolEndDate.getTime() - now.getTime()) / (1000 * 60 * 60)));

    // Calculate percentage through the school year
    const percentComplete = Math.min(100, Math.round((elapsedDays / totalDays) * 100));

    return {
      daysLeft: remainingDays,
      weeksLeft: fullWeeksLeft,
      hoursLeft: totalHoursLeft,
      percentComplete,
    };
  };

  const [stats, setStats] = useState(calculateSchoolStats());

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(calculateSchoolStats());
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  // GSAP Animation on Component Mount
  useEffect(() => {
    // Animate the header first
    gsap.fromTo(
      '.header',
      { opacity: 0, y: -20 }, // Start hidden and slightly above
      { opacity: 1, y: 0, duration: 0.3, ease: 'easeOut' } // Fade in smoothly
    );
  
    // Delay the countdown items animation slightly
    gsap.fromTo(
      '.countdown-item',
      { opacity: 0, y: -20 }, // Start hidden and slightly above
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.3, ease: 'easeOut', delay: 0.1 } // Starts slightly after header animation
    );
  }, []);

  return (
    <div className="App">
      <header className="header">BU Senior Countdown</header>
      <div className="countdown">
        <div className="countdown-item">
          <div className="countdown-text">
            <span className="main-text">Days of school left</span>
            <span className="sub-text">Only including full school days</span>
          </div>
          <span className="countdown-number">{stats.daysLeft}</span>
        </div>
        <div className="countdown-item">
          <div className="countdown-text">
            <span className="main-text">Weeks of school left</span>
            <span className="sub-text">Only including full school days</span>
          </div>
          <span className="countdown-number">{stats.weeksLeft}</span>
        </div>
        <div className="countdown-item">
          <div className="countdown-text">
            <span className="main-text">Hours until the end of the school year</span>
            <span className="sub-text">Including all days</span>
          </div>
          <span className="countdown-number">{stats.hoursLeft}</span>
        </div>
        <div className="countdown-item">
          <div className="countdown-text">
            <span className="main-text">Percent through the school year</span>
            <span className="sub-text">Including all days</span>
          </div>
          <span className="countdown-number">{stats.percentComplete}%</span>
        </div>
      </div>
    </div>
  );
}

export default App;