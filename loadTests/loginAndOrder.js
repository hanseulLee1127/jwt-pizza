import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response
  const vars = {}

  group('Login and order - https://pizza.hanseullee.click/', function () {
    // Homepage
    response = http.get('https://pizza.hanseullee.click/')
    sleep(4.2)

    // Login
    response = http.put(
      'https://pizza-service.hanseullee.click/api/auth',
      '{"email":"leehs004@gmail.com","password":"1"}',
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://pizza.hanseullee.click',
        },
      }
    )

    if (!check(response, { 'status equals 200': res => res.status === 200 })) {
      console.log('Login failed response body:\n' + response.body)
      fail('Login was *not* 200')
    }

    vars.token1 = jsonpath.query(response.json(), '$.token')[0]
    sleep(1.2)

    // Get menu
    response = http.get('https://pizza-service.hanseullee.click/api/order/menu', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.token1}`,
        origin: 'https://pizza.hanseullee.click',
      },
    })

    // Get franchise
    response = http.get('https://pizza-service.hanseullee.click/api/franchise', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.token1}`,
        origin: 'https://pizza.hanseullee.click',
      },
    })
    sleep(4.1)

    // Purchase pizza
    response = http.post(
      'https://pizza-service.hanseullee.click/api/order',
      JSON.stringify({
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          { menuId: 4, description: 'Crusty', price: 0.0028 },
          { menuId: 3, description: 'Margarita', price: 0.0042 },
        ],
        storeId: '1',
        franchiseId: 1,
      }),
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.token1}`,
          'content-type': 'application/json',
          origin: 'https://pizza.hanseullee.click',
        },
      }
    )

    if (!check(response, { 'order response status is 200': res => res.status === 200 })) {
      console.log('Order failed:\n' + response.body)
      fail('Order response not 200')
    }

    vars.orderJWT = jsonpath.query(response.json(), '$.jwt')[0]
    sleep(0.8)

    // Verify pizza with JWT from order response
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: vars.orderJWT }),
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.token1}`,
          'content-type': 'application/json',
          origin: 'https://pizza.hanseullee.click',
        },
      }
    )
  })
}