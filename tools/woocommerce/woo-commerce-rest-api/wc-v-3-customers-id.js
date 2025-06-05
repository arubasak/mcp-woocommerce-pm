/**
 * Function to update a customer in WooCommerce.
 *
 * @param {Object} args - Arguments for updating the customer.
 * @param {string} args.id - The unique identifier for the customer.
 * @param {string} args.email - The email address for the customer.
 * @param {string} args.first_name - Customer's first name.
 * @param {string} args.last_name - Customer's last name.
 * @param {string} args.username - Customer's login name.
 * @param {string} args.password - Customer's password.
 * @param {string} args.billing - List of billing address data.
 * @param {string} args.shipping - List of shipping address data.
 * @param {string} args.meta_data - Meta data.
 * @returns {Promise<Object>} - The result of the customer update.
 */
const executeFunction = async ({
  id,
  email,
  first_name,
  last_name,
  username,
  password,
  billing,
  shipping,
  meta_data
}) => {
  // ✅ Use environment variables for security
  const baseUrl = process.env.WOOCOMMERCE_API_BASE_URL || 'https://www.12taste.com';
  const clientKey = process.env.WOOCOMMERCE_API_KEY || '';
  const clientSecret = process.env.WOOCOMMERCE_API_SECRET || '';

  try {
    // Construct the URL with the customer ID and query parameters
    const url = new URL(`${baseUrl}/wc/v3/customers/${id}`);
    url.searchParams.append('email', email);
    url.searchParams.append('first_name', first_name);
    url.searchParams.append('last_name', last_name);
    url.searchParams.append('username', username);
    url.searchParams.append('password', password);
    url.searchParams.append('billing', billing);
    url.searchParams.append('shipping', shipping);
    url.searchParams.append('meta_data', meta_data);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${clientKey}:${clientSecret}`).toString('base64')
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'PUT',
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
    console.error('Error updating customer:', error);
    return { error: 'An error occurred while updating the customer.' };
  }
};

/**
 * Tool configuration for updating a customer in WooCommerce.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_customer',
      description: 'Update a customer in WooCommerce.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier for the customer.'
          },
          email: {
            type: 'string',
            description: 'The email address for the customer.'
          },
          first_name: {
            type: 'string',
            description: 'Customer first name.'
          },
          last_name: {
            type: 'string',
            description: 'Customer last name.'
          },
          username: {
            type: 'string',
            description: 'Customer login name.'
          },
          password: {
            type: 'string',
            description: 'Customer password.'
          },
          billing: {
            type: 'string',
            description: 'List of billing address data.'
          },
          shipping: {
            type: 'string',
            description: 'List of shipping address data.'
          },
          meta_data: {
            type: 'string',
            description: 'Meta data.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };
