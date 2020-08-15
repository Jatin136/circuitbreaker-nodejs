import { Proxy, ProxyParams } from "../proxy";

const circuitBreakerOptions = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000, // After 30 seconds, try again.
    rollingCountTimeout: 10000,
    rollingCountBuckets: 10,
    volumeThreshold: 10
};

(async () => {

    let restParams: ProxyParams = {
        baseUrl: 'htts:/jsonplaceholder.typicode.com',
        method: 'get',
        uri: '/todos/1',
        isMockCall: false,
        header: "",
        breakerOptions: circuitBreakerOptions
    };

    const restCall = new Proxy(restParams);
    const result = await restCall.call();

    console.log(result.data);

})();