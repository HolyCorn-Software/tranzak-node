/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node libary
 * This module (types), contains type definitions for the library.
 */



export declare global {
    namespace tranzak_node {
        interface Credentials {
            /** ID of the application, as on your [TRANZAK dashboard](https://developer.tranzak.me). */
            appId: string
            /** The API key */
            appKey: string
            /** You can optionally pass a different URL end-point for the client. If you do so, then no need to specify `mode`. */
            apiUrl?: string
            /** This tells us if calls would be made to the production (live) end-point, or sandbox end-point. By default, it is `live`*/
            mode?: "live" | "sandbox"
        }



        interface PaginatedResponse<DataType = {}> {
            /**
             * The items in the current page of the response
             */
            list: DataType[]
            /**
             * The total items in the response.
             */
            totalItems: number
            /** This two-element arrayy tells us the minimum, and maximum number of items we can request for, per page. */
            pageCount: [number, number]
            /** The number of elements in one page. */
            pageSize: number
            /** The current page, we're dealing with for that response. */
            currentPage: number
            /** Tells us if there are more items in the next pages */
            hasMore: boolean
        }


        interface Currencies {
            "AED": "UAE dirham",
            "AFN": "Afghan afghani",
            "ALL": "Albanian lek",
            "AMD": "Armenian dram",
            "ANG": "Netherlands Antillean gulden",
            "AOA": "Angolan kwanza",
            "ARS": "Argentine peso",
            "AUD": "Australian dollar",
            "AWG": "Aruban florin",
            "AZN": "Azerbaijani manat",
            "BAM": "Bosnia and Herzegovina konvertibilna marka",
            "BBD": "Barbadian dollar",
            "BDT": "Bangladeshi taka",
            "BGN": "Bulgarian lev",
            "BHD": "Bahraini dinar",
            "BIF": "Burundi franc",
            "BMD": "Bermudian dollar",
            "BND": "Brunei dollar",
            "BOB": "Bolivian boliviano",
            "BRL": "Brazilian real",
            "BSD": "Bahamian dollar",
            "BTN": "Bhutanese ngultrum",
            "BWP": "Botswana pula",
            "BYR": "Belarusian ruble",
            "BZD": "Belize dollar",
            "CAD": "Canadian dollar",
            "CDF": "Congolese franc",
            "CHF": "Swiss franc",
            "CLP": "Chilean peso",
            "CNY": "Chinese/Yuan renminbi",
            "COP": "Colombian peso",
            "CRC": "Costa Rican colon",
            "CUC": "Cuban peso",
            "CVE": "Cape Verdean escudo",
            "CZK": "Czech koruna",
            "DJF": "Djiboutian franc",
            "DKK": "Danish krone",
            "DOP": "Dominican peso",
            "DZD": "Algerian dinar",
            "EEK": "Estonian kroon",
            "EGP": "Egyptian pound",
            "ERN": "Eritrean nakfa",
            "ETB": "Ethiopian birr",
            "EUR": "European Euro",
            "FJD": "Fijian dollar",
            "FKP": "Falkland Islands pound",
            "GBP": "British pound",
            "GEL": "Georgian lari",
            "GHS": "Ghanaian cedi",
            "GIP": "Gibraltar pound",
            "GMD": "Gambian dalasi",
            "GNF": "Guinean franc",
            "GQE": "Central African CFA franc",
            "GTQ": "Guatemalan quetzal",
            "GYD": "Guyanese dollar",
            "HKD": "Hong Kong dollar",
            "HNL": "Honduran lempira",
            "HRK": "Croatian kuna",
            "HTG": "Haitian gourde",
            "HUF": "Hungarian forint",
            "IDR": "Indonesian rupiah",
            "ILS": "Israeli new sheqel",
            "INR": "Indian rupee",
            "IQD": "Iraqi dinar",
            "IRR": "Iranian rial",
            "ISK": "Icelandic kr\u00f3na",
            "JMD": "Jamaican dollar",
            "JOD": "Jordanian dinar",
            "JPY": "Japanese yen",
            "KES": "Kenyan shilling",
            "KGS": "Kyrgyzstani som",
            "KHR": "Cambodian riel",
            "KMF": "Comorian franc",
            "KPW": "North Korean won",
            "KRW": "South Korean won",
            "KWD": "Kuwaiti dinar",
            "KYD": "Cayman Islands dollar",
            "KZT": "Kazakhstani tenge",
            "LAK": "Lao kip",
            "LBP": "Lebanese lira",
            "LKR": "Sri Lankan rupee",
            "LRD": "Liberian dollar",
            "LSL": "Lesotho loti",
            "LTL": "Lithuanian litas",
            "LVL": "Latvian lats",
            "LYD": "Libyan dinar",
            "MAD": "Moroccan dirham",
            "MDL": "Moldovan leu",
            "MGA": "Malagasy ariary",
            "MKD": "Macedonian denar",
            "MMK": "Myanma kyat",
            "MNT": "Mongolian tugrik",
            "MOP": "Macanese pataca",
            "MRO": "Mauritanian ouguiya",
            "MUR": "Mauritian rupee",
            "MVR": "Maldivian rufiyaa",
            "MWK": "Malawian kwacha",
            "MXN": "Mexican peso",
            "MYR": "Malaysian ringgit",
            "MZM": "Mozambican metical",
            "NAD": "Namibian dollar",
            "NGN": "Nigerian naira",
            "NIO": "Nicaraguan c\u00f3rdoba",
            "NOK": "Norwegian krone",
            "NPR": "Nepalese rupee",
            "NZD": "New Zealand dollar",
            "OMR": "Omani rial",
            "PAB": "Panamanian balboa",
            "PEN": "Peruvian nuevo sol",
            "PGK": "Papua New Guinean kina",
            "PHP": "Philippine peso",
            "PKR": "Pakistani rupee",
            "PLN": "Polish zloty",
            "PYG": "Paraguayan guarani",
            "QAR": "Qatari riyal",
            "RON": "Romanian leu",
            "RSD": "Serbian dinar",
            "RUB": "Russian ruble",
            "SAR": "Saudi riyal",
            "SBD": "Solomon Islands dollar",
            "SCR": "Seychellois rupee",
            "SDG": "Sudanese pound",
            "SEK": "Swedish krona",
            "SGD": "Singapore dollar",
            "SHP": "Saint Helena pound",
            "SLL": "Sierra Leonean leone",
            "SOS": "Somali shilling",
            "SRD": "Surinamese dollar",
            "SYP": "Syrian pound",
            "SZL": "Swazi lilangeni",
            "THB": "Thai baht",
            "TJS": "Tajikistani somoni",
            "TMT": "Turkmen manat",
            "TND": "Tunisian dinar",
            "TRY": "Turkish new lira",
            "TTD": "Trinidad and Tobago dollar",
            "TWD": "New Taiwan dollar",
            "TZS": "Tanzanian shilling",
            "UAH": "Ukrainian hryvnia",
            "UGX": "Ugandan shilling",
            "USD": "United States dollar",
            "UYU": "Uruguayan peso",
            "UZS": "Uzbekistani som",
            "VEB": "Venezuelan bolivar",
            "VND": "Vietnamese dong",
            "VUV": "Vanuatu vatu",
            "WST": "Samoan tala",
            "XAF": "Central African CFA franc",
            "XCD": "East Caribbean dollar",
            "XDR": "Special Drawing Rights",
            "XOF": "West African CFA franc",
            "XPF": "CFP franc",
            "YER": "Yemeni rial",
            "ZAR": "South African rand",
            "ZMK": "Zambian kwacha",
            "ZWR": "Zimbabwean dollar"

        }
    }
}