// INTL PHONE Library :: START
import { INTL_INPUT_OPTION } from '../libs/constant/index';
import { PHONE_NUMBER_REGEX } from '../app/regex/index';
declare var window:any;


/**
 * A wrapper class for initializing and managing the intl-tel-input plugin
 * for international phone number input with styling and validation.
 */
export class IntlPhoneLib {
    private intl: any;
    private changeFlagZIndexInterval: any;
    /**
     * Creates an instance of IntlPhoneLib.
     * @param {*} inputElement
     * @param {*} parentDom
     * @memberof IntlPhoneLib
     */
    constructor(inputElement:any, parentDom:any, customCssStyleURL:any, changeFlagZIndex = false, intlOptions: object = {}) {
         // Load intl-tel-input JS dynamically
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/intlTelInput.min.js';
         // When script loads, initialize the intl-tel-input plugin
        script.onload = () => {
            this.intl = window.intlTelInput(inputElement, { ...INTL_INPUT_OPTION, ...intlOptions });
            this.checkMobileFlag(parentDom, changeFlagZIndex);
        };
         // Load required stylesheet for intl-tel-input
        const intlStyleElement = document.createElement('link');
        intlStyleElement.rel = 'stylesheet';
        intlStyleElement.href = `https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css`;

          // Optional: Load custom style overrides
        const customIntlStyleElement = document.createElement('link');
        customIntlStyleElement.rel = 'stylesheet';
        customIntlStyleElement.href = `${customCssStyleURL}`;

         // Append scripts/styles to parent or head
        if (parentDom) {
            parentDom.appendChild(script);
            parentDom.appendChild(intlStyleElement);
            parentDom.appendChild(customIntlStyleElement);
        }

          // Fallback: ensure script/style loaded in head
        setTimeout(() => {
            document.head.appendChild(script);
            document.head.appendChild(intlStyleElement);
        }, 200);

        
        // Set custom flag image (in case default is broken/missing)
        let ulEl = document.getElementById('iti-0__country-listbox');
        if (ulEl) {
            let flagEl = Array.from(document.getElementsByClassName('iti__flag') as HTMLCollectionOf<HTMLElement>);
            for (let i = 0; i < flagEl.length; i++) {
                flagEl[i].style.backgroundImage =
                    'url(https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/img/flags@2x.png)';
            }
        }

         // Add validation class toggle on keyup
        inputElement.addEventListener('keyup', () => {
            setTimeout(() => {
                if (this.isRequiredValidNumber) {
                    inputElement.classList.remove('invalid-input');
                } else {
                    inputElement.classList.add('invalid-input');
                }
            }, 100);
        });
         // Manually fix dropdown position for country list
        this.showCountryDropdown(parentDom);
    }

    // Setter: Set phone number programmatically
    set phoneNumber(number: string) {
        this.intl?.setNumber(number);
    }

    // Setter: Set country by ISO code
    set setCountry(country: string) {
        this.intl?.setCountry(country);
    }

    // Getter: Access the intl-tel-input instance
    get intlData() {
        return this.intl;
    }

    // Getter: Get the full international phone number
    get phoneNumber() {
        return this.intl?.getNumber();
    }

     // Getter: Validate if the number is required and valid
    get isRequiredValidNumber() {
        return this.intl?.isValidNumber();
    }

    // Getter: Validate number only if entered
    get isValidNumber() {
        return this.intl?.getNumber()?.length ? this.intl?.isValidNumber() : true;
    }

     // Getter: Get selected country info (e.g., name, dial code, ISO code)
    get selectedCountryData() {
        return this.intl?.getSelectedCountryData();
    }

    get getExtension() {
        return this.intl?.getExtension();
    }

     /**
     * Utility to adjust the z-index of the country dropdown (especially in modals or overlays).
     * Ensures proper layering above other UI elements.
     */
    private checkMobileFlag(parentDom:any, changeFlagZIndex:any): void {
        let count = 0;
        let interval = setInterval(() => {
            let mobileViewInit = document?.querySelector('body.iti-mobile');
            let childCount = 0;
            let flagDropDownElInterval = setInterval(() => {
                let flagDropdownView = parentDom?.querySelector('.iti__flag-container');
                if (changeFlagZIndex) {
                    this.changeFlagZIndexInterval = setInterval(() => {
                        let flagDropDown = document?.querySelector('.iti--container');
                        flagDropDown?.setAttribute('style', 'z-index: 9999999');
                        if (flagDropDown) {
                            clearInterval(this.changeFlagZIndexInterval);
                        }
                    }, 100);
                }
                if (flagDropdownView || childCount > 10) {
                    clearInterval(flagDropDownElInterval);
                }
                childCount++;
            }, 200);
            count++;
            if (mobileViewInit || count > 5) {
                clearInterval(interval);
            }
        }, 200);
    }

    /**
     * showCountryDropdown in fixed position
     *
     * @private
     * @param {HTMLElement} parentDom
     * @memberof IntlPhoneLib
     */
    private showCountryDropdown(parentDom: HTMLElement) {
        setTimeout(() => {
            let shadowRoot = parentDom?.querySelector('.iti__flag-container');
            let flagDropdownView = parentDom?.querySelector('.iti__country-list');
            if (flagDropdownView) {
                shadowRoot?.addEventListener('click', (event: Event) => {
                    // Get Clicked button coordinates
                    const rect = shadowRoot.getBoundingClientRect();
                    // Add current input height form top position
                    const top = rect.top + 34;
                    // Add styles on country dropdown
                    flagDropdownView.setAttribute(
                        'style',
                        'position: fixed;top:' + top + 'px; left:' + rect.left + 'px'
                    );
                });
            }
        }, 700);
    }

     /**
     * Restrict input to enter phone number digits only.
     */
    public onlyPhoneNumber(e: KeyboardEvent): void {
        const inputChar = String.fromCharCode(e.charCode);
        if ((e.key !== 'Backspace' && !new RegExp(PHONE_NUMBER_REGEX).test(inputChar)) || e.code === 'Space') {
            e.preventDefault();
        }
    }

    public clearChangeFlagZIndexInterval() {
        clearInterval(this.changeFlagZIndexInterval);
    }

    /**
     * Destroys the intl-tel-input instance and removes related event listeners.
     */
    public destroyIntlClass(): void {
        this.intl?.destroy();
    }
}
