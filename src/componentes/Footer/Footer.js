import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contact">
        <a
          href="https://www.facebook.com/laeti.anselmobelloso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="facebook"
            xmlns="http://www.w3.org/2000/svg"
            width="38px"
            fill="#FFD700"
            viewBox="0 0 512 512"
          >
            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
          </svg>
        </a>
      </div>

      <div className="footer-aviso">
        <div className="warning">
          <p>Importante</p>
          <p>
            Los libros utilizados son una recopilación de diversos sitios web.
          </p>
        </div>
      </div>

      <div className="footer-info">
        <span>Página web realizada por Miguel Acurero &copy; 2021</span>
      </div>
    </footer>
  );
};

export default Footer;
