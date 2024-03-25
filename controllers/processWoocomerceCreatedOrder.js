const siigoConnect = require("../config/configSiigo");
const { printJson } = require("../utils/utils");


const convertOrderToSiigo = (order) => {
  /**Notas
   * 2372 - factura de venta
   * Verificar el date si es cuando se creo la orden o cuando se pago.
   * customer:
   * - identification es el numero de identificacion del cliente hay que solicitarlo en la orden
   * address:
   * - hacer mappers para los ciudades departamentos y paises
   * reviasar que es el seller 62
   * revisar los pagos el codigo cual corresponderia
   *
   */

  //sum all items prices
  let total = 0;
  order.line_items.forEach((item) => {
    total += item.price * item.quantity;
  });

  const date = order.date_created.split("T")[0];

  const siigoOrder = {
    "document": {
      "id": 2372
    },
    "date": date,
    "customer": {
      "person_type": "Person",
      "id_type": "13",
      "identification": "209048401",
      "branch_office": "0",
      "name": [
        order.billing.first_name,
        order.billing.last_name
      ],
      "address": {
        "address": order.billing.address_1,
        "city": {
          "country_code": "Co",
          "state_code": "11",
          "city_code": "11001"
        }
      },
      "phones": [
        {
          "number": order.billing.phone
        }
      ],
      "contacts": [
        {
          "first_name": order.billing.first_name,
          "last_name": order.billing.last_name,
          "email": order.billing.email
        }
      ]
    },
    "seller": 62,
    "payments": [
      {
        "id": "541",
        "value": total
      }
    ]
  };
  // add  line items from order
  siigoOrder.items = order.line_items.map((item) => {
    return {
      code: item.sku,
      description: item.name,
      quantity: item.quantity,
      price: item.price
    }
  });
  return siigoOrder;
}

const sendOrderToSiigo = async (siigoOrder) => {
  try {
    const responseRequest = await siigoConnect.post(`/orders`, siigoOrder);
  } catch (error) {
    console.log("### Error al enviar la orden a siigo ###");
    printJson(error.response.data);
  }
}


const processOrder = async (order) => {
  //1. hacer el log de toda la informacion de la orden recibida en la bd
  console.log("### Procesando orden...###");
  printJson(order);

  //2. convertir la orden a un formato que siigo entienda
  const siigoOrder = convertOrderToSiigo(order);
  console.log("### Orden convertida a Siigo ###");
  printJson(siigoOrder);

  //3. enviar la orden a siigo
  siigoResponse = await sendOrderToSiigo(siigoOrder);
}

module.exports = processOrder;
