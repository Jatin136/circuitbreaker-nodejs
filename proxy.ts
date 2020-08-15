import OpossumBreaker from 'opossum';
import * as axios from 'axios';
import https from 'https'

import { Rest } from "./rest";

/**
    * make a request to url
    * @param baseurl base url
    * @param method type of http methods
    * @param isMockCall set it to true for calling mocked api and false to make a actual api call
    * @param uri resource to connect
    * @param header header information
    * @param breakerOptions : circuit breaker options
    * @param certificateBuffer: certificate in buffer format
    * @param keyBuffer: certificate key in buffer format
*/
export type ProxyParameters = {
    baseUrl: string,
    method: axios.Method,
    uri: string,
    isMockCall?: boolean,
    header?: any,
    breakerOptions?: OpossumBreaker.Options;
    cert?: Buffer,
    key?: Buffer,
};

export class Proxy {

    private params: ProxyParameters;

    constructor(private InputParams: ProxyParameters) {
        this.params = this.InputParams;
    }

    public async call(requestData?: any) {

        let options: axios.AxiosRequestConfig = {
            method: this.params.method,
            baseURL: this.params.baseUrl,
            url: this.params.uri,
            data: requestData,
            headers: this.params.header
        };

        if (this.params.cert && this.params.key)
            options.httpsAgent = new https.Agent({
                cert: this.params.cert,
                key: this.params.key
            });

        const rest = new Rest();
        const result = (await (rest.call(options, this.params.breakerOptions))).fire(options);

        return result;
    }

}