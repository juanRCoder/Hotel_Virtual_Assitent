import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BodyRoomServices = () => {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    minutes: "",
    bebidas: "",
    menu: "",
    cantidadBebidas: 0,
    cantidadMenu: 0,
    resumen: "",
  });

  const [bebidasOptions, setBebidasOptions] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    // Función para obtener informaicón de las bebidas y el menú
    const fetchData = async () => {
      try {
        const bebidasResponse = await fetch(
          `http://localhost:3004/extraerBebidas`
        );
        const menuResponse = await fetch("http://localhost:3004/extraerMenu");

        const bebidasData = await bebidasResponse.json();
        const menuData = await menuResponse.json();

        setBebidasOptions(bebidasData);
        setMenuOptions(menuData);
      } catch (error) {
        console.error("Error al obtener opciones", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos envaidos", formData);
  };

  const handleClear = () => {
    setFormData({
      fecha: "",
      hora: "",
      bebidas: "",
      menu: "",
      cantidadBebidas: 0,
      cantidadMenu: 0,
      resumen: "",
    });
  };

  const generateHoursOption = () => {
    const hoursOption = [];
    for (let i = 6; i < 24; i++) {
      hoursOption.push(
        <option key={i} value={i}>
          {i < 10 ? `0${i}` : i}
        </option>
      );
    }
    return hoursOption;
  };

  const generateMinutesOption = () => {
    const minutesOption = [];
    for (let i = 0; i <= 45; i += 15) {
      minutesOption.push(
        <option key={i} value={i}>
          {i < 10 ? `0${i}` : i}
        </option>
      );
    }
    return minutesOption;
  };

  return (
    <>
      <div
      className="
      flex
      text-center
      justify-center
      mt-10
      ">
        <h1 className="
        text-8xl
        font-Abril-Fatface
        text-green-800
        text-shadow-lg
        shadow-green-500/100
        ">ROOMSERVICE</h1>
      </div>
      <div className="
      flex 
      justify-center 
      items-center 
      h-screen
      -mt-32
      rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="
          w-full 
          max-w-md 
          bg-white 
          p-8 rounded 
          shadow-md"
        >
          <label className="
          block 
          text-gray-700 
          text-sm 
          font-bold 
          mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="
            w-full border 
            border-gray-300 
            p-2 
            mb-4"
          />

          <div className="
          flex 
          justify-between 
          mb-4">
            <div className="w-1/2 pr-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Hora
              </label>
              <select
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className="
                w-full border 
                border-gray-300 
                p-2"
              >
                {generateHoursOption()}
              </select>
            </div>

            <div className="
            w-1/2 
            pl-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Minutos
              </label>
              <select
                name="minutes"
                value={formData.minutes}
                onChange={handleChange}
                className="
                w-full 
                border 
                border-gray-300 
                p-2"
              >
                {generateMinutesOption()}
              </select>
            </div>
          </div>

          <div className="
          flex 
          justify-between 
          mb-4">
            <div className="
            w-1/2 
            pr-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Bebidas
              </label>
              <select
                name="bebidas"
                value={formData.bebidas}
                onChange={handleChange}
                className="
                w-full border 
                border-gray-300 
                p-2"
              >
                <option value="">Seleccionar Bebida</option>
                {bebidasOptions.map((bebida) => (
                  <option key={bebida.id} value={bebida.name}>
                    {bebida.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="
            w-1/2 
            pl-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Cantidad de bebidas
              </label>
              <input
                type="number"
                name="cantidadBebidas"
                value={formData.cantidadBebidas}
                onChange={handleChange}
                className="
                w-full border 
                border-gray-300 
                p-2"
              />
            </div>
          </div>

          <div className="
          flex 
          justify-between 
          mb-4">
            <div className="
            w-1/2 
            pr-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Menu
              </label>
              <select
                name="menu"
                value={formData.menu}
                onChange={handleChange}
                className="
                w-full 
                border 
                border-gray-300 
                p-2"
              >
                <option value="">Seleccionar menu</option>
                {menuOptions.map((menu) => (
                  <option key={menu.id} value={menu.name}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="
            w-1/2 
            pl-2">
              <label className="
              block 
              text-gray-700 
              text-sm 
              font-bold 
              mb-2">
                Cantidad de comida
              </label>
              <input
                type="number"
                name="cantidadMenu"
                value={formData.cantidadMenu}
                onChange={handleChange}
                className="
                w-full 
                border 
                border-gray-300 
                p-2"
              />
            </div>
          </div>

          {/* Resto del formulario ... */}

          <button
            type="submit"
            className="
            bg-blue-500 
            hover:bg-blue-700 
            text-white font-bold 
            py-2 
            px-4 
            mr-2 
            rounded"
          >
            Enviar
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="
            bg-red-500 
            hover:bg-red-700 
            text-white 
            font-bold 
            py-2 
            px-4 
            rounded"
          >
            Borrar
          </button>
        </form>

        {/* <Link to='/dashboard' className="mt-4 text-blue-500">
        Volver
    </Link> */}
      </div>
    </>
  );
};

export default BodyRoomServices;
