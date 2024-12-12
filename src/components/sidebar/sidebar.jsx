import React from "react";

function Sidebar() {
  return (
    <div className="container-fluid"> 
      <div className="row">
        <div
          className="col-auto bg-light p-3 position-fixed h-100 overflow-auto"
          style={{ width: '250px', top: 0, left: 0 }}
        >
          <div className="list-group-container"> {/*contenedor envolvente que incluye título y lista */}
            <h2 className="list-group-title mb-4">Selected outlets</h2> 
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action"> 
              {/* list-group-item: crea lista
                  list-group-item-action: convierte al elemento en clicable*/}
                Outlet 1
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Outlet 2
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Outlet 3
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Outlet 4
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Outlet 5
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;