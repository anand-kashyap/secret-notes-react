import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full text-center">
      Built By
      <a
        className="mx-1 text-blue-600 font-medium"
        href="http://anandkashyap.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Anand Kashyap
      </a>
      &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
