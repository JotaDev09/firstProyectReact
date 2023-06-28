import { Component } from "react";
import Productos from "./components/productos.js";
import Layout from "./components/layout.js";
import Navbar from "./components/navbar.js";
import Title from "./components/title.js";

class App extends Component {
  state = {
    productos: [
      { name: "Tomate", price: 0.5, img: "/img/tomate.jpg" },
      { name: "Arbejas", price: 0.7, img: "/img/arbejas.jpg" },
      { name: "Lechuga", price: 0.25, img: "/img/lechuga.jpg" },
    ],
    carro: [],
    esCarroVisible: false,
  };

  agregarAlCarro = (producto) => {
    const { carro } = this.state;
    if (carro.find((x) => x.name === producto.name)) {
      const newCarro = carro.map((x) =>
        x.name === producto.name
          ? {
              ...x,
              cantidad: x.cantidad + 1,
            }
          : x
      );
      return this.setState({ carro: newCarro });
    }
    return this.setState({
      carro: this.state.carro.concat({
        ...producto,
        cantidad: 1,
      }),
    });
  };

  mostrarCarro = () => {
    if (!this.state.carro.length) {
      return;
    }
    this.setState({ esCarroVisible: !this.state.esCarroVisible });
  };

  render() {
    const { esCarroVisible } = this.state;
    return (
      <div>
        <Navbar
          carro={this.state.carro}
          esCarroVisible={esCarroVisible}
          mostrarCarro={this.mostrarCarro}
        />
        <Layout>
          <Title />
          <Productos
            agregarAlCarro={this.agregarAlCarro}
            productos={this.state.productos}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
