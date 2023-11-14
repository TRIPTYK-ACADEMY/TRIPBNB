import { singleton } from "@triptyk/nfw-core";
import { Maybe } from 'true-myth';

export interface Configuration {
    PORT: number;
}

@singleton()
export default class ConfigurationService {
    #config?: Configuration;

    private get config() {
        if (!this.#config) {
            throw new Error('Configuration not loaded');
        }
        return this.#config;
    }

    constructor () {
        
    }
    
    public init() {
        this.#config = {
            PORT: 3000,
        };
    }
    
    public get<K extends keyof Configuration>(key: K): Maybe<Configuration[K]> {
        return Maybe.of(this.config[key]);
    }
}