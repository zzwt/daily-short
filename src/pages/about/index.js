import React, { memo } from 'react';
import StyledAbout from './style';
export default memo(function About() {
  return (
    <StyledAbout>
      <div className="border-shadow about">
        <h2>About ASX Daily Gross Short Sales Data</h2>
        <p>
          Daily gross short sales data is collected from ASX which publishes it
          at 11:00am AEDT every business day. Data published is one business day
          behind trading day. Please note that ASX states:
        </p>
        <blockquote>
          <strong>
            No responsibility is accepted for any inaccuracies contained in the
            matter published. Securities that have had no short sales actively
            reported for the date shown are excluded from this report.
          </strong>
        </blockquote>
        <p>
          Our service also take no responsibility of the data accuracy and
          please use it at your own discretion.
        </p>
        <h2>Privacy Policy</h2>
        <p>
          Your data including your searches, favourites or anything else that
          you do while using the service are not recorded. There's no tracking
          using the service.
        </p>
        <h2>Cookie Policy</h2>
        <p>
          Since we don't keep track of your search data, your favourite stocks
          are stored in cookies of your broswer. So please don't delete it
          otherwise all your favourites will be lost.
        </p>
        <h2>Contact Us</h2>
        <p>
          Any issues please contact us on{' '}
          <a href="mailto:support@dayshorts.com">support@dayshorts.com</a>
        </p>
      </div>
    </StyledAbout>
  );
});
