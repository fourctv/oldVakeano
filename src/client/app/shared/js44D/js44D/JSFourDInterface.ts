import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { encode } from 'base-64';

import { LogService } from '../../core/services/log.service';
//import { Config } from '../../core/utils/config';

// for testing only, for production this URL must be blank
//export const fourDUrl: string = 'http://54.191.46.243:8080';  // to use in development
export const fourDUrl: string = 'http://localhost:8080';  // to use in development
//export const fourDUrl:string = window.location.protocol + '//' + window.location.host; // to use in production


//
// Various Utility Functions useb by the code above
//
/**
 * convert object to encoded url string
 */
export var convertObjectToURL = function(obj:any) {
    var str:Array<any> = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    return str.join('&');
};

/**
 * Calculates hash code from URL string or POST form data
 */
export var calculateHash = function(formData: Object) {
    let value: string = '';
    for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (value !== '') value += ',';
            value += key + '=' + formData[key];
        }
    }

    //FourDInterface.log.debug('hash:' + value);
    return MD5.md5(value);
};


/**
 * A collecion of static functions to communicate with 4D backend
 */
@Injectable()
export class FourDInterface {
    //
    // Global Properties
    //
    public static authentication: any;
    public static currentUser: string = '';
    public static currentUserID: number = 0;
    public static currentUserPassword: string = '';

    /**
     * current session key used in all http requests
     */
    public static sessionKey: string = '';
 
    /**
     * indicates if web app is running standalone or inside workspace
     */
    public static runningInsideWorkspace: boolean = false;
    
   /**
     * point to the HTTP service we'll use
     */
    public static http:Http;
    
   /**
     * point to the LOG service we'll use
     */
    public static log:LogService;

    //
    // cache variables 
    //
    private static _listCache: any = {};
    private static _registryCache: Array<any> = [];


/* 
    constructor (@Inject(Http) _http:Http) {
         this.http = _http;
    }
 /**/    

    /**
     * Generic function to call 4D backend using Angular2 HTTP 
     * 
     * 	@param fourdMethod: 4D's method name
     * 	@param body: the request body to send to 4D, an object that will be converted to URLSearchParams
     * 
     * @return returns a Promise for the database operation
     */
    public call4DRESTMethod(fourdMethod: string, body: any): Observable<any> {
        const contentHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
        body.Sessionkey = FourDInterface.sessionKey;
        body.hash = calculateHash(body);

        return FourDInterface.http.post(fourDUrl + '/4DAction/' + fourdMethod, convertObjectToURL(body), { headers: contentHeaders });
 
    }

        public signIn(user, pwd) {
        FourDInterface.currentUser = user;
        FourDInterface.currentUserPassword = pwd;

        let body = { username: encode(user), password: encode(pwd) };

        return new Promise((resolve, reject) => {
            this.call4DRESTMethod('REST_Authenticate', body)
                .subscribe(
                response => {
                    let resultJSON = response.json();
                    /*
                    if (Config.IS_MOBILE_NATIVE()) {
                        // on nativescript
                        resultJSON = JSON.parse(resultJSON);
                    }
                    */
                    if (resultJSON.valid) {
                        FourDInterface.authentication = resultJSON.session; // save authentication
                        FourDInterface.currentUserID = resultJSON.session.options._userID;
                        FourDInterface.sessionKey = resultJSON.session.key; // and the session ID we'll use from now on...
                        resolve(FourDInterface.authentication);

                    } else {
                        reject('Invalid username or password! ==> '+response.json());
                    }
                },
                error => {
                    // alert(error.text());
                    FourDInterface.log.debug('error:' + error);
                    reject(error.text());
                }
                );

        });
    }

    /**
     * Gets the values of a 4D Choice List.
     * 
     * 	@param listName the 4D Choice List name
     * 
     * @return returns a Promise for the database operation
     * 
     * <p><b>4D lists are cached to optimize traffic to/from 4D</b></p>
     * 
     **/
    public get4DList(listName: string): Promise<Array<string>> {
        if (FourDInterface._listCache[listName]) {
            return new Promise((resolve, reject) => { resolve(FourDInterface._listCache[listName]); });
        }

        let body: any = { list: listName };

        return new Promise((resolve, reject) => {
            this.call4DRESTMethod('REST_Get4DList', body)
                .subscribe(
                response => {
                    let resultJSON = response.json();
                    /*
                    if (Config.IS_MOBILE_NATIVE()) {
                        // on nativescript
                        resultJSON = JSON.parse(resultJSON);
                    }
                    */
                    let listValues = resultJSON.values;
                    FourDInterface._listCache[listName] = listValues;
                    resolve(listValues);
                },
                error => {
                    FourDInterface.log.debug('error:' + error.text());
                    reject(error.text());
                });

        });

    } 
    
    /**
     * Retrieve a filtered 4D List from 4C-TV. Used to access a single level of a hierarchical 4D List.
     * 
      * 
     * @param listName 4D list name
     * @param selector the hierarchical selector, only items under that selector in the hierarchy will be returned
     * @return returns a Promise for the database operation
     * 
     */
    public getFiltered4DList(listName: string, selector:string ): Promise<Array<string>> {
 
        let body: any = { Listname: listName, Selector:selector };
        
        return new Promise((resolve, reject) => {
            this.call4DRESTMethod('REST_GetFiltered4DList', body)
                .subscribe(
                response => {
                    let resultJSON = response.json();
                    /*
                    if (Config.IS_MOBILE_NATIVE()) {
                        // on nativescript
                        resultJSON = JSON.parse(resultJSON);
                    }
                    */
                    let listValues = resultJSON.values;
                    resolve(listValues);
                },
                error => {
                    FourDInterface.log.debug('error:' + error.text());
                    reject(error.text());
                });

        });

    }
        
    /**
     * Function getRegistryValue: get current registry value
     * 
     * @param theClass the Registry Class to retrieve
     * @param theParameter the Registry Parameter to retrieve (optional, if blank gets all values for the Registry Class)
     * @param theDefaultValue a default value to return, in case the Registry entry is not defined in 4D
     * @param theSelector the Registry Selector to retrieve (optional, if blank gets all values for the Registry Class/Parameter)
     * 
     * @return returns a Promise for the database operation
     * 
     * <b>Retrieved Registry entries are cached in to optimize traffic to/from 4D </b>
     * 
     */
    public getRegistryValue(theClass: string, theParameter: string, theDefaultValue: string = '', theSelector: string = ''): Promise<string> {
        let item: any = {};
        for (item of FourDInterface._registryCache) {
            if (item.class === theClass && item.parameter === theParameter && item.selector === theSelector) {
                return new Promise((resolve, reject) => { resolve(item.registryValue); });
            }
        }

        let body: any = { class: theClass, parameter: theParameter, defaultValue: theDefaultValue, selector: theSelector };

        return new Promise((resolve, reject) => {
            this.call4DRESTMethod('REST_GetRegistryValue', body)
                .subscribe(
                response => {
                    body.registryValue = response.text();
                    FourDInterface._registryCache.push(body);
                    resolve(body.registryValue);
                },
                error => {
                    FourDInterface.log.debug('error:' + error.text());
                    reject(error.text());
                });

        });

    }  


    /**
     * Function setRegistryValue: set a registry entry value
     * 
     * @param theClass the Registry Class to set
     * @param theParameter the Registry Parameter to set
     * @param theValue a Registry value to set
     * @param theSelector the Registry Selector to set (optional)
     * 
    */
    public setRegistryValue(theClass: string, theParameter: string, theValue: string, theSelector: string = ''): Promise<any> {
        let body: any = { class: theClass, parameter: theParameter, value: theValue, selector: theSelector };

        return new Promise((resolve, reject) => {
            this.call4DRESTMethod('REST_SetRegistryValue', body)
                .subscribe(
                response => {
                    resolve();
                },
                error => {
                    FourDInterface.log.debug('error:' + error.text());
                    reject(error.text());
                });

        });

    }  
 
    /**
     * Converts a DOM date to 4D format (YYYYMMDD).
     *  
     * @param theDate a DOM date value
     * @return a 4D formatted date string (YYYYMMDD)
     * 
     */
    public dateTo4DFormat(theDate: Date): string {

        return theDate.toJSON().substr(0, 10).replace(/-/g, '');
    }

}
 

/**
 * MD5 has calculation
 */
export class MD5 {

    static hex_chr = '0123456789abcdef'.split('');

    static md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];

        a = MD5.ff(a, b, c, d, k[0], 7, -680876936);
        d = MD5.ff(d, a, b, c, k[1], 12, -389564586);
        c = MD5.ff(c, d, a, b, k[2], 17, 606105819);
        b = MD5.ff(b, c, d, a, k[3], 22, -1044525330);
        a = MD5.ff(a, b, c, d, k[4], 7, -176418897);
        d = MD5.ff(d, a, b, c, k[5], 12, 1200080426);
        c = MD5.ff(c, d, a, b, k[6], 17, -1473231341);
        b = MD5.ff(b, c, d, a, k[7], 22, -45705983);
        a = MD5.ff(a, b, c, d, k[8], 7, 1770035416);
        d = MD5.ff(d, a, b, c, k[9], 12, -1958414417);
        c = MD5.ff(c, d, a, b, k[10], 17, -42063);
        b = MD5.ff(b, c, d, a, k[11], 22, -1990404162);
        a = MD5.ff(a, b, c, d, k[12], 7, 1804603682);
        d = MD5.ff(d, a, b, c, k[13], 12, -40341101);
        c = MD5.ff(c, d, a, b, k[14], 17, -1502002290);
        b = MD5.ff(b, c, d, a, k[15], 22, 1236535329);

        a = MD5.gg(a, b, c, d, k[1], 5, -165796510);
        d = MD5.gg(d, a, b, c, k[6], 9, -1069501632);
        c = MD5.gg(c, d, a, b, k[11], 14, 643717713);
        b = MD5.gg(b, c, d, a, k[0], 20, -373897302);
        a = MD5.gg(a, b, c, d, k[5], 5, -701558691);
        d = MD5.gg(d, a, b, c, k[10], 9, 38016083);
        c = MD5.gg(c, d, a, b, k[15], 14, -660478335);
        b = MD5.gg(b, c, d, a, k[4], 20, -405537848);
        a = MD5.gg(a, b, c, d, k[9], 5, 568446438);
        d = MD5.gg(d, a, b, c, k[14], 9, -1019803690);
        c = MD5.gg(c, d, a, b, k[3], 14, -187363961);
        b = MD5.gg(b, c, d, a, k[8], 20, 1163531501);
        a = MD5.gg(a, b, c, d, k[13], 5, -1444681467);
        d = MD5.gg(d, a, b, c, k[2], 9, -51403784);
        c = MD5.gg(c, d, a, b, k[7], 14, 1735328473);
        b = MD5.gg(b, c, d, a, k[12], 20, -1926607734);

        a = MD5.hh(a, b, c, d, k[5], 4, -378558);
        d = MD5.hh(d, a, b, c, k[8], 11, -2022574463);
        c = MD5.hh(c, d, a, b, k[11], 16, 1839030562);
        b = MD5.hh(b, c, d, a, k[14], 23, -35309556);
        a = MD5.hh(a, b, c, d, k[1], 4, -1530992060);
        d = MD5.hh(d, a, b, c, k[4], 11, 1272893353);
        c = MD5.hh(c, d, a, b, k[7], 16, -155497632);
        b = MD5.hh(b, c, d, a, k[10], 23, -1094730640);
        a = MD5.hh(a, b, c, d, k[13], 4, 681279174);
        d = MD5.hh(d, a, b, c, k[0], 11, -358537222);
        c = MD5.hh(c, d, a, b, k[3], 16, -722521979);
        b = MD5.hh(b, c, d, a, k[6], 23, 76029189);
        a = MD5.hh(a, b, c, d, k[9], 4, -640364487);
        d = MD5.hh(d, a, b, c, k[12], 11, -421815835);
        c = MD5.hh(c, d, a, b, k[15], 16, 530742520);
        b = MD5.hh(b, c, d, a, k[2], 23, -995338651);

        a = MD5.ii(a, b, c, d, k[0], 6, -198630844);
        d = MD5.ii(d, a, b, c, k[7], 10, 1126891415);
        c = MD5.ii(c, d, a, b, k[14], 15, -1416354905);
        b = MD5.ii(b, c, d, a, k[5], 21, -57434055);
        a = MD5.ii(a, b, c, d, k[12], 6, 1700485571);
        d = MD5.ii(d, a, b, c, k[3], 10, -1894986606);
        c = MD5.ii(c, d, a, b, k[10], 15, -1051523);
        b = MD5.ii(b, c, d, a, k[1], 21, -2054922799);
        a = MD5.ii(a, b, c, d, k[8], 6, 1873313359);
        d = MD5.ii(d, a, b, c, k[15], 10, -30611744);
        c = MD5.ii(c, d, a, b, k[6], 15, -1560198380);
        b = MD5.ii(b, c, d, a, k[13], 21, 1309151649);
        a = MD5.ii(a, b, c, d, k[4], 6, -145523070);
        d = MD5.ii(d, a, b, c, k[11], 10, -1120210379);
        c = MD5.ii(c, d, a, b, k[2], 15, 718787259);
        b = MD5.ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = MD5.add32(a, x[0]);
        x[1] = MD5.add32(b, x[1]);
        x[2] = MD5.add32(c, x[2]);
        x[3] = MD5.add32(d, x[3]);

    }

    static cmn(q, a, b, x, s, t) {
        a = MD5.add32(MD5.add32(a, q), MD5.add32(x, t));
        return MD5.add32((a << s) | (a >>> (32 - s)), b);
    }

    static ff(a, b, c, d, x, s, t) {
        return MD5.cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    static gg(a, b, c, d, x, s, t) {
        return MD5.cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    static hh(a, b, c, d, x, s, t) {
        return MD5.cmn(b ^ c ^ d, a, b, x, s, t);
    }

    static ii(a, b, c, d, x, s, t) {
        return MD5.cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    static md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878], i;
        for (i = 64; i <= s.length; i += 64) {
            MD5.md5cycle(state, MD5.md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            MD5.md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        MD5.md5cycle(state, tail);
        return state;
    }

    /* there needs to be support for Unicode here,
     * unless we pretend that we can redefine the MD-5
     * algorithm for multi-byte characters (perhaps
     * by adding every four 16-bit characters and
     * shortening the sum to 32 bits). Otherwise
     * I suggest performing MD-5 as if every character
     * was two bytes--e.g., 0040 0025 = @%--but then
     * how will an ordinary MD-5 sum be matched?
     * There is no way to standardize text to something
     * like UTF-8 before transformation; speed cost is
     * utterly prohibitive. The JavaScript standard
     * itself needs to look at this: it should start
     * providing access to strings as preformed UTF-8
     * 8-bit unsigned value arrays.
     */
    static md5blk(s) { /* I figured global was faster.   */
        var md5blks = [], i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i)
                + (s.charCodeAt(i + 1) << 8)
                + (s.charCodeAt(i + 2) << 16)
                + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    static rhex(n) {
        var s = '', j = 0;
        for (; j < 4; j++)
            s += MD5.hex_chr[(n >> (j * 8 + 4)) & 0x0F]
                + MD5.hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    static hex(x) {
        for (var i = 0; i < x.length; i++)
            x[i] = MD5.rhex(x[i]);
        return x.join('');
    }

    static md5(s) {
        return MD5.hex(MD5.md51(MD5.str2rstr_utf8(s)));
    }

    /* this function is much faster,
     so if possible we use it. Some IEs
     are the only ones I know of that
     need the idiotic second function,
     generated by an if clause.  */

    static add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }


    /*
    * Encode a string as utf-8.
    * For efficiency, this assumes the input is valid utf-16.
    */
    static str2rstr_utf8(input: String): String {
        var output: String = '';
        var i: number = -1;
        var x: number, y: number;

        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
		
            /* Encode output as utf-8 */
            if (x <= 0x7F) {
                output += String.fromCharCode(x);
            } else if (x <= 0x7FF) {
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                    0x80 | (x & 0x3F));
            } else if (x <= 0xFFFF) {
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            } else if (x <= 0x1FFFFF) {
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            }
        }
        return output;
    }

}

export class FourDQuery {
    query?:Array<any>;
    union?:Array<any>;
    intersection?:Array<any>;
    custom?:string;
    joinTable?:string;
    joinPK?:string;
    joinFK?:string;
    join?:Array<any>;
}