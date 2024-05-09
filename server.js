const express = require('express');
const utiles = require('./utiles'); 
const automoviles = require('./autos');


const app = express();
app.use(express.json());
const port = 4000; 




//17

app.get('/autos/valor-menor-que-promedio', (req, res) => {
  const promedioValorVehiculos = automoviles.reduce((acumulador, vehiculo) => acumulador + vehiculo.valor, 0) / automoviles.length;
  const vehiculosValorMenorQuePromedio = automoviles.filter(vehiculo => vehiculo.valor < promedioValorVehiculos);
  res.json(vehiculosValorMenorQuePromedio);
});


//16

app.get('/autos/marca-y-color/:marca/:color', (req, res) => {
  const marca = req.params.marca;
  const color = req.params.color;
  const vehiculosMarcaColor = automoviles.filter(vehiculo => vehiculo.marca === marca && vehiculo.color === color);
  res.json(vehiculosMarcaColor);
});

//15
app.get('/autos/placa/:secuencia', (req, res) => {
  const secuencia = req.params.secuencia.toLowerCase();
  const vehiculosConPlaca = automoviles.filter(vehiculo => vehiculo.placa.toLowerCase().includes(secuencia));
  res.json(vehiculosConPlaca);
});


//14
app.get('/autos/color/:color', (req, res) => {
  const color = req.params.color;
  const vehiculosColor = automoviles.filter(vehiculo => vehiculo.color.toLowerCase() === color);
  res.json(vehiculosColor);
});

//13
app.get('/autos/cilindraje/:cilindraje', (req, res) => {
  const cilindraje = parseFloat(req.params.cilindraje);
  const vehiculosCilindraje = automoviles.filter(vehiculo => vehiculo.cilindraje >= cilindraje);
  res.json(vehiculosCilindraje);
});


//12
app.get('/productos/menor-que/:valor', (req, res) => {
  const valor = parseFloat(req.params.valor);
  const productosMenorQue = utiles.filter(producto => producto.valorProducto < valor);
  res.json(productosMenorQue);
});

//11
app.get('/productos/vencimiento-posterior/:fecha', (req, res) => {
  const fecha = new Date(req.params.fecha);
  const productosVencimientoPosterior = utiles.filter(producto => producto.fechaVencimiento > fecha);
  res.json(productosVencimientoPosterior);
});


//10
app.get('/productos/buscar/:palabra', (req, res) => {
  const palabra = req.params.palabra.toLowerCase();
  const productosBuscados = utiles.filter(producto => producto.descripcionProducto.toLowerCase().includes(palabra));
  res.json(productosBuscados);
});


//9
app.get('/productos/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = utiles.find(producto => producto.id === id);
  if (producto) {
    res.send(producto);
  }
});


//8
app.get('/productos/mayor_que/:valor', (req, res) => {
  const valor = parseFloat(req.params.valor);
  const productosMayorQue = utiles.filter(producto => producto.valorProducto > valor);
  res.send(productosMayorQue);
});


//7. Crear un endpoint que liste todos los vehículos calcula el impuesto vehicular para cada vehículo teniendo en cuenta las siguientes condiciones

app.get('/autos/impuestos', (req, res) => {
  const vehiculosConImpuesto = automoviles.map(vehiculo => {
    let impuesto = 0;

    if (!vehiculo.tipo) { 
      const costo = vehiculo.valor;
      if (costo <= 50000000) {
        impuesto = costo * 0.01; 
      } else if (costo <= 100000000) {
        impuesto = costo * 0.015;
      } else if (costo <= 150000000) {
        impuesto = costo * 0.025; 
      } else {
        impuesto = costo * 0.035; 
      }
    } else { 
      impuesto = vehiculo.valor * 0.01; 
    }
    return {
      ...vehiculo,
      impuesto: impuesto
    };
  });

  res.send(vehiculosConImpuesto);
});


//6. Crear un endpoint que liste todos los vehículos de una marca (solicita la marca por el endpoint) 

app.get('/autos/:marca', (req, res) => {
  const marca = req.params.marca;
  const vehiculosMarca = automoviles.filter(vehiculo => vehiculo.marca === marca);
  res.send(vehiculosMarca);
});


//5. Crear un endpoint que liste todos los productos y calcule el iva para cada producto el iva es del 19%
app.get('/productos/iva', (req, res) => {
  const productosConIva = utiles.map(producto => {
    const iva = producto.valorProducto * 0.19;
    const precioConIva = producto.valorProducto + iva;
    return {
      ...producto,
      iva: iva,
      precioConIva: precioConIva
    };
  });

  res.send(productosConIva);
});

//4. Crear un endpoint que liste los productos que sean mayor 10.000
app.get('/productos/mayorque', (req, res) => {
  const productosMayor10000 = utiles.filter(producto => producto.valorProducto > 10000);
  res.send(productosMayor10000);
});

//3. Crear un endpoint que liste todos los automóviles
app.get('/autos', (req, res) => {
  res.send(automoviles);
});

//2. Crear un endpoint que liste todos los productos de una categoría (solicita la categoría por el endpoint)
app.get('/productos/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  const productosPorCategoria = utiles.filter(producto => producto.categoriaProducto === categoria);
  res.send(productosPorCategoria);
});

// 1. Crear un endpoint que liste todos los productos
app.get('/productos', (req, res) => {
  res.send(utiles);
});


// Arranca el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

