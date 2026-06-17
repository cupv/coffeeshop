import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    discardResponseBodies: true,
    
    scenarios: {
        import_data: {
            executor: 'constant-vus',
            vus: 200,            
            duration: '30m',      
        },
    },
};

const BASE_URL = __ENV.COUNTER_URL || 'http://localhost:3002';

export default function () {
    const url = `${BASE_URL}/api/v1/orders`;
    
    const payload = JSON.stringify({
        source: 1,
        memberId: uuidv4(), 
        lines: [
            {
                type: 0,
                name: "CAPPUCCINO",
                price: 45000,
                status: 1
            }
        ]
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'is status 200 or 210': (r) => r.status === 200 || r.status === 201,
    });

}