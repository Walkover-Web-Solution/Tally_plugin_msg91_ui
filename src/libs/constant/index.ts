import { ajax } from 'rxjs/ajax';

export const INTL_INPUT_OPTION = {
    nationalMode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/utils.js',
    autoHideDialCode: false,
    separateDialCode: false,
    initialCountry: 'auto',
    geoIpLookup: (success: any, failure: any) => {
        let countryCode = 'in';
        const fetchIPApi = ajax({
            url: 'https://ipapi.co/json/',
            method: 'GET',
        });

        fetchIPApi.subscribe({
            next: (res: any) => {
                if (res?.response?.ipAddress) {
                    const fetchCountryByIpApi = ajax({
                        url: `https://ipapi.co/json/${res.response.ipAddress}`,
                        method: 'GET',
                    });

                    fetchCountryByIpApi.subscribe({
                        next: (fetchCountryByIpApiRes: any) => {
                            if (fetchCountryByIpApiRes?.response?.countryCode) {
                                return success(fetchCountryByIpApiRes.response.countryCode);
                            } else {
                                return success(countryCode);
                            }
                        },
                        error: (fetchCountryByIpApiErr) => {
                            const fetchCountryByIpInfoApi = ajax({
                                url: `https://ipapi.co/${res.response.ipAddress}/json`,
                                method: 'GET',
                            });

                            fetchCountryByIpInfoApi.subscribe({
                                next: (fetchCountryByIpInfoApiRes: any) => {
                                    if (fetchCountryByIpInfoApiRes?.response?.country) {
                                        return success(fetchCountryByIpInfoApiRes.response.country);
                                    } else {
                                        return success(countryCode);
                                    }
                                },
                                error: (fetchCountryByIpInfoApiErr) => {
                                    return success(countryCode);
                                },
                            });
                        },
                    });
                } else {
                    return success(countryCode);
                }
            },
            error: (err) => {
                return success(countryCode);
            },
        });
    },
};