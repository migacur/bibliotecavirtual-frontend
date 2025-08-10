import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="book-container">
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Tú pareces perdido...</h3>

                  <p>La página que buscas no se encuentra disponible</p>

                  <NavLink to="/" className="link_404">
                    Ir a Home
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
