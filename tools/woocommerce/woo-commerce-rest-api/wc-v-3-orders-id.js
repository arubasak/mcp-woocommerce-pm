/**
 * Function to retrieve an order by ID from WooCommerce.
 *
 * @param {Object} args - Arguments for the order retrieval.
 * @param {string} args.id - The unique identifier for the order.
 * @returns {Promise<Object>} - The result of the order retrieval.
 */
const executeFunction = async ({ id }) => {
  const baseUrl = 'https://woo-quickly-successful-alpaca.wpcomstaging.com/wp-json';
  const username = ''; // will be provided by the user
  const password = ''; // will be provided by the user
  try {
    // Construct the URL with the order ID
    const url = new URL(`${baseUrl}/wc/v3/orders/${id}`);
    url.searchParams.append('context', 'view');

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If username and password are provided, add them to the Authorization header
    if (username && password) {
      const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving order:', error);
    return { error: 'An error occurred while retrieving the order.' };
  }
};

/**
 * Tool configuration for retrieving an order from WooCommerce.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_order',
      description: 'Retrieve an order by ID from WooCommerce.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the order.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };
