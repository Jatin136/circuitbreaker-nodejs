import OpossumBreaker from 'opossum';
import * as axios from 'axios';

export class Rest {
    public async call(options: axios.AxiosRequestConfig, circuitBreakerOptions?: OpossumBreaker.Options) {


        const url = options.baseURL + options.url;

        let breaker = new OpossumBreaker(this.apiCall, circuitBreakerOptions);

        breaker!.on("open", () => {
            console.error(`CircuitBreakerException: rest call to ${url} has failed.`);
        });

        breaker.on("timeout", () => {
            console.log(`CircuitBreakerException: rest call to ${url} has timed out.`);
        });

        breaker.fallback(() =>
            Promise.reject(new Error(`CircuitBreakerException: Endpoint ${url} not available.`)));

        return breaker;
    }

    private async apiCall(options: axios.AxiosRequestConfig) {
        return await axios.default.request(options);
    }
}