import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center mt-5" >
      <div className="container p-4">
        <section className="mb-4">
          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-facebook-f" style={{ color: 'aliceblue' }}></i>
          </a>

          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-twitter" style={{ color: 'aliceblue' }}></i>
          </a>

          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-google" style={{ color: 'aliceblue' }}></i>
          </a>

          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-instagram" style={{ color: 'aliceblue' }}></i>
          </a>

          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-linkedin-in" style={{ color: 'aliceblue' }}></i>
          </a>

          <a data-mdb-ripple-init className="btn btn-outline btn-floating m-1" href="#!" role="button">
            <i className="fab fa-github" style={{ color: 'aliceblue' }}></i>
          </a>
        </section>
      </div>
    </footer>
  );
}
